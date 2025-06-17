// cms-admin/app/matches-edit/page.js
"use client";

import { useEffect, useState, useMemo } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// Import uploadBytesResumable instead of uploadBytes
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase'; // Import storage

export default function MatchesEditPage() {
  const [profiles, setProfiles] = useState([]);
  const [originalProfiles, setOriginalProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingImageId, setUploadingImageId] = useState(null); // Track which profile is uploading
  const [uploadProgress, setUploadProgress] = useState({}); // Track progress per profile

  // --- Utility function for deep comparison of arrays of objects ---
  const areProfilesEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = [...arr1].sort((a, b) => String(a.id).localeCompare(String(b.id)));
    const sortedArr2 = [...arr2].sort((a, b) => String(a.id).localeCompare(String(b.id)));

    for (let i = 0; i < sortedArr1.length; i++) {
      const p1 = sortedArr1[i];
      const p2 = sortedArr2[i];

      if (
        p1.id !== p2.id ||
        p1.name !== p2.name ||
        p1.age !== p2.age ||
        p1.distance !== p2.distance ||
        p1.image !== p2.image // Compare image URLs
      ) {
        return false;
      }
    }
    return true;
  };

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProfilesData = async () => {
      try {
        const docRef = doc(db, "screens", "matches");
        const docSnap = await getDoc(docRef);

        let fetchedProfiles = [];
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.profiles)) {
            fetchedProfiles = data.profiles.map(p => ({
              ...p,
              id: String(p.id || Date.now() + Math.random()), // Ensure unique ID
            }));
          }
        }
        setProfiles(fetchedProfiles);
        setOriginalProfiles(fetchedProfiles);

      } catch (e) {
        console.error("Error fetching matches profiles data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfilesData();
  }, []);

  // --- Profile Management ---
  const handleProfileChange = (id, field, newValue) => {
    setProfiles(prevProfiles =>
      prevProfiles.map(p =>
        p.id === id ? { ...p, [field]: newValue } : p
      )
    );
  };

  const addProfile = () => {
    const newId = String(Date.now() + Math.floor(Math.random() * 1000));
    setProfiles(prevProfiles => [...prevProfiles, { id: newId, name: '', age: '', distance: '', image: '' }]);
  };

  const removeProfile = async (idToRemove) => {
    const profileToRemove = profiles.find(p => p.id === idToRemove);
    if (profileToRemove && profileToRemove.image) {
      // Optional: Delete image from storage when profile is removed
      try {
        // Ensure the path is correct if the image URL is not the direct storage path
        // For simplicity, we assume the URL is directly usable as a ref path for deletion.
        // If your URLs are complex, you might need to parse them to get the file path.
        const imagePath = profileToRemove.image.split('?')[0].split('%2F').slice(1).join('/');
        const imageRef = ref(storage, decodeURIComponent(imagePath));
        await deleteObject(imageRef);
        console.log(`Image ${profileToRemove.image} deleted from storage.`);
      } catch (e) {
        console.warn(`Could not delete image ${profileToRemove.image} from storage:`, e);
        // Continue with profile removal even if image deletion fails
      }
    }
    setProfiles(prevProfiles => prevProfiles.filter(p => p.id !== idToRemove));
  };

  // --- Image Upload ---
  const handleImageUpload = async (e, profileId) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImageId(profileId);
    setUploadProgress(prev => ({ ...prev, [profileId]: 0 }));

    const fileName = `${profileId}-${file.name}`;
    const storageRef = ref(storage, `profile_images/matches/${fileName}`);

    try {
      // Get the current profile to check for existing image
      const currentProfile = profiles.find(p => p.id === profileId);
      let oldImageRef = null;
      if (currentProfile?.image) {
          // Attempt to parse the storage path from the download URL
          try {
              const oldImagePath = currentProfile.image.split('?')[0].split('%2F').slice(1).join('/');
              oldImageRef = ref(storage, decodeURIComponent(oldImagePath));
          } catch (parseError) {
              console.warn("Could not parse old image path for deletion:", parseError);
              oldImageRef = null;
          }
      }

      // Use uploadBytesResumable for progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(prev => ({ ...prev, [profileId]: progress }));
        },
        (error) => {
          console.error("Image upload error:", error);
          setSaveMessage(`Error uploading image for ${profileId}: ${error.message}`);
          setUploadingImageId(null);
          setUploadProgress(prev => ({ ...prev, [profileId]: null }));
        },
        async () => {
          // Upload completed successfully, now get the download URL
          const downloadURL = await getDownloadURL(storageRef);
          handleProfileChange(profileId, 'image', downloadURL); // Update profile state with new URL
          setUploadingImageId(null);
          setUploadProgress(prev => ({ ...prev, [profileId]: null }));
          setSaveMessage('Image uploaded successfully! Remember to Save Changes.');

          // Optional: Delete old image if it exists and is different
          if (oldImageRef && oldImageRef.fullPath !== storageRef.fullPath) {
            try {
              await deleteObject(oldImageRef);
              console.log(`Old image ${oldImageRef.fullPath} deleted from storage.`);
            } catch (e) {
              console.warn(`Could not delete old image ${oldImageRef.fullPath} from storage:`, e);
            }
          }
        }
      );
    } catch (e) {
      console.error("Error initiating image upload:", e);
      setSaveMessage(`Error uploading image for ${profileId}: ${e.message}`);
      setUploadingImageId(null);
      setUploadProgress(prev => ({ ...prev, [profileId]: null }));
    }
  };

  // --- Determine if changes have been made ---
  const hasChanges = useMemo(() => {
    if (loading || !originalProfiles) return false;
    return !areProfilesEqual(profiles, originalProfiles);
  }, [profiles, originalProfiles, loading]);

  // --- Save Changes to Firestore ---
  const handleSaveChanges = async () => {
    setSaveMessage('Saving...');
    try {
      const docRef = doc(db, "screens", "matches");

      const dataToSave = {
        profiles: profiles.map(p => ({
          id: p.id,
          name: p.name,
          age: Number(p.age),
          distance: p.distance,
          image: p.image, // Store the download URL
        })),
      };

      await updateDoc(docRef, dataToSave);
      setSaveMessage('Changes saved successfully!');
      setOriginalProfiles(dataToSave.profiles);
    } catch (e) {
      console.error("Error saving document: ", e);
      setSaveMessage(`Error saving changes: ${e.message}`);
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // --- Render Logic ---
  if (loading) return <div className="p-8 text-center text-gray-700 w-full min-h-screen flex items-center justify-center">Loading profiles editor...</div>;
  if (error) return <div className="p-8 text-center text-red-600 w-full min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Matches Profiles</h1>

      <div className="text-center mb-8">
        <button
          onClick={handleSaveChanges}
          disabled={!hasChanges || uploadingImageId !== null} // Disable if uploading
          className={`font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline text-lg
            ${(!hasChanges || uploadingImageId !== null) ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 text-white'}
          `}
        >
          Save Changes
        </button>
        {saveMessage && (
          <p className={`mt-3 text-sm ${saveMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {saveMessage}
          </p>
        )}
      </div>

      <div className="mb-6 border p-4 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Profiles</h2>
        {profiles.length === 0 && <p className="text-gray-600 mb-2">No profiles added yet.</p>}
        {profiles.map((profile, index) => (
          <div key={profile.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Profile {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`name-${profile.id}`} className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
                <input
                  id={`name-${profile.id}`}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile.name}
                  onChange={(e) => handleProfileChange(profile.id, 'name', e.target.value)}
                  placeholder="Profile Name"
                />
              </div>
              <div>
                <label htmlFor={`age-${profile.id}`} className="block text-gray-700 text-sm font-bold mb-1">Age:</label>
                <input
                  id={`age-${profile.id}`}
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile.age}
                  onChange={(e) => handleProfileChange(profile.id, 'age', e.target.value)}
                  placeholder="Age"
                />
              </div>
              <div>
                <label htmlFor={`distance-${profile.id}`} className="block text-gray-700 text-sm font-bold mb-1">Distance:</label>
                <input
                  id={`distance-${profile.id}`}
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={profile.distance}
                  onChange={(e) => handleProfileChange(profile.id, 'distance', e.target.value)}
                  placeholder="e.g., 3 miles"
                />
              </div>
              <div>
                <label htmlFor={`image-${profile.id}`} className="block text-gray-700 text-sm font-bold mb-1">Upload Image:</label>
                <input
                  id={`image-${profile.id}`}
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  onChange={(e) => handleImageUpload(e, profile.id)}
                  disabled={uploadingImageId === profile.id} // Disable input during upload
                />
                {uploadingImageId === profile.id && uploadProgress[profile.id] !== null && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress[profile.id]}%` }}></div>
                    <span className="text-xs text-gray-600 ml-2">{Math.round(uploadProgress[profile.id])}%</span>
                  </div>
                )}
                {profile.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={profile.image} alt="Profile Preview" className="max-w-[100px] max-h-[100px] object-cover rounded" />
                    <a href={profile.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline break-all">View Image</a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => removeProfile(profile.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Profile
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
        >
          Add New Profile
        </button>
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import TopBar from "../matches/components/TopBar"; // Assuming TopBar is in a common location
import BottomNav from "../matches/components/BottomNav"; // Assuming BottomNav is in a common location
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Adjust path if necessary

export default function LikesPage() {
  const [todayProfiles, setTodayProfiles] = useState([]);
  const [yesterdayProfiles, setYesterdayProfiles] = useState([]);
  const [twoDaysAgoProfiles, setTwoDaysAgoProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedProfiles = async () => {
      try {
        const likesDocRef = doc(db, "screens", "likes");
        const likesDocSnap = await getDoc(likesDocRef);

        if (likesDocSnap.exists()) {
          const data = likesDocSnap.data();
          if (data && Array.isArray(data.profiles)) {
            const allLikedProfiles = data.profiles;

            const today = [];
            const yesterday = [];
            const twoDaysAgo = [];

            allLikedProfiles.forEach((profile) => {
              if (profile.date === "today") {
                today.push(profile);
              } else if (profile.date === "yesterday") {
                yesterday.push(profile);
              } else if (profile.date === "twodaysago") {
                twoDaysAgo.push(profile);
              }
              // You might want to handle profiles with no 'date' or unrecognized 'date' values
            });

            setTodayProfiles(today);
            setYesterdayProfiles(yesterday);
            setTwoDaysAgoProfiles(twoDaysAgo);
          } else {
            console.warn("The 'likes' document does not contain a 'profiles' array or it's empty.");
            // Keep arrays empty
          }
        } else {
          console.log("No such 'likes' document!");
          // Keep arrays empty
        }
      } catch (err) {
        console.error("Error fetching liked profiles: ", err);
        setError("Failed to load liked profiles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedProfiles();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return (
      <div className="bg-[#111111] text-white h-screen flex flex-col items-center justify-center">
        <p>Loading liked profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#111111] text-white h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const hasAnyProfiles = todayProfiles.length > 0 || yesterdayProfiles.length > 0 || twoDaysAgoProfiles.length > 0;

  return (
    <div className="bg-[#111111] text-white h-screen flex flex-col">
      <div className="sticky top-0 bg-[#111111] z-10">
        <TopBar title="Liked" />
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-4">
            This is a list of people who have liked you and your matches.
          </p>
        </div>
      </div>

      <div className="overflow-y-auto pb-32 px-4">
        {!hasAnyProfiles && (
          <div className="text-center text-gray-400 mt-8">
            <p>No liked profiles to display yet.</p>
          </div>
        )}

        {todayProfiles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-center text-gray-500 py-2">Today</h2>
            <div className="grid grid-cols-2 gap-4">
              {todayProfiles.map((profile, index) => (
                <div key={`today-${profile.name}-${index}`} className="relative rounded-xl overflow-hidden">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="p-2">
                      <h3 className="text-lg font-semibold">{profile.name}, {profile.age}</h3>
                    </div>
                    <div className="flex bg-white/10 backdrop-blur-sm rounded-b-xl">
                      <button className="flex-1 p-4 flex justify-center items-center">
                        <img src="/reject.svg" alt="Reject" className="w-6 h-6" />
                      </button>
                      <div className="border-r border-zinc-700" />
                      <button className="flex-1 p-4 flex justify-center items-center">
                        <img src="/accept.svg" alt="Like" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {yesterdayProfiles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-center text-gray-500 py-2">Yesterday</h2>
            <div className="grid grid-cols-2 gap-4">
              {yesterdayProfiles.map((profile, index) => (
                <div key={`yesterday-${profile.name}-${index}`} className="relative rounded-xl overflow-hidden">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="p-2">
                      <h3 className="text-lg font-semibold">{profile.name}, {profile.age}</h3>
                    </div>
                    <div className="flex bg-white/10 backdrop-blur-sm rounded-b-xl">
                      <button className="flex-1 p-4 flex justify-center items-center">
                        <img src="/reject.svg" alt="Reject" className="w-6 h-6" />
                      </button>
                      <div className="border-r border-zinc-700" />
                      <button className="flex-1 p-4 flex justify-center items-center">
                        <img src="/accept.svg" alt="Like" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {twoDaysAgoProfiles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-center text-gray-500 py-2">2 days ago</h2>
            <div className="grid grid-cols-2 gap-4">
              {twoDaysAgoProfiles.map((profile, index) => (
                <div key={`two-days-ago-${profile.name}-${index}`} className="relative rounded-xl overflow-hidden">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="p-2">
                      <h3 className="text-lg font-semibold">{profile.name}, {profile.age}</h3>
                    </div>
                    <div className="flex bg-white/10 backdrop-blur-sm rounded-b-xl">
                      <button className="flex-1 p-4 flex justify-center items-center">
                        <img src="/reject.svg" alt="Reject" className="w-6 h-6" />
                      </button>
                      <div className="border-r border-zinc-700" />
                      <button className="flex-1 p-4 flex justify-center items-center">
                        <img src="/accept.svg" alt="Like" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav active="likes" />
    </div>
  );
}
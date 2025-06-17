"use client";
import { useState, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import { doc, getDoc } from "firebase/firestore"; // Import doc and getDoc
import { db } from "../../lib/firebase"; // Adjust path if necessary based on your file structure

export default function MatchesPage() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showRejectX, setShowRejectX] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const cardRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Reference to the 'matches' document within the 'screens' collection
        const matchesDocRef = doc(db, "screens", "matches");
        const matchesDocSnap = await getDoc(matchesDocRef);

        if (matchesDocSnap.exists()) {
          const data = matchesDocSnap.data();
          if (data && Array.isArray(data.profiles)) {
            // Check if 'profiles' field exists and is an array
            setProfiles(data.profiles);
          } else {
            console.warn("The 'matches' document does not contain a 'profiles' array.");
            setProfiles([]); // Set to empty if not found or not an array
          }
        } else {
          console.log("No such 'matches' document!");
          setProfiles([]); // Set to empty if document doesn't exist
        }
      } catch (err) {
        console.error("Error fetching profiles: ", err);
        setError("Failed to load profiles. Please try again later.");
      } finally {
        setIsLoading(false); // Always set loading to false after attempt
      }
    };

    fetchProfiles();
  }, []); // Empty dependency array means this runs once on mount

  const swiped = (direction, name) => {
    console.log(`You swiped ${direction} on ${name}`);
    if (direction === "right") {
      setShowHearts(true);
    } else if (direction === "left") {
      setShowRejectX(true);
      setIsRejected(true);
    }

    setTimeout(() => {
      // Move to the next profile or loop back to the beginning
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
      setShowHearts(false);
      setShowRejectX(false);
      setIsAnimating(false);
      setIsRejected(false);
    }, 500);
  };

  const triggerSwipeAnimation = (direction) => {
    // Prevent swiping if no profiles, still loading, or animating
    if (isAnimating || !cardRef.current || profiles.length === 0 || isLoading) return;

    setIsAnimating(true);

    if (direction === "right") {
      setShowHearts(true);
    } else {
      setShowRejectX(true);
      setIsRejected(true);
    }

    const card = cardRef.current;
    card.style.transition = "transform 0.7s ease-out, opacity 0.7s ease-out";
    card.style.opacity = "1";

    card.style.transform =
      direction === "right"
        ? "translateX(100vw) rotate(15deg)"
        : "translateX(-100vw) rotate(-15deg)";

    setTimeout(() => {
      card.style.opacity = "0";
      card.style.transition = "none";
      card.style.transform = "translateX(0) rotate(0deg)";
      swiped(direction, profiles[currentIndex].name);
    }, 500);
  };

  const handleReject = () => triggerSwipeAnimation("left");
  const handleAccept = () => triggerSwipeAnimation("right");

  if (isLoading) {
    return (
      <div className="bg-[#111111] text-white h-screen flex flex-col items-center justify-center">
        <p>Loading profiles...</p>
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

  if (profiles.length === 0) {
    return (
      <div className="bg-[#111111] text-white h-screen flex flex-col items-center justify-center">
        <p>No profiles found.</p>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="bg-[#111111] text-white h-screen flex flex-col relative">
      <TopBar />
      <div className="flex-1 flex justify-center items-center px-4 relative">
        <div className="relative">
          {showHearts && (
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <img src="/accept.svg" alt="Heart" className="w-12 h-12 animate-heart1" style={{ top: "20%", left: "30%", position: "absolute" }} />
              <img src="/accept.svg" alt="Heart" className="w-12 h-12 animate-heart2" style={{ top: "30%", left: "60%", position: "absolute" }} />
              <img src="/accept.svg" alt="Heart" className="w-12 h-12 animate-heart3" style={{ top: "40%", left: "40%", position: "absolute" }} />
            </div>
          )}
          {showRejectX && (
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="text-red-500 text-9xl font-bold opacity-50 animate-reject-x">X</div>
            </div>
          )}

          {/* Key for TinderCard: When dealing with arrays where items don't have a unique ID from the data itself,
              you might use a combination of properties or an index, but be careful with index if items are reordered.
              In your case, since the array elements are objects with 'name', 'age', etc.,
              we can generate a simple unique key. If Firebase provided an ID for each array element, that would be ideal,
              but it doesn't for array elements directly. For now, let's use a combination. */}
          <TinderCard
            key={`${currentProfile.name}-${currentIndex}`} // Better unique key for array elements
            onSwipe={(dir) => swiped(dir, currentProfile.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              ref={cardRef}
              style={{
                backgroundImage: `url(${currentProfile.image})`,
                filter: isRejected ? "grayscale(100%)" : "none",
              }}
              className="w-[90vw] max-w-sm h-[65vh] bg-cover bg-center rounded-3xl border-2 border-red-500 shadow-lg relative transition-all duration-300"
            >
              <div className="absolute bottom-0 w-full h-100 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-3xl">
                <div className="absolute bottom-0 w-full p-4">
                  <h2 className="text-2xl font-semibold">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <p className="text-sm text-gray-300">{currentProfile.distance}</p>
                </div>
              </div>
            </div>
          </TinderCard>
        </div>
      </div>

      <div className="flex justify-center gap-24 mb-6 pb-24">
        <button
          onClick={handleReject}
          className="w-16 h-16 rounded-full flex bg-red-500 items-center justify-center text-white text-2xl"
          disabled={isAnimating || profiles.length === 0} // Disable buttons if no profiles
        >
          <img src="/reject.svg" alt="Reject" className="w-8 h-8" />
        </button>
        <button
          onClick={handleAccept}
          className="w-16 h-16 rounded-full flex bg-red-500 items-center justify-center text-white text-2xl"
          disabled={isAnimating || profiles.length === 0} // Disable buttons if no profiles
        >
          <img src="/accept.svg" alt="Accept" className="w-8 h-8" />
        </button>
      </div>
      <BottomNav />

      <style jsx>{`
        @keyframes heart1 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-20px, -50px) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes heart2 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(20px, -70px) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes heart3 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(0, -60px) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes reject-x {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .animate-heart1 {
          animation: heart1 0.7s ease-out forwards;
        }
        .animate-heart2 {
          animation: heart2 0.7s ease-out forwards;
        }
        .animate-heart3 {
          animation: heart3 0.7s ease-out forwards;
        }
        .animate-reject-x {
          animation: reject-x 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
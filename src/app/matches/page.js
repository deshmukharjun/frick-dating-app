"use client";
import { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";

const profiles = [
  { name: "Arlene", age: 25, distance: "3 miles", image: "/profile1.png" },
  { name: "Kristin", age: 30, distance: "10 miles", image: "/profile2.png" },
  { name: "Alex", age: 29, distance: "4 miles", image: "/profile3.png" },
  { name: "Jenny", age: 24, distance: "6 miles", image: "/profile4.png" },
  { name: "Michael", age: 28, distance: "2 miles", image: "/profile5.png" },
  { name: "Sophia", age: 26, distance: "7 miles", image: "/profile6.png" },
  { name: "Daniel", age: 31, distance: "8 miles", image: "/profile7.png" },
  { name: "Emma", age: 23, distance: "1 mile", image: "/profile8.png" },
  { name: "John Doe", age: 24, distance: "5 miles", image: "/profile9.png" },
];

export default function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showRejectX, setShowRejectX] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const cardRef = useRef(null);
  

  const swiped = (direction, name) => {
    console.log(`You swiped ${direction} on ${name}`);
    if (direction === "right") {
      setShowHearts(true);
    } else if (direction === "left") {
      setShowRejectX(true);
      setIsRejected(true);
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
      setShowHearts(false);
      setShowRejectX(false);
      setIsAnimating(false);
      setIsRejected(false);
    }, 500);
  };

  const triggerSwipeAnimation = (direction) => {
    if (isAnimating || !cardRef.current) return;
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

          <TinderCard
            key={currentIndex}
            onSwipe={(dir) => swiped(dir, profiles[currentIndex].name)}
            preventSwipe={["up", "down"]}
          >
            <div
              ref={cardRef}
              style={{
                backgroundImage: `url(${profiles[currentIndex].image})`,
                filter: isRejected ? "grayscale(100%)" : "none",
              }}
              className="w-[90vw] max-w-sm h-[65vh] bg-cover bg-center rounded-3xl border-2 border-red-500 shadow-lg relative transition-all duration-300"
            >
              <div className="absolute bottom-0 w-full h-100 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-3xl">
                <div className="absolute bottom-0 w-full p-4">
                  <h2 className="text-2xl font-semibold">
                    {profiles[currentIndex].name}, {profiles[currentIndex].age}
                  </h2>
                  <p className="text-sm text-gray-300">{profiles[currentIndex].distance}</p>
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
          disabled={isAnimating}
        >
          <img src="/reject.svg" alt="Reject" className="w-8 h-8" />
        </button>
        <button
          onClick={handleAccept}
          className="w-16 h-16 rounded-full flex bg-red-500 items-center justify-center text-white text-2xl"
          disabled={isAnimating}
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

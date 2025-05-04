"use client";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";

const profiles = [
    {
      name: "Arlene",
      age: 25,
      distance: "3 miles",
      image: "/profile1.png", // Changed to profile1.png
    },
    {
      name: "Kristin",
      age: 30,
      distance: "10 miles",
      image: "/profile2.png", // Changed to profile2.png
    },
    {
      name: "Alex",
      age: 29,
      distance: "4 miles",
      image: "/profile3.png", // Changed to profile3.png
    },
    {
      name: "Jenny",
      age: 24,
      distance: "6 miles",
      image: "/profile4.png", // Changed to profile4.png
    },
    {
      name: "Michael",
      age: 28,
      distance: "2 miles",
      image: "/profile5.png", // Changed to profile5.png
    },
    {
      name: "Sophia",
      age: 26,
      distance: "7 miles",
      image: "/profile6.png", // Changed to profile6.png
    },
    {
       name: "Daniel",
      age: 31,
      distance: "8 miles",
      image: "/profile7.png", // Changed to profile7.png
    },
    {
      name: "Emma",
      age: 23,
      distance: "1 mile",
      image: "/profile8.png", // Changed to profile8.png
    },
    {
      name: "John Doe",
      age: 24,
      distance: "5 miles",
      image: "/profile9.png", // Changed to profile9.png
    },
];
  
  

export default function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current profile index
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, name) => {
    setLastDirection(direction);
    console.log(`You swiped ${direction} on ${name}`);
    if (direction === "right" || direction === "left") {
      // Move to the next profile when swiped right or left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }
  };

  return (
    <div className="bg-[#111111] text-white h-screen flex flex-col relative">
      <TopBar />

      <div className="flex-1 flex justify-center items-center px-4 relative">
        <TinderCard
          key={currentIndex}
          onSwipe={(dir) => swiped(dir, profiles[currentIndex].name)}
          preventSwipe={["up", "down"]}
        >
        <div
        style={{ backgroundImage: `url(${profiles[currentIndex].image})` }}
        className="w-[90vw] max-w-sm h-[65vh] bg-cover bg-center rounded-3xl border-2 border-red-500 shadow-lg relative"
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

      <div className="flex justify-center gap-24 mb-6 pb-24">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length)}
          className="w-16 h-16 rounded-full flex bg-red-500 items-center justify-center text-white text-2xl"
        >
          <img src="/reject.svg" alt="Reject" className="w-8 h-8" />
        </button>
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length)}
          className="w-16 h-16 rounded-full flex bg-red-500 items-center justify-center text-white text-2xl"
        >
          <img src="/accept.svg" alt="Accept" className="w-8 h-8" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

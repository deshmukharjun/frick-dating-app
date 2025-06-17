"use client";
import React from "react";
import TopBar from "../matches/components/TopBar";
import BottomNav from "../matches/components/BottomNav";

const todayProfiles = [
  { name: "Arlene", age: 25, image: "/profile1.png" },
  { name: "Kristin", age: 30, image: "/profile2.png" },
  { name: "Alex", age: 29, image: "/profile3.png" },
];

const yesterdayProfiles = [
  { name: "Michael", age: 28, image: "/profile5.png" },
  { name: "Sophia", age: 26, image: "/profile6.png" },
  { name: "Jenny", age: 24, image: "/profile4.png" },
];

const twoDaysAgoProfiles = [
  { name: "Daniel", age: 31, image: "/profile7.png" },
  { name: "Emma", age: 23, image: "/profile8.png" },
  { name: "John", age: 24, image: "/profile9.png" },
];

export default function LikesPage() {
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
        {todayProfiles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-center text-gray-500 py-2">Today</h2>
            <div className="grid grid-cols-2 gap-4">
              {todayProfiles.map((profile, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden">
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
                <div key={index} className="relative rounded-xl overflow-hidden">
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
                <div key={index} className="relative rounded-xl overflow-hidden">
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
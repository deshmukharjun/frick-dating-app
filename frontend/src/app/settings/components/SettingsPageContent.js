"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactSlider from "react-slider"

export default function SettingsPageContent() {
  const router = useRouter();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [showPfpModal, setShowPfpModal] = useState(false);
  const [displayName, setDisplayName] = useState("Jenny");
  const [dateOfBirth, setDateOfBirth] = useState("02-05-1997");
  const [phone, setPhone] = useState("+91 9866542389");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [showMe, setShowMe] = useState("Men");
  const [ageRange, setAgeRange] = useState({ min: 22, max: 34 });

  const handlePfpClick = () => {
    setShowPfpModal(true);
  };

  const closePfpModal = () => {
    setShowPfpModal(false);
  };

  const handleAgeRangeChange = (e, bound) => {
    const value = parseInt(e.target.value);
    if (bound === "min") {
      setAgeRange((prev) => ({ ...prev, min: value }));
    } else {
      setAgeRange((prev) => ({ ...prev, max: value }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white relative">
      {/* Header */}
      <div className="flex items-center mb-4 mx-2">
        <button onClick={() => router.back()} className="p-1">
          <Image src="/back_arrow.svg" alt="Back" width={20} height={20} />
        </button>
        <h2 className="text-lg font-semibold ml-2">Profile</h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-[#191919] rounded-t-[24px] pb-50">
        {/* Profile Card */}
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/profile1.png"
              alt="Profile"
              width={56}
              height={56}
              className="rounded-full mr-4 cursor-pointer"
              onClick={handlePfpClick}
            />
            <div>
              <h3 className="font-semibold text-white text-sm">Jenny, 22</h3>
              <p className="text-gray-400 text-xs">Never give up 💛</p>
            </div>
          </div>
        </div>

        {/* Top separator */}
        <div className="h-[1px] bg-[#2a2a2a] mx-4" />

        {/* Account Section */}
        <div className="px-4">
          <div
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="flex items-start py-4 space-x-4 cursor-pointer hover:bg-[#222222] transition"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
              <Image src="/account.svg" alt="Account" width={24} height={24} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">Account</p>
              <p className="text-xs text-gray-400 mt-1">
                Name, Phone number, Date of birth
              </p>
            </div>

            <Image
              src="/arrow-down.svg"
              alt="Toggle"
              width={20}
              height={20}
              className={`mt-1 transition-transform duration-300 ${
                isAccountOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isAccountOpen && (
            <div className="mt-3 mb-4 px-2 space-y-4 transition-all duration-300 ease-in-out">
              {/* Name Field */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md">
                <label className="text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-transparent text-sm text-white text-right outline-none w-1/2"
                />
              </div>

              {/* Date of Birth Field */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md">
                <label className="text-sm text-gray-400">Date of birth</label>
                <input
                  type="text"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="bg-transparent text-sm text-white text-right outline-none w-1/2"
                />
              </div>

              {/* Contact Number Field */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md">
                <label className="text-sm text-gray-400">Contact number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent text-sm text-white text-right outline-none w-1/2"
                />
              </div>
            </div>
          )}


          {/* Separator */}
          <div className="h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Discovery Settings Section */}
        <div className="px-4">
          <div
            onClick={() => setIsDiscoveryOpen(!isDiscoveryOpen)}
            className="flex items-start py-4 space-x-4 cursor-pointer hover:bg-[#222222] transition"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
              <Image src="/setting.svg" alt="Discovery Settings" width={24} height={24} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">Discovery Settings</p>
              <p className="text-xs text-gray-400 mt-1">Language, Age, Interest</p>
            </div>

            <Image
              src="/arrow-down.svg"
              alt="Toggle"
              width={20}
              height={20}
              className={`mt-1 transition-transform duration-300 ${
                isDiscoveryOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isDiscoveryOpen && (
            <div className="mt-3 mb-4 px-2 space-y-4 transition-all duration-300 ease-in-out">
              {/* Preferred Language */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md">
                <label className="text-sm text-gray-400">Preferred Languages</label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="bg-transparent text-sm text-blue-400 outline-none text-right w-1/2"
                >
                  <option className="bg-[#1c1c1c]" value="English">English</option>
                  <option className="bg-[#1c1c1c]" value="Spanish">Spanish</option>
                  <option className="bg-[#1c1c1c]" value="French">French</option>
                </select>
              </div>

              {/* Show Me */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md">
                <label className="text-sm text-gray-400">Show Me</label>
                <select
                  value={showMe}
                  onChange={(e) => setShowMe(e.target.value)}
                  className="bg-transparent text-sm text-blue-400 outline-none text-right w-1/2"
                >
                  <option className="bg-[#1c1c1c]" value="Men">Men</option>
                  <option className="bg-[#1c1c1c]" value="Women">Women</option>
                  <option className="bg-[#1c1c1c]" value="Both">Both</option>
                </select>
              </div>

              {/* Age Range */}
            <div className="px-4 py-3 bg-[#1c1c1c] border border-[#3a3a3a] rounded-md">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Age Range</label>
                <span className="text-white text-sm">{ageRange.min} - {ageRange.max}</span>
              </div>

              <ReactSlider
                className="mt-4 h-4"
                thumbClassName="h-3 w-3 bg-red-600 rounded-full cursor-pointer focus:outline-none -translate-y-1"
                value={[ageRange.min, ageRange.max]}
                min={18}
                max={80}
                onChange={([min, max]) => setAgeRange({ min, max })}
                pearling
                minDistance={1}
                renderTrack={(props, state) => {
                  const { key, ...rest } = props; // Extract key to avoid spreading it
                  const trackIndex = state.index;
                  const bgColor = trackIndex === 1 ? 'bg-red-600' : 'bg-gray-400';

                  return (
                    <div
                      key={key} // Apply key explicitly
                      {...rest}
                      className={`h-1 ${bgColor} rounded`}
                    />
                  );
                }}
              />
              <div className="flex justify-between text-white text-sm mt-1">
                <span>{ageRange.min}</span>
                <span>{ageRange.max}</span>
              </div>
            </div>
            </div>
          )}



          {/* Separator */}
          <div className="h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* Logout and Delete Account Buttons */}
        <div className="px-4 py-4 space-y-4">
          <button className="w-full py-3 bg-red-500 text-white rounded-full text-sm font-medium">
            Logout
          </button>
          <button className="w-full py-3 bg-transparent border border-red-500 text-red-500 rounded-full text-sm font-medium">
            Delete Account
          </button>
        </div>
      </div>

      {/* Fullscreen PFP Modal */}
      {showPfpModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closePfpModal}
        >
          <Image
            src="/profile1.png"
            alt="Enlarged Profile"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}
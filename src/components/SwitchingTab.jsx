import React from "react";

const SwitchingTab = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="text-sm  p-1 ms-auto  bg-white rounded-full">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`py-2 w-[100px] rounded-full transition-colors ${
            activeTab === tab.toLowerCase()
              ? "bg-gradient text-white"
              : "text-black"
          }`}
        >
          {tab === "Movie" ? "Movies" : tab === "Tv" ? 'TV Shows' : tab}
        </button>
      ))}
    </div>
  );
};

export default SwitchingTab;

import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillAppstore } from 'react-icons/ai';
import { TABS } from '../constants';

const SubHeader = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState(TABS[1]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabClick(tab);
  };

  return (
    <div className="font-medium text-center text-gray-500 flex items-center justify-between border-b border-gray-200">
      <ul className="text-sm flex flex-wrap">
        {TABS.map((tab, index) => (
          <li key={index} className="mr-2">
            <button
              className={`${
                tab === activeTab
                  ? 'border-b-2 border-pink-500 text-gray-800'
                  : 'hover:text-gray-800'
              } inline-block p-4 rounded-t-lg capitalize`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="text-xl flex items-center">
        <AiFillAppstore className="mr-3" />
        <GiHamburgerMenu />
      </div>
    </div>
  );
};

export default SubHeader;

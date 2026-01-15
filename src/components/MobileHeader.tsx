import React from 'react';
import LightDarkToggle from './LightDarkToggle';
import Hamburger from '/src/assets/hamburger.svg?react';

type Props = {
  setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className="w-full h-16 p-4 bg-blackground sticky top-0 xs:hidden flex justify-end z-1001 gap-8">
      <LightDarkToggle />
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className="size-8" />
      </button>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import pagesList from '../data/pages.json';

function Navbar() {
  const navContent = useRef<null | HTMLDivElement>(null);
  const hamburger = useRef<null | HTMLButtonElement>(null);

  const handleHamburger = () => {
    navContent.current?.classList.toggle('hidden');
    hamburger.current?.classList.toggle('hamburger-active');
  };

  return (
    <header className='bg-white sticky top-0 z-50' role='navbar'>
      <div className='partial-base-style font-bold py-5 flex justify-between items-center gap-x-20 lg:py-9'>
        <Image
          src='/assets/images/logo.svg'
          width={100}
          height={100}
          alt='Shortly logo'
          className='text-white'
          style={{
            filter:
              'invert(10%) sepia(6%) saturate(1395%) hue-rotate(218deg) brightness(98%) contrast(91%)',
          }}
        />
        <button
          className='hamburger-icon'
          onClick={handleHamburger}
          ref={hamburger}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          className='hidden grow text-lg text-center text-white absolute top-24 p-10 left-7 right-7 bg-primary-dark-violet rounded-xl justify-between items-center lg:text-base lg:p-0 lg:text-neutral-grayfish-violet lg:flex lg:bg-transparent lg:static'
          ref={navContent}
        >
          <ul className='mr-auto flex flex-col gap-y-6 cursor-pointer lg:flex-row lg:gap-x-6'>
            {pagesList.map((item, index) => {
              return (
                <li key={index} className='lg:hover:text-primary-dark-violet'>
                  {item.name}
                </li>
              );
            })}
          </ul>
          <hr className='my-6 lg:hidden' />
          <div id='user-sign-in' className='flex flex-col gap-y-6 lg:flex-row'>
            <button className='px-8 lg:py-3 lg:hover:text-primary-dark-violet'>
              Login
            </button>
            <button className='px-8 py-3 primary-button'>Sign Up</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;

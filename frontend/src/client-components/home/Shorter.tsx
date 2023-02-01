'use client';

import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputLink } from '@/features/shorter/shorterSlice';
import { getShortenLinks } from '@/features/shorter/shorterSlice';
import { RootState } from '@/store';
import Button from '@/components/Button';
import ShortLinkCard from '@/components/ShortLinkCard';

function Shorter() {
  const { isLoading, result } = useSelector(
    (store: RootState) => store.shorter
  );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(getShortenLinks());
  };

  return (
    <section id='shorter' className='mt-32 py-3 bg-neutral-slate scroll-m-60'>
      <div className='partial-base-style'>
        <form
          onSubmit={handleSubmit}
          className='-mt-20 bg-primary-dark-violet bg-shorten-mobile bg-no-repeat bg-right-top py-6 px-5 flex flex-col gap-5 justify-between items-center rounded-xl lg:bg-shorten-desktop lg:bg-cover lg:flex-row lg:py-10 lg:px-14'
        >
          <div className='w-full relative mb-5 lg:mb-0'>
            <input
              type='url'
              placeholder='Shorten a link here...'
              className={`outline-none w-full px-5 py-3 rounded-lg border-2 border-white peer lg:rounded-xl lg:flex-auto`}
              onChange={e => {
                const inputValue = e.target.value;
                dispatch(changeInputLink(inputValue));
              }}
              required
            />
            <p
              className={`invisible mt-1 absolute w-full justify-self-start text-sm text-secondary-red`}
            >
              Please add a link
            </p>
          </div>
          <Button
            type='submit'
            className='min-w-[200px] w-full primary-button border-2 border-primary-cyan rounded-lg lg:rounded-xl lg:flex-1'
            primary
          >
            {isLoading ? 'Loading...' : 'Shorten it!'}
          </Button>
        </form>
        {result.map((item, index) => {
          return (
            <ShortLinkCard
              key={index}
              originalLink={item.originalLink}
              fullShortLink={item.fullShortLink}
            />
          );
        })}
      </div>
    </section>
  );
}
export default Shorter;

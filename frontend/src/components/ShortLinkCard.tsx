'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/Button';
import {
  copyShortLink,
  changeCopyState,
} from '@/features/shorter/shorterSlice';

interface ElementProps {
  originalLink: string;
  fullShortLink: string;
}

function ShortLinkCard({ originalLink, fullShortLink }: ElementProps) {
  const { copyText } = useSelector((store: RootState) => store.shorter);

  const dispatch = useDispatch();

  return (
    <div className='copied-link bg-white flex flex-col gap-5 rounded-xl justify-between items-center my-5 py-6 px-9 lg:flex-row'>
      <div className='prev-link'>{originalLink}</div>
      <div
        className='shorted-link text-primary-cyan grow text-end'
        onCopy={() => {
          dispatch(changeCopyState({ isCopied: true, text: fullShortLink }));
          setTimeout(() => {
            dispatch(changeCopyState({ isCopied: false, text: '' }));
          }, 2000);
        }}
      >
        {fullShortLink}
      </div>
      <Button
        type='button'
        primary
        className={`w-full rounded-lg lg:rounded-xl lg:w-[120px] ${
          copyText.text === fullShortLink && 'copy-button--active'
        }`}
        onClick={() => {
          dispatch(copyShortLink(fullShortLink));
          dispatch(changeCopyState({ isCopied: true, text: fullShortLink }));
          setTimeout(() => {
            dispatch(changeCopyState({ isCopied: false, text: '' }));
          }, 2000);
        }}
      >
        {copyText.text === fullShortLink ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}
export default ShortLinkCard;

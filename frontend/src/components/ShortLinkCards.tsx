'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import Button from '@/components/Button';
import {
  copyShortLink,
  changeCopyState,
} from '@/features/shorter/shorterSlice';

interface ElementProps {
  advanced?: boolean;
}

function ShortLinkCards({ advanced = false }: ElementProps) {
  const { result, copyText } = useSelector((store: RootState) => store.shorter);

  const dispatch = useDispatch();

  return (
    <>
      {result.map(item => {
        const { code, originalLink, fullShortLink } = item;

        return (
          <div
            key={code}
            className='copied-link bg-white flex flex-col gap-5 rounded-xl justify-between items-center my-5 py-6 px-9 lg:flex-row'
          >
            <div className='prev-link'>{originalLink}</div>
            <div
              className='shorted-link text-primary-cyan grow text-end'
              onCopy={() => {
                dispatch(
                  changeCopyState({ isCopied: true, text: fullShortLink })
                );
                setTimeout(() => {
                  dispatch(changeCopyState({ isCopied: false, text: '' }));
                }, 2000);
              }}
            >
              {fullShortLink}
            </div>
            <div className='w-full flex flex-col justify-end gap-3 lg:w-fit lg:flex-row'>
              {advanced && (
                <Button
                  primary={false}
                  onClick={() => console.log(code)}
                  className='w-full rounded-lg lg:rounded-xl lg:w-[120px]'
                >
                  Info
                </Button>
              )}
              <Button
                type='button'
                primary
                className={`w-full rounded-lg lg:rounded-xl lg:w-[120px] ${
                  copyText.text === fullShortLink && 'copy-button--active'
                }`}
                onClick={() => {
                  dispatch(copyShortLink(fullShortLink));
                  dispatch(
                    changeCopyState({ isCopied: true, text: fullShortLink })
                  );
                  setTimeout(() => {
                    dispatch(changeCopyState({ isCopied: false, text: '' }));
                  }, 2000);
                }}
              >
                {copyText.text === fullShortLink ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ShortLinkCards;

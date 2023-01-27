import Image from 'next/image';
import { Poppins } from '@next/font/google';
import IllustrationWorking from '../assets/images/illustration-working.svg';

const poppinsNormal = Poppins({
  subsets: ['latin'],
  weight: '400',
});

const poppinsBold = Poppins({
  subsets: ['latin'],
  weight: '700',
});

export default function Home() {
  return (
    <>
      <section
        role='jumbotron'
        className={`partial-base-style mt-8 mb-44 text-center flex flex-col gap-1 items-center lg:text-start lg:flex-row ${poppinsBold.className}`}
      >
        <Image
          src={IllustrationWorking}
          alt='Illustration working'
          className='-mr-44 sm:w-[800px] lg:order-last'
        />
        <div className='mt-6'>
          <h1 className='grow text-neutral-very-dark-violet text-[2.5rem] font-bold leading-[3.7rem] lg:leading-[5rem] lg:text-7xl'>
            More than just shorter links
          </h1>
          <p
            className={`text-neutral-grayfish-violet my-4 text-xl lg:w-[70%] ${poppinsNormal.className}`}
          >
            Build your brand's recognition and get detailed insights on how your
            links are performing.
          </p>
          <button className='my-4 primary-button'>Get Started</button>
        </div>
      </section>
    </>
  );
}

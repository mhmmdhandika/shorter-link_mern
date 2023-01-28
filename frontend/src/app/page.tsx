import Image from 'next/image';
import Link from 'next/link';
import Shorter from '../client-components/home/Shorter';
import excessList from '@/data/excessList.json';
import Button from '@/components/Button';

export default function Home() {
  return (
    <>
      {/* Jumbotron */}
      <section
        role='jumbotron'
        className={`partial-base-style mt-8 mb-44 text-center flex flex-col gap-1 items-center lg:text-start lg:flex-row`}
      >
        <Image
          src='/assets/images/illustration-working.svg'
          width={500}
          height={200}
          alt='Illustration working'
          className='-mr-52 sm:w-[800px] lg:order-last'
        />
        <div className='mt-6'>
          <h1 className='grow text-neutral-very-dark-violet text-[2.5rem] font-bold leading-[3.7rem] lg:leading-[5rem] lg:text-7xl'>
            More than just shorter links
          </h1>
          <p className={`text-neutral-grayfish-violet my-4 text-xl lg:w-[80%]`}>
            Build your brand's recognition and get detailed insights on how your
            links are performing.
          </p>
          <Button
            href='#shorter'
            primary
            className='mt-4 w-fit block mx-auto lg:mx-0'
          >
            Get started
          </Button>
        </div>
      </section>
      {/* Shorter link section (client component) */}
      <Shorter />
      {/* Excess section */}
      <section className='py-28 bg-neutral-light'>
        <div className='partial-base-style'>
          <div className='mb-16 text-center'>
            <h1 className='font-bold text-4xl text-primary-dark-violet'>
              Advanced Statistics
            </h1>
            <p className='text-neutral-grayfish-violet w-full mx-auto my-4 lg:w-[400px]'>
              Track how your links are performing across the web with our
              advanced statictics dashboard.
            </p>
          </div>
          <div className='relative text-center flex flex-col justify-center items-baseline gap-20 lg:flex-row lg:gap-10 lg:h-72 lg:text-start'>
            {excessList.map((item, index) => {
              const cardPosition = ['self-start', 'self-center', 'self-end'];

              return (
                <article
                  key={index}
                  className={`w-full z-20 bg-white p-11 rounded-lg ${cardPosition[index]} lg:w-auto`}
                >
                  <div className='-mt-20 flex justify-center lg:justify-start'>
                    <div className='bg-primary-dark-violet w-[80px] h-[80px] rounded-[50%] flex items-center justify-center'>
                      <img src={item.icon} alt='Track icon' />
                    </div>
                  </div>
                  <h1 className='my-4 text-neutral-very-dark-violet font-semibold text-xl'>
                    {item.name}
                  </h1>
                  <p className='text-base text-neutral-grayfish-violet'>
                    {item.text}
                  </p>
                </article>
              );
            })}
            <div className='absolute left-1/2 -translate-x-1/2 w-2 h-full bg-primary-cyan lg:w-full lg:h-2 lg:top-1/2 lg:-translate-y-1/2'></div>
          </div>
        </div>
      </section>
      {/* CTA button section */}
      <section
        id='starter'
        className='bg-primary-dark-violet bg-boost-mobile bg-no-repeat bg-center bg-cover text-center py-16 lg:bg-boost-desktop'
      >
        <h1 className='text-3xl font-bold text-white lg:text-4xl'>
          Boost your links today
        </h1>
        <Link href='/shorter'>
          <Button primary className='mt-5'>
            Get Started
          </Button>
        </Link>
      </section>
    </>
  );
}

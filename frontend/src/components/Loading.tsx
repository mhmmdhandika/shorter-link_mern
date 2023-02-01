import Image from 'next/image';

function Loading() {
  return (
    <div className='h-[600px] flex flex-col justify-center items-center'>
      <div className='partial-base-style text-center'>
        <Image
          src='/assets/images/loading.svg'
          alt='Loading'
          width={200}
          height={200}
        />
        <h1 className='font-semibold text-2xl text-primary-dark-violet my-3'>
          Loading...
        </h1>
        <p className='text-primary-dark-violet/70'>Please, wait a seconds</p>
      </div>
    </div>
  );
}
export default Loading;

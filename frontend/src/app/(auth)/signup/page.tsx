'use client';

import Image from 'next/image';
import LabelInput from '@/components/LabelInput';
import Button from '@/components/Button';
import Link from 'next/link';

function Signup() {
  return (
    <section className='relative w-full h-full text-neutral-very-dark-violet grid justify-center items-center lg:grid-cols-[50%_50%]'>
      {/* link to back to home */}
      <Link
        href='/'
        className='absolute top-7 left-7 flex gap-2 items-center mb-5 text-black lg:text-white'
      >
        <Image
          src='/assets/images/back-icon.png'
          alt='back icon'
          width={20}
          height={20}
          className='brightness-0 lg:brightness-100'
        />
        Back to home
      </Link>
      {/* image decoration */}
      <div className="hidden lg:w-full lg:h-full lg:block lg:bg-[url('/assets/images/bg-blob.svg')] lg:bg-no-repeat lg:bg-cover lg:flex lg:flex-col lg:justify-center lg:items-center">
        <Image
          src='/assets/images/signup.svg'
          alt='Sign up image'
          width={380}
          height={380}
        />
        <h1 className='text-2xl font-semibold mt-7 text-neutral-white'>
          Welcome people!
        </h1>
      </div>
      {/* form sign up */}
      <div className='w-full p-10 flex justify-center items-center sm:mx-auto sm:max-w-[28rem] lg:max-w-auto'>
        <form className='w-full bg-neutral-white flex flex-col justify-center items-center rounded-lg'>
          <Image
            src='/assets/images/profile.svg'
            alt='profile icon'
            width={60}
            height={60}
            style={{
              filter:
                'invert(78%) sepia(54%) saturate(666%) hue-rotate(122deg) brightness(88%) contrast(82%)',
            }}
          />
          <div className='w-full'>
            {/* name */}
            <LabelInput label='Name' name='name' id='name' type='text' />
            {/* email */}
            <LabelInput label='Email' name='email' id='email' type='email' />
            {/* password */}
            <LabelInput
              label='Password'
              name='password'
              id='password'
              type='password'
            />
            <Button primary type='submit' className='w-full rounded-md mt-1'>
              Sign up
            </Button>
            <p className='text-center text-sm mt-8'>
              Already have an account?{' '}
              <Link
                href='/login'
                className=' text-primary-cyan font-medium hover:underline'
              >
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Signup;

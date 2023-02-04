import Image from 'next/image';
import LabelInput from '@/components/LabelInput';
import Button from '@/components/Button';
import Link from 'next/link';

function SignUp() {
  return (
    <section className='w-full h-full grid justify-center items-center text-neutral-very-dark-violet'>
      {/* image decoration */}
      <div className='hidden'></div>
      {/* form sign up */}
      <form className='bg-neutral-white w-fit flex flex-col justify-center items-center p-10 rounded-lg'>
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
        <div>
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
    </section>
  );
}
export default SignUp;

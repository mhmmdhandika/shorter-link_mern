import Shorter from '@/components/Shorter';
import ShortLinkCards from '@/components/ShortLinkCards';

function ShorterPage() {
  return (
    <>
      <section id='shorter' className='mt-32 py-3 bg-neutral-slate'>
        <div className='partial-base-style'>
          <Shorter className='-mt-20' />
          <ShortLinkCards advanced />
        </div>
      </section>
    </>
  );
}
export default ShorterPage;

import Shorter from '@/components/Shorter';
import ShorterLinkCards from '@/components/ShortLinkCards';

function ShorterPage() {
  return (
    <>
      {/* <h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        enim odit tenetur fuga nesciunt nostrum laudantium vel saepe tempora
        necessitatibus, illum earum culpa animi? Odio sunt temporibus qui nobis
        unde.
      </h1> */}
      <section>
        <div className='partial-base-style'>
          <Shorter />
          <ShorterLinkCards />
        </div>
      </section>
    </>
  );
}
export default ShorterPage;

import Image from 'next/image';
import footerContent from '../data/footerContent.json';
import socmed from '../data/socmed.json';

function Footer() {
  return (
    <footer className='section-padding bg-neutral-very-dark-violet text-white'>
      <div className='partial-base-style text-center flex flex-col justify-between items-center gap-8 py-28 lg:text-start lg:flex-row lg:items-start'>
        {/* Footer title */}
        <span className='text-4xl'>
          <Image
            src='/assets/images/logo.svg'
            alt='Shortly logo'
            width={130}
            height={120}
            style={{
              filter:
                'invert(100%) sepia(0%) saturate(0%) hue-rotate(82deg) brightness(105%) contrast(105%)',
            }}
          />
        </span>
        {/* Footer contents */}
        {Object.keys(footerContent).map((keyItem: string) => {
          const title = keyItem;
          const contents = footerContent[keyItem as keyof typeof footerContent];

          return (
            <div className='footer-section' key={keyItem}>
              <h2 className='capitalize text-lg font-bold mb-1'>{title}</h2>
              <ul>
                {contents.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='my-3 text-neutral-gray hover:text-primary-cyan hover:font-bold'
                    >
                      <a href={item.url}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className='footer-section'>
          <ul className='flex gap-4'>
            {socmed.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.url}>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={30}
                      height={30}
                      className='socmed-icon'
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

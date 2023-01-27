import { ReactComponent as IconFacebook } from '../assets/images/icon-facebook.svg';
import { ReactComponent as IconTwitter } from '../assets/images/icon-twitter.svg';
import { ReactComponent as IconPinterest } from '../assets/images/icon-pinterest.svg';
import { ReactComponent as IconInstagram } from '../assets/images/icon-instagram.svg';

const features = [
  { title: 'Features' },
  [
    {
      name: 'Link Shortening',
      url: '#',
    },
    {
      name: 'Branded Links',
      url: '#',
    },
    {
      name: 'Analytics',
      url: '#',
    },
  ],
];

const resources = [
  { title: 'Resources' },
  [
    {
      name: 'Blog',
      url: '#',
    },
    {
      name: 'Developers',
      url: '#',
    },
    {
      name: 'Support',
      url: '#',
    },
  ],
];

const company = [
  { title: 'Company' },
  [
    {
      name: 'About',
      url: '#',
    },
    {
      name: 'Our teams',
      url: '#',
    },
    {
      name: 'Careers',
      url: '#',
    },
    {
      name: 'Contact',
      url: '#',
    },
  ],
];

const icons = [
  {
    name: 'Facebook',
    icon: <IconFacebook />,
    url: '#',
  },
  {
    name: 'Twitter',
    icon: <IconTwitter />,
    url: '#',
  },
  {
    name: 'Pinterest',
    icon: <IconPinterest />,
    url: '#',
  },
  {
    name: 'Instagram',
    icon: <IconInstagram />,
    url: '#',
  },
];

export { features, resources, company, icons };

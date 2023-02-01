'use client';

import { createElement } from 'react';

interface ButtonTypes {
  children: React.ReactNode;
  href?: string;
  type?: string;
  primary: boolean;
  className?: string;
  [x: string]: any;
}

function Button(props: ButtonTypes) {
  const {
    children,
    href,
    type = 'button',
    primary = true,
    className,
    ...other
  } = props;

  const customStyles = [className];

  const elementProps = {
    ...other,
    className: `${
      primary ? 'primary-button' : 'secondary-button'
    } ${customStyles.join(' ')}`,
  };

  console.log(elementProps);

  if (href) {
    return createElement('a', { ...elementProps, href }, children);
  }

  return createElement('button', { ...elementProps, type }, children);
}
export default Button;

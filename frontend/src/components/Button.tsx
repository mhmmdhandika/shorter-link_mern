'use client';

import { createElement } from 'react';

interface ButtonTypes {
  children: React.ReactNode;
  href?: string;
  primary: boolean;
  className: string;
  onClick?: () => void;
}

function Button({
  children,
  href,
  primary = true,
  className,
  onClick,
}: ButtonTypes) {
  const customStyles = [className];

  const elementProps = {
    onClick,
    className: `${primary && 'primary-button'} ${customStyles.join(' ')}`,
  };

  if (href) {
    return createElement('a', { ...elementProps, href }, children);
  }

  return createElement('button', { ...elementProps }, children);
}
export default Button;

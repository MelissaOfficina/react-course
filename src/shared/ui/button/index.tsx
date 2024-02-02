import { FC, PropsWithChildren } from 'react';
import './style.module.scss';

const Button: FC<PropsWithChildren> = ({
  children,
  onClick: handleClick,
  type = 'button',
}) => (
  <div>
    <button onClick={handleClick} type={type}>
      {children}
    </button>
  </div>
);

export default Button;

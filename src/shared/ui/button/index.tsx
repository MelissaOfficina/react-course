/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { IButtonProps } from 'shared/ui/button/types';
import { css } from '@emotion/react';

const Button: FC<IButtonProps> = ({ children, onClick: handleClick }) => (
  <div>
    <button
      onClick={handleClick}
      css={css`
        border: 0;
        background-color: #7daadd;
        height: 50px;
        line-height: 40px;
        padding: 0 24px;
        margin-top: 20px;
        cursor: pointer;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        &:hover {
          background-color: black;
        }
      `}
      type="button"
    >
      {children}
    </button>
  </div>
);

export default Button;

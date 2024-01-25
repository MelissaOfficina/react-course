/** @jsxImportSource @emotion/react */
import { FC, forwardRef } from 'react';
import { css } from '@emotion/react';

const Textarea: FC = forwardRef<HTMLTextAreaElement>((props, ref) => (
  <textarea
    ref={ref}
    css={css`
      width: 400px;
      height: 100px;
      padding: 10px 15px;
    `}
  />
));

export default Textarea;

// компонент списка, где можно добавлять значения в этот список

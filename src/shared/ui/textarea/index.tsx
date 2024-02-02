import { FC, forwardRef } from 'react';
import './style.module.scss';

const Textarea: FC = forwardRef<HTMLTextAreaElement>((props, ref) => (
  <textarea ref={ref} />
));

export default Textarea;

// компонент списка, где можно добавлять значения в этот список

import { FC } from 'react';
import { css, Global } from '@emotion/react';

import List from '../components/list';

const App: FC = () => (
  <div>
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          font-family: Inter, Arial, sans-serif;
          background-color: #e8ecf2;
        },
      `}
    />
    <List />
  </div>
);

export default App;

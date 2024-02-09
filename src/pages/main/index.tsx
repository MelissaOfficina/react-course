import { FC } from 'react';

import List from '../../components/list';
import Header from '../../components/header';

const MainPage: FC = () => (
  <div className="container">
    <Header />
    <List />
  </div>
);

export default MainPage;

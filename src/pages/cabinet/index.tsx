import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/store/hooks';

import Header from '../../components/header';

const Cabinet: FC = () => {
  const userLogin = useAppSelector((state) => state.auth.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLogin) {
      navigate('/auth');
    }
  });

  return (
    <div className="container">
      <Header />
      <h1>Ваш личный кабинет!</h1>
    </div>
  );
};

export default Cabinet;

import { FC, useEffect } from 'react';
import List from '../../components/list';
import Header from '../../components/header';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Cabinet: FC = () => {
  const [cookie, setCookie] = useCookies(['auth']);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookie.auth) {
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

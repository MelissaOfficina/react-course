import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { logout } from 'pages/auth/auth-slice';
import { FC } from 'react';

import style from './style.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLogin = useAppSelector((state) => state.auth.login);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className={style.header}>
      <div className={style.links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Главная
        </NavLink>
        {!userLogin && (
          <NavLink
            to="/auth"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Авторизация
          </NavLink>
        )}
        {userLogin && <NavLink to="/cabinet">Личный кабинет</NavLink>}
      </div>
      {userLogin && (
        <div>
          Вы авторизованы как <strong>{userLogin}</strong>.{' '}
          <Link onClick={handleLogout}>Выйти?</Link>
        </div>
      )}
    </div>
  );
};

export default Header;

import style from './style.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const navigate = useNavigate();
  const handlerLogout = () => {
    setCookie('auth', false);
    navigate('/');
  };
  return (
    <div className={style.header}>
      <div className={style.links}>
        <NavLink to="/">Главная</NavLink>
        {!cookies.auth && <NavLink to="/auth">Авторизация</NavLink>}
        {cookies.auth && <NavLink to="/cabinet">Личный кабинет</NavLink>}
      </div>
      {cookies.auth && (
        <div>
          Вы авторизованы. <Link onClick={handlerLogout}>Выйти?</Link>
        </div>
      )}
    </div>
  );
};

export default Header;

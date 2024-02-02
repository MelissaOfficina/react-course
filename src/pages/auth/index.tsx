import Header from '../../components/header';
import { Button } from 'shared/ui';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const [cookie, setCookie] = useCookies(['auth']);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookie.auth) {
      navigate('/');
    }
  });
  const handleAuth = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() !== false) {
      setCookie('auth', true);
      navigate('/');
    } else {
      alert('errors!');
    }
  };
  return (
    <div className="container">
      <Header />
      <h1>Авторизация</h1>
      <form className={style.form_block} method="post" onSubmit={handleAuth}>
        <div className={style.input_block}>
          <label htmlFor="login">Введите ваш логин</label>
          <input type="text" name="login" required={true} />
        </div>
        <div className={style.input_block}>
          <label htmlFor="password">Введите ваш пароль</label>
          <input type="password" name="password" required={true} />
        </div>
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
};

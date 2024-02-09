import { Button } from 'shared/ui';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import Header from '../../components/header';
import { IInputs } from '../../components/list/types';

import style from './style.module.scss';
import { login } from './auth-slice';

const Auth: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.auth.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    dispatch(login(data.login));
    navigate('/');
  };
  useEffect(() => {
    if (userLogin) {
      navigate('/');
    }
  });
  return (
    <div className="container">
      <Header />
      <h1>Авторизация</h1>
      <form
        className={style.form_block}
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.input_block}>
          <label htmlFor="login">Введите ваш логин</label>
          <div>
            <input id="login" {...register('login', { required: true })} />
            {errors.login && (
              <span className="error">Необходимо ввести логин</span>
            )}
          </div>
        </div>
        <div className={style.input_block}>
          <label htmlFor="password">Введите ваш пароль</label>
          <div>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="error">Необходимо ввести пароль</span>
            )}
          </div>
        </div>
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
};

export default Auth;

import { FC, PropsWithChildren, useId } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import style from './style.module.scss';
import { IInputs } from './types';
import { add, check } from './list-slice';

const List: FC<PropsWithChildren> = () => {
  const userLogin = useAppSelector((state) => state.auth.login);
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.list);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IInputs>();

  const getUID = () => Date.now().toString(36);

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    if (data.text.length > 0) {
      const ids = getUID();
      dispatch(
        add({
          id: ids,
          text: String(data.text),
          checked: false,
        }),
      );
      resetField('text');
    }
  };

  const handleCheckList = (event) => {
    event.target.parentElement.style = 'text-decoration:line-through';
    setTimeout(() => {
      dispatch(check(event.target.dataset.key));
    }, 500);
  };

  return userLogin ? (
    <div>
      <h1>Добавить запись в список</h1>
      {lists.map((item, index) => (
        <label
          htmlFor={`list_item_${item.id}`}
          className={style.list_item}
          key={`list_item_${item.id}`}
        >
          <input
            type="checkbox"
            onClick={handleCheckList}
            id={`list_item_${item.id}`}
            data-key={item.id}
            name="list[]"
          />
          <span>
            {index + 1}. {item.text}
          </span>
        </label>
      ))}
      <div className={style.textarea_block}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register('text', { required: true, maxLength: 200 })} />
          <div>
            {errors.text && (
              <span className="error">
                Необходимо заполнить поле. Количество символов не более 200
              </span>
            )}
          </div>
          <div>
            <button type="submit">Добавить запись</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <>
      <h1>Необходимо авторизоваться</h1>
      <Link to="/auth">Перейти на страницу авторизации</Link>
    </>
  );
};

export default List;

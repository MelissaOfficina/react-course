import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button, Textarea } from 'shared/ui';
import style from './style.module.scss';

import { IListType } from './types';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const List: FC<PropsWithChildren> = () => {
  const [list, setList] = useState<IListType[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const inputRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (inputRef?.current?.value) {
      inputRef.current.value = '';
    }
  }, [list]);

  const handleAddListElement = () => {
    if (!inputRef.current?.value) {
      return;
    }
    setList((previous) => [
      ...previous,
      {
        id: previous.length || 1,
        text: String(inputRef.current.value),
        checked: false,
      },
    ]);
  };

  const handleCheckList = (e) => {
    console.log(e.target.dataset.key);
  };

  return cookies.auth ? (
    <div>
      <h1>Добавить запись в список</h1>
      {list.map((item, index) => (
        <label
          htmlFor={`list_item_${index + 1}`}
          className={style.list_item}
          key={`list_item_${index + 1}`}
        >
          <input
            type="checkbox"
            onClick={handleCheckList}
            id={`list_item_${index + 1}`}
            data-key={index + 1}
            name="list[1]"
          />
          <span>
            {index + 1}. {item.text}
          </span>
        </label>
      ))}
      <div className={style.textarea_block}>
        <Textarea ref={inputRef} />
        <Button onClick={handleAddListElement}>Добавить запись</Button>
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

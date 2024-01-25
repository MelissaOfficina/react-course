/** @jsxImportSource @emotion/react */
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Button, Textarea } from 'shared/ui';
import { css, Global } from '@emotion/react';

import { IListType } from './types';

const List: FC<PropsWithChildren> = () => {
  const [list, setList] = useState<IListType[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    // eslint-disable-next-line functional/immutable-data
    inputRef.current.value = '';
  }, [list]); // Only re-run the effect if count changes

  const handleAddListElement = () => {
    if (!inputRef.current?.value) {
      return;
    }
    setList((previous) => [
      ...previous,
      {
        id: previous.length || 1,
        text: String(inputRef.current.value),
      },
    ]);
  };

  return (
    <div
      css={css`
        padding: 24px;
      `}
    >
      <h1>Добавить запись в список</h1>
      <Global
        styles={css`
          .list-item:nth-of-type(even) {
            background-color: #b7c6d7;
          }
        `}
      />
      {list.map((item, index) => (
        <div
          className="list-item"
          key={`list_item_${index + 1}`}
          css={css`
            padding: 16px;
            background-color: #c6ccd3;
            font-size: 16px;
            &:hover {
              background-color: #a6b0be;
            }
          `}
        >
          {index + 1}. {item.text}
        </div>
      ))}
      <div
        css={css`
          padding: 24px 0;
          background-color: #e8ecf2;
          font-size: 24px;
        `}
      >
        <Textarea
          ref={inputRef}
          css={css`
            width: 300px;
            height: 100px;
          `}
        />
        <Button onClick={handleAddListElement}>Добавить запись</Button>
      </div>
    </div>
  );
};

export default List;

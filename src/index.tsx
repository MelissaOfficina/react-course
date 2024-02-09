import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'app';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions  -- элемент точно есть
  document.querySelector('#root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

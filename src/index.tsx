import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from './App';
import store from 'store';

import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

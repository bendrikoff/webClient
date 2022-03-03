import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";
import NewsStore from "./store/NewsStore";
import ForumStore from "./store/ForumStore";
import BugsStore from "./store/BugsStore";
import SupportStore from "./store/SupportStore";

export const Context = createContext(null)


ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{
        user: new UserStore(),
        news: new NewsStore(),
        forum: new ForumStore(),
        support: new SupportStore(),
        bugs: new BugsStore()
    }}>
        <App />
    </Context.Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

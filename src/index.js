import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
const root = ReactDOM.createRoot(document.getElementById('root'));
Kommunicate.init("1e088cf4a63e6c6a6254d31c205293d6d", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

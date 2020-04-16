import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
html, body, #too {
  min-height: 100%;
}
body {
  background: #27408B;
  -webkit-font-smoothing: antialiased !important;
}
body, input, button {
  color: #222;
  font-size: 14px;
  font: 14px 'Roboto', sans-serif;
}
button {
  cursor: pointer;
}
`;

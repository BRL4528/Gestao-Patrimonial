import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const rotate = keyframes`
from {
transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #7159c1;
    font-size: 10px;
    text-decoration: none;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  img {
    width: 200px;
    border-radius: 15%;
    margin-top: 20px;
    background: #eee;
    border: solid 1px #eee;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  ${(props) =>
    props.loading === 'commit' &&
    css`
      div {
        transition: 0.5s;
        width: 600px;
        height: 400px;
        background: #eee;
        padding: 5px;
        display: flex;
        position: fixed;
        border: solid 1px #999;
        border-radius: 4px;
        flex-direction: column;
      }

      strong {
        margin-left: 25px;
        margin-bottom: 100px;
      }
      p {
        text-align: left;
        margin-left: 40px;
        margin-top: -50px;
        margin-bottom: 10px;
      }
      textarea {
        border: 1px solid #eee;
        border-radius: 4px;
        font-size: 16px;
        width: 515px;
        height: 143px;
        margin-left: 40px;
      }
      button {
        background: #7159c1;
        color: white;
        border: 0;
        padding: 15px;
        margin-left: 40px;
        margin-top: 20px;
        border-radius: 4px;
        align-items: center;
        max-width: 100px;
      }
    `}
  ${(props) =>
    props.loading === 'low' &&
    css`
      div {
        transition: 0.5s;
        width: 600px;
        height: 400px;
        background: #eee;
        padding: 5px;
        display: flex;
        position: fixed;
        border: solid 1px #999;
        border-radius: 4px;
        flex-direction: column;
      }

      strong {
        margin-left: 25px;
        margin-bottom: 100px;
      }
      p {
        text-align: left;
        margin-left: 40px;
        margin-top: -50px;
        margin-bottom: 10px;
      }
      textarea {
        border: 1px solid #eee;
        border-radius: 4px;
        font-size: 16px;
        width: 515px;
        height: 143px;
        margin-left: 40px;
      }
      button {
        background: #7159c1;
        color: white;
        border: 0;
        padding: 15px;
        margin-left: 40px;
        margin-top: 20px;
        border-radius: 4px;
        align-items: center;
        max-width: 100px;
      }
    `}
    ${(props) =>
      props.loading === 'transfer' &&
      css`
        div {
          transition: 0.5s;
          width: 600px;
          height: 400px;
          background: #eee;
          padding: 5px;
          display: flex;
          position: fixed;
          border: solid 1px #999;
          border-radius: 4px;
          flex-direction: column;
        }

        strong {
          margin-left: 25px;
          margin-bottom: 100px;
        }
        p {
          text-align: left;
          margin-left: 40px;
          margin-top: -20px;
          margin-bottom: 10px;
        }
        textarea {
          border: 1px solid #eee;
          border-radius: 4px;
          font-size: 16px;
          width: 515px;
          height: 30px;
          margin-left: 40px;
        }
        button {
          background: #7159c1;
          color: white;
          border: 0;
          padding: 15px;
          margin-left: 40px;
          margin-top: 20px;
          border-radius: 4px;
          align-items: center;
          max-width: 100px;
        }
      `}
`;

export const SubmitButtonCommit = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  color: white;
  border: 0;
  padding: 15px;
  margin-left: 10px;
  border-radius: 4px;
  align-items: center;
  &[disabled] {
    display: none;
  }
`;
export const SubmitButtonLow = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  color: white;
  border: 0;
  padding: 15px;
  margin-left: 10px;
  border-radius: 4px;
  align-items: center;
  &[disabled] {
    display: none;
  }
`;

export const SubmitButtonTransfer = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  color: white;
  border: 0;
  padding: 15px;
  margin-left: 10px;
  border-radius: 4px;
  align-items: center;
  &[disabled] {
    display: none;
  }
`;

export const SubmitButtonNf = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  color: white;
  border: 0;
  padding: 15px;
  margin-left: 10px;
  border-radius: 4px;

  align-items: center;
  &[disabled] {
    display: none;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
`;
export const Tab = styled.li`
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & + li {
    border-top: 1px solid #eee;
  }
  a {
    color: #7159c1;
    text-decoration: none;
  }
  span {
    box-shadow: 100px;
    max-width: 500px;
    max-height: 20px;
    display: flex;
    padding: 3px 0 !important;

    margin-bottom: 7px;
  }
`;
export const Operadores = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 40px;
`;

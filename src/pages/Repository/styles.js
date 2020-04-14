import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
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
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #473c8b;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: left;
  align-items: center;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
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
    box-shadow: 35px;
    max-width: 230px;
    max-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
    padding: 3px 0 !important;
    position: relative;
  }
  p {
    transition: 3s;
    display: inline;

    color: ${(props) => (props.tagConf ? 'green' : '	#8B0000')};
    margin-left: 20%;
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    margin-top: -10px;
    background: ${(props) => (props.tagConf ? '	#98FB98' : '#FFC0CB')};
    padding: 4px;
    border-radius: 4px;

    label {
      transition: 3s;
      display: inline;
      text-align: center;
      color: ${(props) => (props.tagConf ? 'green' : '	#8B0000')};
      margin-left: 10px;
      font-size: 12px;
      font-weight: 700;
      position: absolute;
      margin-top: -3px;
      width: 150px;
      background: ${(props) => (props.tagConf ? '	#98FB98' : '#FFFF00')};
      padding: 4px;
      border-radius: 4px;

      @media (max-width: 700px) {
        label {
          display: none;
        }
      }
    }
  }
`;

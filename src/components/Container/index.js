import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h3 {
    transition: 3s;
    display: inline;
    text-align: center;
    color: ${(props) => (props.size === 0 ? 'green' : '	#8B0000')};
    margin: -70px -30px;
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    width: 150px;
    background: ${(props) => (props.size === 0 ? '	#98FB98' : '#FFFF00')};
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
  h2 {
    transition: 3s;
    display: inline;
    text-align: center;
    color: ${(props) => (props.msg === 0 ? 'green' : '	#8B0000')};
    margin: -70px 122px;
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    width: 150px;
    background: ${(props) => (props.msg === 0 ? '	#98FB98' : '#FFFF00')};
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
`;
export default Container;

import styled from "styled-components";

const Button = styled.button`
  padding-inline: 20px;
  width: 150px;
  text-align: center;

  font-size: 18px;
  background: linear-gradient(to right, #11998e, #38ef7d);
  color: white;
  height: 55px;
  @media screen and (max-width: 768px) {
    padding-inline: 10px;
    height: 40px;
    width: 90px;
  }
`;
export default Button;

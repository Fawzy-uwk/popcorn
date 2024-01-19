import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Spinner() {
  return (
    <SpinnerContainer>
      <ClipLoader color="#38ef7d" size={40} />
    </SpinnerContainer>
  );
}

export default Spinner;

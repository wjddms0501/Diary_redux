import styled from "styled-components";
import DetailPage from "../Components/Detail/DetailPage";


const Detail = () => {
  return (
    <>
      <DiaryBox>
        <DetailPage />
      </DiaryBox>
    </>
  );
};

const DiaryBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
`;

export default Detail;

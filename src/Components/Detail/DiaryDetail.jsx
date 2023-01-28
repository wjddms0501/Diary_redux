import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import styled from "styled-components"
import Grid from "../../element/Grid"
import MemoBox from "./MemoBox"
import { __delDiary, __editStartDiary, } from "../../redux/modules/diarySlice"


// 받아온 props를 이용해서 diary내용을 render해준다
const DiaryDetail = (props) =>{
  const d = props.date
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // 메모기능은 안했지만 ... 
  // 메모버튼에 state값을 연결시켰다. 버튼을 누르면  T/F가 바뀌게 하고
  // 동시에 true인 경우 오른쪽에 메모컴포넌트가 생김

  const [isMemo, setIsMemo] = useState(false);
  const memoToggle = () => {
    setIsMemo(!isMemo);
  };

  // 삭제기능, 어떤 id의 diary를 삭제하려고 하는가 
  // 데이터는 store에 있기 때문에 삭제도 reducer에서 함 => dispatch를 보내야 한다
  // 삭제가 끝나면 navigate로 페이지 이동 
  const delete_diary = (id)=>{
    if (window.confirm('일기를 삭제하시겠습니까?')){
      console.log(id)
      dispatch(__delDiary(id))
      navigate("/")

    }
  };

  // 수정버튼 클릭 : 수정할 수 있는 컴포넌트로 이동 
  // input창이 뜨고, 버튼(수정완료)이 뜨게 하는 함수
  const edit_start = (e) => {
    // console.log(e)
    const e_start = {
        "id": e.id,
        "title": e.title,
        "date": e.date,
        "contents": e.contents,
        "emotion": e.emotion,
        "is_edit": !(e.is_edit),
        "memo": []
    } 
    // input으로 수정한 값을 dispatch 보냄
    dispatch(__editStartDiary(e_start));
  };

  // 데이터가 오지 않아도 뷰를 보여줘야 하기 때문에
  // 옵셔널 체이닝 ?. 을 사용해서 
  // 데이터가 없어도 뷰를 렌더링 할 수 있게 함
  return (
    <>
      <Contain>
        <TextBox>
          <Grid is_flex height="100px" BG_color="white">
            <div style={{ fontSize: "100px", backgroundColor: "white" }}>
              {d?.emotion}
            </div>
            <Date>{d?.date}</Date>
          </Grid>
          <Title>{d?.title}</Title>
          <Content>{d?.contents}</Content>
        </TextBox>
        <BtnBox>
          <Btn onClick={() => {delete_diary(d?.id);}}>
          {/* <주의사항> onClick에 매개변수를 넣는 함수 사용하려면 
          함수이름만 쓰면 안되고, 화살표함수로 사용해야 한다.! 
          WHY? 페이지 이동시 함수가 바로 실행됨. 아래 toggle함수와는 작동방식이 다름!  */}
            삭제
          </Btn>
          <Btn onClick={() => { edit_start(d);}}>
            수정
          </Btn>
          <Link to="/"
            style={{ margin: 0, borderRadius: "5px", backgroundColor: "none" }}>
            <Btn>홈으로</Btn>
          </Link>
          {/* 메모의 T/F에 따라 아래 메모컴포넌트가 보이게 설정 */}
          <Btn onClick={memoToggle}>{isMemo ? "메모숨기기" : "메모보기"}</Btn>
        </BtnBox>
      </Contain>
      {isMemo ? <MemoBox /> : null}
    </>
  );
};

const Contain = styled.div`
  width: 45%;
  height: 700px;
  background-color: #234e70;
  border-radius: 20px;
  padding: 35px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const TextBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #234e70;
  border: none;
`;
const Btn = styled.button`
  width: 100px;
  height: 45px;
  border-radius: 5px;
  border: none;
  margin: 0;
  font-size: 16px;
  background-color: #fbf8be;
  color: #234e70;
  font-weight: bold;
  cursor: pointer;
`;
const Date = styled.div`
  /* border: 1px solid black; */
  width: 150px;
  height: 45px;
  border-radius: 5px;
  border: none;
  margin: 0;
  background-color: #234e70;
  color: #fbf8be;
  text-align: center;
  line-height: 45px;
`;
const Title = styled.div`
  /* border: 1px solid red; */
  background-color: #234e70;
  color: #fbf8be;
  border-radius: 5px;
  box-shadow: 1px 1px 3px lightgray;
  margin: 50px 0 20px;
  padding: 10px 15px;
  box-sizing: border-box;
  font-size: 20px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;
const Content = styled.div`
  /* border: 1px solid red; */
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #234e70;
  color: #fbf8be;
  border-radius: 5px;
  box-shadow: 1px 1px 3px lightgray;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 20px;
  overflow: scroll;
`;

export default DiaryDetail;

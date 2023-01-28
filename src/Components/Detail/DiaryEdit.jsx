import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __editStartDiary,
  __editEndtDiary,
} from "../../redux/modules/diarySlice";
import styled from "styled-components";

const DetailEdit = (props) => {
  const d = props.date;
  // console.log(d)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 수정했을 때 input값을 관리할 state들
  const [editTitle, setEditTitle] = useState();
  const [editDate, setEditDate] = useState();
  const [editContents, setEditContents] = useState();
  const [editEmotion, setEditEmotion] = useState();
  const [isMemo, setIsMemo] = useState(false);

  
  // 수정 완료
  // 수정할 데이터를 가지고 dispatch를 함 
  // 데이터를 수정하지 않을 경우에는 이전 값을 넘어가게 설정해줘야함. 
  const edit_end = (e) => {
    console.log(e);
    const newEditDiary = {
      id: d.id,
      title: editTitle === undefined ? e.title : editTitle,
      date: editDate === undefined ? e.date : editDate,
      contents: editContents === undefined ? e.contents : editContents,
      emotion: editEmotion === undefined ? e.emotion : editEmotion,
      is_edit: false,
    };
    console.log(newEditDiary);

    dispatch(__editEndtDiary(newEditDiary))
    if (window.confirm('수정이 완료되었습니다. 메인으로 이동하시겠습니까?')){
      navigate("/")
    }
    // 여기부분에서 메인 이동 안했을 때
    // 상세페이지에서 업데이트 된 부분 보여줌 좋겠는데! 함 생각해보기
  }


  // 수정취소 => 원래 수정페이지로 이동
  // 수정 취소도 id_edit의 데이터가 바뀌어야 한다 => dispatch를 보내야 한다
  const edit_start = (e) => {
    const e_start = {
      id: e.id,
      title: e.title,
      date: e.date,
      contents: e.contents,
      emotion: e.emotion,
      is_edit: !e.is_edit,
    };
    dispatch(__editStartDiary(e_start));
  };

  return (
    <EditAll>
      <EditCard>
        <EditDiv>
          <>
            <InputBox className="inputBox">
              <InputDiv>
                <InputP>제목</InputP>
                <InputTxt
                  type="text"
                  defaultValue={d.title}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <InputP>날짜</InputP>
                <InputTxt
                  type="date"
                  defaultValue={d.date}
                  onChange={(e) => {
                    setEditDate(e.target.value);
                  }}
                />
              </InputDiv>
              <InputDiv>
                <InputP>내용</InputP>
                <InputTextArea
                  type="text"
                  defaultValue={d.contents}
                  onChange={(e) => {
                    setEditContents(e.target.value);
                  }}
                />
              </InputDiv>
              <InputDiv>
                <InputP>감정</InputP>
                <InputSelect
                  defaultValue={d.emotion}
                  onChange={(e) => setEditEmotion(e.target.value)}
                >
                  <option value={"🙂"}>🙂</option>
                  <option value={"😟"}>😟</option>
                  <option value={"🥰"}>🥰</option>
                  <option value={"😢"}>😢</option>
                  <option value={"😤"}>😤</option>
                  <option value={"😡"}>😡</option>
                  <option value={"🤒"}>🤒</option>
                </InputSelect>
              </InputDiv>
              <InputBtn
                onClick={() => {
                  edit_end(d);
                }}
              >
                수정완료
              </InputBtn>
              <InputBtn
                onClick={() => {
                  edit_start(d);
                }}
              >
                수정취소
              </InputBtn>
              <Link to="/" style={{ backgroundColor: "white" }}>
                <InputBtn>홈으로</InputBtn>
              </Link>
            </InputBox>
          </>
        </EditDiv>
      </EditCard>
    </EditAll>
  );
};

const InputBox = styled.div`
  background-color: white;
`;

const InputTxt = styled.input`
  background-color: #fbf8be;
  height: 40px;
  color: #234e70;
`;
const InputTextArea = styled.textarea`
  background-color: #fbf8be;
  height: 60px;
  color: #234e70;
`;
const InputSelect = styled.select`
  background-color: white;
  height: 40px;
`;
const EditDiv = styled.div`
  background-color: white;
`;
const InputDiv = styled.div`
  background-color: white;
`;
const InputP = styled.p`
  background-color: white;
  font-weight: bold;
`;

const EditCard = styled.div`
  width: 400px;
  height: 90%;
  background-color: white;
  display: flex;
  border-radius: 10px;
`;
const EditAll = styled.div`
  width: 470px;
  height: 650px;
  background-color: #234e70;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
const InputBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #234e70;
  color: #fbf8be;
`;

export default DetailEdit;

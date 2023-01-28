import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 캘린더 라이브러리
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// style 관련
import "./Home.css";
import styled from "styled-components";

// 리덕스, axios 모듈
// import { MainDiary } from "../redux/modules/__diary";
import { useDispatch, useSelector } from "react-redux";
import { __addDiary, __getDiary } from "../redux/modules/diarySlice";

// 컴포넌트
import Check from "../Components/Main/CheckList/Check";


function Home() {
  // 사용자 input - state 관리
  const [title, setTitle] = useState("");
  const [emotion, setEmotion] = useState("");
  const [contents, setContents] = useState("");
  const [value, onChange] = useState(new Date());

  // 페이지이동 라우터 
  let navigate = useNavigate();

  // redux - action설정 dispatch 연결
  const dispatch = useDispatch();
  // redux - store데이터 가져오기 
  const diaryList = useSelector((state) => state.diaryReducer.diary);
  // console.log(date, title, emotion, contents);
  // console.log(diaryList);

  // 달력라이브러리, 해당 날짜 클릭하면 인풋에 내용 들어감
  const diarydate = new Date(
    value.getTime() - value.getTimezoneOffset() * 60000
  ).toISOString();

  // console.log("필요한 날짜 : ", diarydate);
  // console.log(date);
  // console.log(value);
  
  // 화면 렌더 될 때마다 데이터 가져오기
  // 데이터를 가지고 화면을 표시하는 곳이면 어디든 (상세페이지 같은)
  // dispatch는 리덕스에서 처리할 부분 => __getDiary를 처리해줘!
  useEffect(() => {
    dispatch(__getDiary());
  }, []);

  // 인풋 입력하고 추가버튼을 눌렀을 때 일어나는 일

  const onAddHandler = (e) => {
    // event.preventDefault();
    if (title === "" && contents === "") {
      alert("다이어리를 작성해주세요");
      return;
    }
    // 새로운 데이터가 추가되면 list를 만들고 
    const newDiary = {
      id: Math.floor(Math.random() * 100),
      emotion: emotion,
      date: String(diarydate).split("T")[0],
      title: title,
      contents: contents,
      is_edit: false, 
    }
    // dispatch(변화)를 발생시켜서 액션을 리듀서에 보낸다.
    // redux에서 __addDiary(액션)가 어떤 일을 하는지 명시해줘야함
    dispatch(__addDiary(newDiary))
    
    // input내용들 초기화 ("")빈값을 넣어줘

    setTitle("");
    setEmotion("");
    setContents("");
  };
  // 라이브러리 흔적
  // console.log(value.toISOString().slice(0, 10));
  // console.log(
  //   new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString()
  // );  
  // console.log(
  //   value.toLocaleDateString("ko-KR").replace(/\./g, "").replace(/\s/g, "-")
  // );

  return (
    <div>
      <Section1>
        <Box>
          <div>
            <TodoAdd>
              <Check />
            </TodoAdd>
          </div>
          <Calendar onChange={onChange} value={value} />
          {/* 코멘트, input(+삭제&수정&이전으로) */}
          <InputBtn>
            <AddBoxEmotion>
              <TitleEmotion>기분</TitleEmotion>
              <AddBoxEmotionSelect
                value={emotion}
                onChange={(e) => {
                  setEmotion(e.target.value);
                }}
              >
                <option value={"선택"}>선택</option>
                <option value={"🙂"}>🙂</option>
                <option value={"😟"}>😟</option>
                <option value={"🥰"}>🥰</option>
                <option value={"😢"}>😢</option>
                <option value={"😤"}>😤</option>
                <option value={"😡"}>😡</option>
                <option value={"🤒"}>🤒</option>
                <option value={"🫥"}>🫥</option>
                <option value={"😝"}>😝</option>
                <option value={"🥳"}>🥳</option>
              </AddBoxEmotionSelect>
            </AddBoxEmotion>
            <AddBox>
              <Title>날짜</Title>
              <AddBoxInput
                value={new Date(value.getTime() - value.getTimezoneOffset() * 60000)
                  .toISOString()
                  .slice(0, 10)}
                  onChange={(e) => {
                  onChange(e.target.value);
                  // console.log(new date(e.target.value));
                }}
                style={{ cursor: "pointer" }}
              />
            </AddBox>
            <AddBox>
              <Title>제목</Title>
              <AddBoxInput
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </AddBox>
            <AddBox>
              <Title>내용</Title>
              <AddboxTextArea
                value={contents}
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
            </AddBox>
            <Addbutton onClick={onAddHandler}>추가</Addbutton>
          </InputBtn>
        </Box>
      </Section1>
      {/* ---------------------------------------------- */}

      <Section2>
        {diaryList.map((dList) => {
          // console.log(dList.emotion, dList.date);
          return (
            <div key={dList.id} className="diarybox">
              <Diarycard
                    onClick={function(){
                    navigate(`detail/${dList.id}`)}}
                    style={{ textDecoration: "none",  }}
                >
                <MainDiaryBtn>상세보기</MainDiaryBtn>  
                <Diarytxtbox>
                  <Diarytxt>내 감정 : {dList.emotion}</Diarytxt>
                  <Diarytxt>날짜 : {dList.date}</Diarytxt>
                  <Diarytxt>제목 : {dList.title}</Diarytxt>
                  <Diarytxt>
                    <Diarytxt2>내용 : </Diarytxt2>
                    {dList.contents}
                  </Diarytxt>
                </Diarytxtbox>
              </Diarycard>
            </div>
          );
        })}
      </Section2>
    </div>
  );
}

const Section1 = styled.section`
  min-height: 500px;
`;
const Box = styled.div`
  display: flex;
  height: 450px;
`;

const TodoAdd = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputBtn = styled.div`
  width: 430px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fbf8be;
  margin-top: 35px;
  margin-right: 0px;
`;

const AddBoxEmotion = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  margin-bottom: -20px;
`;

const AddBoxEmotionSelect = styled.select`
  width: 70px;
  height: 45px;
  background-color: white;
  border: 3px solid #234e70;
  margin-right: 240px;
  cursor: pointer;
  display: flex;
`;

const TitleEmotion = styled.div`
  width: 70px;
  height: 50px;
  background-color: #234e70;
  color: white;
  margin-right: 10px;
  border: 2px solid #234e70;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 70px;
  height: 50px;
  background-color: #234e70;
  color: white;
  margin-left: -25;
  margin-right: 10px;
  border: 2px solid #234e70;
`;

const AddBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  margin-bottom: -20px;
`;

const AddBoxInput = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  background-color: white;
  border: 3px solid #234e70;
`;

const AddboxTextArea = styled.textarea`
  width: 300px;
  height: 40px;
  background-color: white;
  border: 3px solid #234e70;
`;

const Addbutton = styled.button`
  &:hover {
    font-size: 21px;
    box-shadow: 1px 3px 5px 1px #685b2977;
    width: 91px;
    height: 51px;
  }
  width: 90px;
  height: 50px;
  margin-top: 20px;
  background-color: #234e70;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
`;

// ------------------------

const Section2 = styled.section`
  margin: unset;
  display: flex;
  flex-wrap: wrap;
  gap: auto;
`;

const Diarycard = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  width: 280px;
  height: 300px;
  margin: auto;
  background-color: white;
  border: 25px solid #234e70;
  overflow: scroll;
  border-radius: 10px;
`;

const MainDiaryBtn = styled.button`
  &:hover {
    font-size: 21px;
    box-shadow: 1px 3px 5px 1px #685b2977;
    width: 101px;
    height: 41px;
  }
  width: 100px;
  height: 40px;
  background-color: #234e70;
  color: #fbf8be;
  border: 0px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Diarytxtbox = styled.div`
  background-color: white;
`;
const Diarytxt = styled.div`
  background-color: white;
  margin-left: 15px;
  font-size: 15px;
`;
const Diarytxt2 = styled.div`
  background-color: white;
  margin-left: 0px;
  font-size: 15px;
`;

export default Home;

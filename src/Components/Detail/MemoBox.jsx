import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import styled from "styled-components";

import Grid from "../../element/Grid"
import { __addMemo, __delMemo } from "../../redux/modules/memoSlice";


const MemoBox = ()=>{
  
  // thunk + axios 가 연결되면 사용할 코드
  const dispatch = useDispatch()
  const memoList = useSelector((state)=> state.diaryReducer.diary)
  const params = useParams().id
  const idx = memoList.findIndex((m)=> m.id == params )
  const memo = memoList[idx]
  // console.log(memoList)
  // console.log(params)
  // console.log(idx)
  // console.log(memo)

  const [memoInput, setMemoInput] = useState("")
  // const [memoListBox, setMemoListBox] = useState("")


  const memoAdd = ()=>{
    // 새로운 메모 
    const addMemo = {
      memo : memoInput,
      memo_id : Math.floor(new Date().getTime() + Math.random())
    }
    // 메모 위치에 새로운 메모 추가
    let addMemoBox = [...memo.memo]
    addMemoBox.push(addMemo)
    console.log(addMemoBox)

    // 상세페이지 내용 데이터 + 새 메모 추가
    const newMemo = {
      id: memo.id,
      title: memo.title,
      date: memo.date,
      contents: memo.contents,
      emotion: memo.emotion,
      is_edit: memo.is_edit,
      memo : [...addMemoBox]
    }
    // 매모를 추가한 데이터를 디스패치 
    console.log(newMemo)
    // setMemoListBox(newMemo)
    // dispatch(__addMemo(newMemo))
  }


  const memoDel = (id) =>{
    console.log(id)
    dispatch(__delMemo(id))
  }


  return (
    <Grid width="500px" margin="0 auto">
      <MemoInputBox>
        <input
          type="text"
          value={memoInput || ""}
          placeholder="메모를 작성해주세요"
          onChange={(e) => {
            setMemoInput(e.target.value);
          }}
        />
        <button onClick={memoAdd} style={{cursor: 'pointer'}}>메모저장</button>
      </MemoInputBox>
      {/* 서버에서 데이터를 가져오지 못해서 렌더가 안됨 ㅠㅡㅠ 힝. */}
      {/* <div style={{backgroundColor:'white'}}>
        {memo.memo.map((i)=>{
          // console.log(i)
          return (
          <Box key={i.memo_id} >
            <Icon onClick={()=>{memoDel(i.memo_id)}} style={{cursor:'pointer'}}>
              ✅
            </Icon>
            <p style={{paddingLeft :'10px'}}>{i.memo}</p>
          </Box>
          )
        })}
      </div> */}
    </Grid>
  );
};

const MemoInputBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 20px 10px;
  box-sizing: border-box;
  border-bottom: 5px solid #234e70;
`;
const Box = styled.div`
  width: 500px;
  margin: 15px auto;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid #fbf8be;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;

`
const  Icon = styled.div`
  
`


export default MemoBox;

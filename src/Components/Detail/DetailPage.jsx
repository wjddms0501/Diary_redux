

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { __getDiary } from "../../redux/modules/diarySlice"

import DiaryDetail from "./DiaryDetail"
import DetailEdit from "./DiaryEdit"
import MemoBox from "./MemoBox"


const DetailPage = () => {
  // 상세페이지 이동할 때 라우터 사용 , detail/( id )값 가져옴
  const params = useParams()

  // 리덕스 store값 가지고 옴 => 메인에서 가져올 때는 데이터가 끊기지 않지만
  // 상세페이지에서 새로고침을 하는 경우, store에 있는 데이터가 사라지기 때문에
  // useEffect로 데이터를 가지고 와야 함 (아래 useEffect 코드 있음)
  const dispatch = useDispatch()
  const diary = useSelector((state)=> state.diaryReducer.diary)

  // diary데이터 중에 상세페이지로 들어온 id와 같은 diary를 찾는다
  // return부분에서 보여준다.
  const index = diary?.findIndex((d)=> d.id == params.id )
  const d = diary[index]
  console.log(diary)
  console.log(d)
  
  // 렌더링 될 때마다[] => dispatch(__get)요청을 한다. : 데이터 가져오기
  useEffect(()=>{
    dispatch(__getDiary())
  },[])

  // 수정버튼을 누르면 수정할 수 있는 input이 떠야 하기 때문에 
  // 수정페이지와 상세페이지의 내용을 컴포넌트로 분리함
  // 상세 페이지에서 is_edit의 유무에 따라서 컴포넌트를 보여줌
  // 해당 컴포넌트는 각각의 diary 내용을 담고 있어야 하므로 
  // props으로 d의 정보를 넘겨준다
  return (
    <>
      {(!d?.is_edit) ?
        <DiaryDetail date={d}/> 
      :  
        <DetailEdit date={d} />
      }
    </>
  )
}



export default DetailPage;

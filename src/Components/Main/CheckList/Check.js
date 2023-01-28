import React, { useState } from "react";
import InputBox from "./InputBox";
import ToDoItemList from "./ToDoItemList";
import styled from "styled-components";

const Check = () => {
  const [todoList, setTodoList] = useState([]);

  return (
    <CheckListBox>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <InputBox todoList={todoList} setTodoList={setTodoList} />
      <TodoCheckDiv>
        {/* 할 일 Item 리스트 */}
        <ToDoItemList
          title={" ✔ 할 일"}
          todoList={todoList}
          setTodoList={setTodoList}
          checkedList={false} // (체크되지 않은) 할 일 목록
        />
        <br />
        {/* 완료한 Item 리스트 */}
        <ToDoItemList
          title={"  ✔  완료한 항목"}
          todoList={todoList}
          setTodoList={setTodoList}
          checkedList={true} // (체크되어 있는)완료한 목록
        />
      </TodoCheckDiv>
    </CheckListBox>
  );
};

const CheckListBox = styled.div`
  margin-right: -30px;
`;

const TodoCheckDiv = styled.div`
  width: 255px;
  height: 300px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background-color: #234e70;
  border-radius: 10px;
  margin-left: -5px;
`;

export default Check;

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputBox = ({ todoList, setTodoList }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // input 값 가져오기
  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const onClickAddButton = () => {
    // todoItemList에 값 추가
    const nextTodoList = todoList.concat({
      id: todoList.length,
      text,
      checked: false,
      deleted: false,
      // (1)
    });
    setTodoList(nextTodoList);

    // input 값 초기화 및 포커싱
    setText("");
    inputRef.current.focus();
  };

  return (
    <TodoAppInputboxDiv>
      {/* 아이템 내용 입력 input */}
      <TodoItemInput
        type="text"
        value={text}
        ref={inputRef}
        placeholder=" 할 일을 입력해주세요"
        onChange={onChangeInput}
      />
      {/* 입력 후 아이템 추가 버튼 */}
      <TodoAppInputBoxAddBtn type="submit" onClick={onClickAddButton}>
        +
      </TodoAppInputBoxAddBtn>
    </TodoAppInputboxDiv>
  );
};

// props 값 검증
InputBox.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ),
  setTodoList: PropTypes.func.isRequired,
};

const TodoAppInputboxDiv = styled.div`
  margin-left: -5px;
`;

const TodoAppInputBoxAddBtn = styled.button`
  &:hover {
    width: 46px;
    height: 46px;
    font-size: 21px;
    box-shadow: 1px 2px 3px 1px #4953c277;
  }
  width: 45px;
  height: 45px;
  background-color: #234e70;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const TodoItemInput = styled.input`
  width: 200px;
  height: 45px;
  background-color: #234e70;
  color: white;
  border-radius: 10px;
  border: none;
  margin-right: 10px;
`;
export default InputBox;

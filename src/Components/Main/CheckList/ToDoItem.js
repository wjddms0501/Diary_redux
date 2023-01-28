import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      // id 값이 같은 항목의 checked 값을 Toggle 함
      checked: item.id === todoItem.id ? !item.checked : item.checked,
    }));

    setTodoList(nextTodoList);
  };

  const onClickDeleteButton = () => {
    if (window.confirm("정말로 지우실건가요?")) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        deleted: item.id === todoItem.id ? true : item.deleted,
      }));

      setTodoList(nextTodoList);
    }
  };

  return (
    <TodoAppItemLi>
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <TodoAppItemCheckBoxInput
        type="checkbox"
        checked={todoItem.checked} // (1)
        onChange={onChangeCheckbox} // (2)
      />
      {/* 아이템 내용 */}
      <TodoAppItemCtxSpan>{todoItem.text}</TodoAppItemCtxSpan>
      {/* 수정 버튼 */}
      {/* <button type="button" className="todoapp__item-edit-btn">
        ✏
      </button> */}
      {/* 삭제 버튼 */}
      <TodoAppItemDeleteBtn type="button" onClick={onClickDeleteButton}>
        🗑
      </TodoAppItemDeleteBtn>
    </TodoAppItemLi>
  );
};

ToDoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
  }),
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
};

const TodoAppItemLi = styled.li`
  background-color: #234e70;
`;

const TodoAppItemCtxSpan = styled.span`
  background-color: #234e70;
`;

const TodoAppItemCheckBoxInput = styled.input`
  width: 15px;
  height: 25px;
  margin: 0px 3px;
`;

const TodoAppItemDeleteBtn = styled.button`
  border: 0px;
  margin-left: 10px;
`;
export default ToDoItem;

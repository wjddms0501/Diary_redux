import React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./ToDoItem";
import styled from "styled-components";

const ToDoItemList = ({ title, todoList, setTodoList, checkedList }) => (
  <TodoAppListDiv>
    {/* props로 부터 title 값을 전달 받음 */}
    <TodoAppListTitP>{title}</TodoAppListTitP>

    <TodoAppListUl>
      {todoList && // todoList가 있을때만 출력
        todoList.map((todoItem) => {
          if (todoItem.deleted) return null;
          if (checkedList !== todoItem.checked) return null;
          // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력

          return (
            // map을 이용하여 ToDoItem을 출력
            <ToDoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          );
        })}
    </TodoAppListUl>
  </TodoAppListDiv>
);

ToDoItemList.propTypes = {
  title: PropTypes.string.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
  checkedList: PropTypes.bool.isRequired,
};

const TodoAppListDiv = styled.div`
  background-color: #234e70;
  color: white;
  margin: 0px 10px;
`;

const TodoAppListTitP = styled.p`
  background-color: #234e70;
  display: flex;
  color: #fbf8be;
`;

const TodoAppListUl = styled.ul`
  background-color: #234e70;
  padding: 0px;
  text-decoration: 1px underline #fbf8be;
`;

export default ToDoItemList;

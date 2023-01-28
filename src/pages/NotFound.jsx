import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigator = useNavigate();
  // console.log(list)

  return (
    <>
      {/* <EmptyBox> */}
      <h1 style={{ marginBottom: "25px", fontSize: "30px" }}>
        잘못된 페이지입니다
      </h1>
      <button onClick={() => navigator("/")}> home으로 이동</button>
      {/* </EmptyBox> */}
    </>
  );
};

// const EmptyBox = styled.div`
//   width : 100%;
//   height: 100vh;
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `

export default NotFound;

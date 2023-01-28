import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <HeaderBox className="nav_contain">
        <Link
          to="/"
          style={{
            backgroundColor: "#234e70",
            color: "#fbf8be",
            textDecoration: "none",
            marginLeft: "0px",
          }}
        >
          <NavTitle className="nav_title">DIARY</NavTitle>
        </Link>
      </HeaderBox>
    </>
  );
};
// #234E70
// #FBF8BE

const HeaderBox = styled.div`
  width: 100%;
  height: 70px;
  color: #fbf8be;
  font-weight: 600;
  font-size: 35px;
  background-color: #234e70;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const NavTitle = styled.div`
  background-color: #234e70;
  font-size: 35px;
`;

export default Header;

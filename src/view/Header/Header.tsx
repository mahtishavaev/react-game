import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Container } from "../common/Container";

const HeaderInner = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
`;

const LinksContainer = styled.nav``;

const Link = styled(NavLink)`
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  &.active {
    border-bottom: 3px solid #000;
  }
  & + & {
    margin-left: 20px;
  }
`;

export const Header = () => {
  return (
    <HeaderInner>
      <Container>
        <LinksContainer>
          <Link exact to="/">
            Game
          </Link>
          <Link exact to="/statistic">
            Statistic
          </Link>
        </LinksContainer>
      </Container>
    </HeaderInner>
  );
};

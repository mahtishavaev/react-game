import styled from "styled-components";
import { Container } from "../common/Container";
import { GithubIcon, RSIcon } from "../icons/icons";

const FooterInner = styled.footer`
  height: 50px;
  margin-top: auto;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Icon = styled.svg`
  height: 30px;
`;

const Text = styled.span`
  font-size: 24px;
  font-weight: 500;
  margin-left: 10px;
  margin-right: 10px;
`;

export const Footer = () => {
  return (
    <FooterInner>
      <Container>
        <a target="blank" href="https://rs.school/js/">
          <Icon as={RSIcon} />
        </a>
        <Text>2021</Text>
        <a target="blank" href="https://github.com/mahtishavaev">
          <Icon as={GithubIcon} />
        </a>
      </Container>
    </FooterInner>
  );
};

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1199.98px) {
    max-width: 992px;
  }

  @media (max-width: 991.98px) {
    max-width: 768px;
  }

  @media (max-width: 767.98px) {
    max-width: 576px;
  }

  @media (max-width: 575.98px) {
  }
`;

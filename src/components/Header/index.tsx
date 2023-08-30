import React from "react";
import { styled } from "styled-components";

export const Header = () => {
  return <HeaderWrapper>이모티콘 생성기</HeaderWrapper>;
};

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
`;

import React from "react";
import { ImageGenerator } from "../../components/ImageGenerator";
import { Header } from "../../components/Header";
import { styled } from "styled-components";

export const Main = () => {
  return (
    <MainContainer>
      <Header />
      <ImageGenerator />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

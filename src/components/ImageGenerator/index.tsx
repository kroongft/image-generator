import html2canvas from "html2canvas";
import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { styled } from "styled-components";

export const ImageGenerator = () => {
  const [color, setColor] = useState<string>("#111");
  const [text, setText] = useState<string>("텍스트");

  const handleChangeColor = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    html2canvas(document.getElementById("result") as HTMLElement, {
      backgroundColor: null,
    }).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), "test.png");
    });
  };

  const onSaveAs = (uri: any, filename: string) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ImageGeneratorContainer>
      <GeneratorWrapper>
        <TextGenerator>
          <Result id="result" color={color}>
            {text}
          </Result>
          <InputWrppaer>
            <input value={text} onChange={handleChangeText} />
          </InputWrppaer>
        </TextGenerator>
        <SketchPicker color={color} onChangeComplete={handleChangeColor} />
      </GeneratorWrapper>
      <Button onClick={handleSave}>이미지 생성</Button>
    </ImageGeneratorContainer>
  );
};

const ImageGeneratorContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

const GeneratorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const TextGenerator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Result = styled.div`
  width: 150px;
  height: 150px;
  padding: 8px;
  text-align: justify;
  color: ${(props) => props.color};
  border: 1px solid #9b9b9b;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const InputWrppaer = styled.div`
  margin-top: 24px;
`;

const Button = styled.button`
  width: 400px;
  height: 32px;
  cursor: pointer;
`;

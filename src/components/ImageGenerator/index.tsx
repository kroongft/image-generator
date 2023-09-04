import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import html2canvas from "html2canvas";
import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { styled } from "styled-components";
import { FONT_LIST } from "../../constants/font";

export const ImageGenerator = () => {
  const [color, setColor] = useState<string>("#111");
  const [text, setText] = useState<string>("텍스트");
  const [font, setFont] = useState<string>(FONT_LIST[0].value);

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
          <ResultWrapper>
            <Result id="result" color={color}>
              <TextWrapper font={font}>{text}</TextWrapper>
            </Result>
          </ResultWrapper>
          <InputWrppaer>
            <input value={text} onChange={handleChangeText} />
          </InputWrppaer>
        </TextGenerator>
        <FontSelectorWrapper>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">폰트</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={font}
              name="radio-buttons-group"
            >
              {FONT_LIST.map((font) => (
                <FormControlLabel
                  value={font.value}
                  key={font.value}
                  control={<Radio onChange={(e) => setFont(e.target.value)} />}
                  label={font.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </FontSelectorWrapper>
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
  align-items: flex-end;
  flex-direction: row;
  gap: 56px;
`;

const TextGenerator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const ResultWrapper = styled.div`
  border: 1px solid #9b9b9b;
  border-radius: 8px;
`;

const Result = styled.div`
  width: 150px;
  height: 150px;
  padding: 8px;
  text-align: justify;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`;

const TextWrapper = styled.div<{ font: string }>`
  font-weight: 900;
  font-size: 40px;
  width: 10em;
  text-align: center;
  font-family: ${(props) => props.font};
`;

const FontSelectorWrapper = styled.div``;
const InputWrppaer = styled.div`
  margin-top: 24px;
`;

const Button = styled.button`
  width: 400px;
  height: 32px;
  cursor: pointer;
`;

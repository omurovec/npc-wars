import styled from "styled-components";
import uploadImg from "../assets/upload.png";
import { BlurContainer2 } from "./Container";

const InputWrapper = styled(BlurContainer2)`
  width: 100%;
  height: 3rem;
`;

const StyledTextInput = styled.input`
  height: 100%;
  width: 100%;
  background: none;
  border: none;
  padding-left: 0.8rem;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: #2cf8e966;
  }
`;

export function TextInput({ ...props }) {
  return (
    <InputWrapper>
      <StyledTextInput {...props} />;
    </InputWrapper>
  );
}

export const Selector = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 3rem;
  background: none;
  border: 1px solid #2cf8e9;
  padding: 0.25rem 0.8rem;
  color: white;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #2cf8e966;
  }

  &::-ms-expand {
    display: none;
  }

  option::disabled {
    color: #2cf8e966;
  }

  &::after {
    content: ">";
    background: red;
    display: block;
    width: 10rem;
    height: 10rem;
    top: 0;
    bottom: 0;
    color: white;
  }
`;

export const FileInputWrapper = styled(BlurContainer2)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #2cf8e9;
  justify-content: center;
  position: relative;
  height: 4rem;
  width: 100%;
  background: none;
  box-sizing: border-box;
  padding: 0.25rem 0.8rem;
  text-shadow: 0 0 2px #ff0000;

  &:focus {
    outline: none;
  }

  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 1rem;
    filter: blur(0.5px);
  }
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

export function FileInputButton({ ...props }) {
  return (
    <FileInputWrapper>
      <FileInput type="file" accept=".onnx" placeholder="Upload Image" {...props}/>
      <img src={uploadImg} alt="upload" /> Upload Model
    </FileInputWrapper>
  );
}

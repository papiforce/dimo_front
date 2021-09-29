import { useState } from "react";
import styled from "styled-components";

interface InputTextProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (event: any) => void;
  style?: React.CSSProperties;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

const Label = styled.p`
  ${({ theme: { colors } }) => `
    color: ${colors.grey};
  `}
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const ErrorText = styled.p`
  ${({ theme: { colors } }) => `
    color: ${colors.red};
  `}
  font-size: 12px;
  font-weight: 500;
`;

const Input = styled.input<{ isFocus: boolean; error?: string }>`
  ${({ theme: { colors }, isFocus, error }) => `
    border: ${
      isFocus && !error
        ? `2px solid ${colors.secondary}`
        : error
        ? `2px solid ${colors.red}`
        : `2px solid ${colors.grey}`
    };

    :hover {
      border: ${
        isFocus && !error
          ? `2px solid ${colors.secondary}`
          : error
          ? `2px solid ${colors.red}`
          : `2px solid ${colors.grey}`
      };
    }

    ::placeholder {
      color: ${colors.grey};
    }
  `}
  padding: 12px;
  font-family: "Poppins", sans-serif;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;

  :focus {
    box-shadow: none;
    outline: none;
  }
`;

const InputText: React.FC<InputTextProps> = ({
  name,
  type = "text",
  label,
  placeholder,
  value,
  error,
  onChange,
  style,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Container style={style}>
      {label && <Label>{label}</Label>}
      <Input
        name={name}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        type={type}
        onChange={(event) => {
          if (onChange) onChange(event.target);
        }}
        isFocus={isFocus}
        error={error}
      />
      {error && error !== "" && (
        <ErrorText style={{ marginTop: 0, marginLeft: 16 }}>{error}</ErrorText>
      )}
    </Container>
  );
};

export default InputText;

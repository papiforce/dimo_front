import styled from "styled-components";

interface ButtonProps {
  btnWidth?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Container = styled.button<ButtonProps>`
  ${({ theme: { colors }, btnWidth }) => `
    width: ${btnWidth};
    background: ${colors.secondary};
    color: ${colors.white};
    border: 2px solid ${colors.secondary};

    :hover {
      background: ${colors.white};
      color: ${colors.secondary};
    }
  `}
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  transition: transform 100ms cubic-bezier(0.64, 0.04, 0.35, 1);
  transform: scale(1);
  box-sizing: border-box;
  border-radius: 12px;
  padding: 12px 24px;
  cursor: pointer;

  :active {
    transform: scale(0.98);
  }

  :focus {
    outline: none;
  }
`;

const Button: React.FC<ButtonProps> = ({
  btnWidth = "100%",
  onClick,
  style,
  children,
}) => {
  return (
    <Container
      btnWidth={btnWidth}
      type="submit"
      onClick={onClick}
      style={style}
    >
      {children}
    </Container>
  );
};

export default Button;

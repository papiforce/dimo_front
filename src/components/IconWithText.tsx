import styled from "styled-components";

interface IconWithTextProps {
  text: string;
  style?: React.CSSProperties;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.span`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
    background: ${colors.tertiary};
  `}
  padding: 4px 8px;
  border-radius: 8px;
`;

const Text = styled.p``;

const IconWithText: React.FC<IconWithTextProps> = ({ text, style }) => {
  return (
    <Container style={style}>
      <IconWrapper>
        <i className="fas fa-check"></i>
      </IconWrapper>
      <Text>{text}</Text>
    </Container>
  );
};

export default IconWithText;

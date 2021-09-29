import styled from "styled-components";

import { theme } from "core/Theme";

export interface LogoSVProps {
  size?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const { colors } = theme;

const SVG = styled.svg<{ isClickable: any }>`
  ${({ isClickable }) => `
    cursor: ${isClickable ? "pointer" : "auto"};
  `}
`;

const LogoSV: React.FC<LogoSVProps> = ({ style, size = 24, onClick }) => {
  return (
    <>
      <SVG
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 130.000000 123.000000"
        preserveAspectRatio="xMidYMid meet"
        isClickable={onClick}
        onClick={onClick}
        style={{ ...style, minWidth: size, minHeight: size }}
      >
        <g
          transform="translate(0.000000,123.000000) scale(0.100000,-0.100000)"
          fill={colors.secondary}
          stroke="none"
        >
          <path
            d="M520 1184 c-265 -57 -461 -301 -460 -572 2 -216 127 -415 321 -511
            46 -23 111 -46 144 -52 72 -14 222 -6 288 15 125 40 260 144 322 250 64 109
            99 272 81 370 -9 46 -32 47 -45 1 -16 -59 -58 -120 -118 -174 -86 -77 -132
            -96 -228 -96 -149 0 -225 66 -225 195 0 107 45 168 116 157 54 -9 64 -21 57
            -76 -5 -40 -2 -51 20 -76 47 -55 131 -31 171 49 16 32 17 46 9 81 l-10 43 34
            -1 c48 -1 78 31 77 85 -1 34 -8 48 -37 74 -48 44 -103 58 -204 50 -83 -7 -156
            4 -169 25 -11 18 18 28 62 22 36 -5 46 -2 68 20 29 29 33 62 11 94 -10 15 -33
            24 -78 32 -81 14 -126 13 -207 -5z m227 -35 c35 -13 44 -28 32 -51 -8 -14 -22
            -18 -69 -18 -52 0 -62 -3 -75 -24 -13 -20 -14 -29 -5 -46 20 -38 69 -50 202
            -50 104 0 128 -3 155 -20 59 -35 71 -97 22 -114 -20 -7 -39 -3 -84 18 -76 34
            -98 20 -43 -27 63 -54 74 -110 31 -156 -61 -65 -103 -45 -103 49 0 52 -3 60
            -27 76 -43 29 -138 25 -194 -8 l-44 -26 -18 24 c-10 14 -37 36 -60 51 -50 31
            -59 43 -45 60 17 21 37 15 72 -22 26 -27 41 -35 68 -35 40 0 55 14 64 58 7 36
            -12 74 -47 93 -37 19 -47 -6 -15 -36 17 -16 26 -33 24 -48 -5 -36 -37 -33 -74
            7 -23 25 -42 36 -62 36 -38 0 -72 -33 -72 -70 0 -25 10 -36 59 -70 57 -38 79
            -68 66 -90 -11 -17 -42 -11 -73 15 -32 27 -61 32 -80 13 -24 -24 -11 -44 53
            -82 69 -40 88 -63 83 -98 -7 -49 -77 -49 -97 0 -14 33 -76 72 -115 72 -33 0
            -68 -35 -64 -63 2 -14 26 -37 67 -64 125 -82 155 -129 111 -173 -42 -42 -104
            -20 -139 48 -15 28 -55 29 -74 2 -14 -20 -15 -18 -35 27 -32 77 -42 123 -42
            207 0 152 52 278 160 386 70 70 143 112 243 141 70 20 202 24 244 8z m-146
            -740 c14 -27 -6 -61 -33 -57 -12 2 -24 10 -28 18 -15 32 -29 83 -24 91 7 11
            72 -29 85 -52z"
          />
          <path
            d="M887 1125 c-21 -21 -21 -29 0 -63 23 -35 33 -42 65 -42 31 0 58 23
            58 50 0 50 -88 90 -123 55z m74 -36 c16 -8 18 -13 8 -25 -16 -20 -24 -18 -43
            11 -15 23 -15 25 -1 25 9 0 25 -5 36 -11z"
          />
          <path
            d="M1004 736 c-13 -34 1 -89 29 -109 l27 -21 28 21 c38 28 40 59 6 94
            -30 31 -81 40 -90 15z m67 -47 c7 -14 8 -24 1 -31 -15 -15 -32 0 -32 28 0 30
            15 31 31 3z"
          />
        </g>
      </SVG>
    </>
  );
};

export default LogoSV;

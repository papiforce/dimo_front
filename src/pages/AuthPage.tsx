import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import axios from "axios";

import { theme } from "core/Theme";
import { lessThan, useInnerWidth } from "utils";

import { IconWithText, InputText, Button } from "components";

const { colors, screens } = theme;

const Container = styled.div`
  ${({ theme: { screens } }) => `
    max-width: ${screens.maxDesktop}px;
  `}
  ${lessThan("tablet")(`
    flex-direction: column;
    padding-bottom: 80px;
  `)}
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const LeftSideWrapper = styled.div`
  ${lessThan("tablet")(`
    margin: 0 auto 80px;
  `)}
  max-width: 600px;
`;

const Title = styled.h1`
  ${lessThan("mobile")(`
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 24px;
  `)}
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  margin-bottom: 40px;
`;

const UpperText = styled.p`
  text-transform: uppercase;
`;

const LogoWrapper = styled.div`
  ${lessThan("mobile")(`
    gap: 24px;
  `)}
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const Logo = styled.img`
  ${lessThan("mobile")(`
    max-width: 100px;
    width: 100%;
    max-height: max-content;
  `)}
  max-width: 80px;
  max-height: 80px;
`;

const RightSideWrapper = styled.form`
  ${({ theme: { colors } }) => `
    background: ${colors.white};
  `}
  ${lessThan("tablet")(`
    margin: 0 auto;
  `)}
  position: relative;
  height: max-content;
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
`;

const RightSideHeader = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.secondaryShade};
  `}
  border-radius: 12px 12px 0px 0px;
  padding: 16px;
`;

const RightSideBody = styled.div`
  ${lessThan("mobile")(`
    padding: 16px;
  `)}
  padding: 40px;
`;

const FakeLink = styled.p`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
  `}
  cursor: pointer;
  margin: 0 auto 24px;
  text-align: center;
  width: max-content;
  font-size: 14px;

  :hover {
    text-decoration: underline;
  }
`;

const FlyIconWrapper = styled.div`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
  `}
  ${lessThan("mobile")(`
    font-size: 32px;
    bottom: -25px;
    right: -5px;
  `)}
  font-size: 48px;
  position: absolute;
  bottom: -30px;
  right: -15px;
`;

const CubeIconWrapper = styled.div`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
  `}
  ${lessThan("mobile")(`
    font-size: 20px;
    bottom: -40px;
    right: 60px;
  `)}
  font-size: 24px;
  position: absolute;
  bottom: -50px;
  right: 60px;
`;

const AuthPage: React.FC = () => {
  const history = useHistory();
  const innerWidth = useInnerWidth();

  const IS_MOBILE_DEVICE = innerWidth <= screens.mobile;

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
  });

  const Items = [
    "Diagnostic immobilier simplifiez vos projets avec des rendus clairs et illustrés.",
    "Profitez de notre disponibilité de 8h30 à 20h00 6/7j",
    "-50€ avec le code DIMO50 ! ⏱️",
  ];

  const Logos = [
    "https://landen.imgix.net/w8ehwao3qq6w/assets/nujk0s2g.jpg?w=100&h=80",
    "https://landen.imgix.net/w8ehwao3qq6w/assets/noioa1kq.png?w=100&h=80",
    "https://landen.imgix.net/w8ehwao3qq6w/assets/pzafavo6.png?w=100&h=80",
    "https://landen.imgix.net/w8ehwao3qq6w/assets/droclkme.png?w=100&h=80",
  ];

  const onChangeHandler = (event) => {
    setAuthForm({ ...authForm, [event.name]: event.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_HOST}/login`,
        withCredentials: true,
        data: {
          email: authForm.email,
          password: authForm.password,
        },
      }).then((res) => {
        if (res.status === 200) history.push("/");
      });
    } else {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_HOST}/register`,
        data: {
          email: authForm.email,
          password: authForm.password,
        },
      }).then(() => {
        setAuthForm({ email: "", password: "" });
        setIsLogin(true);
      });
    }
  };

  return (
    <Container>
      <LeftSideWrapper>
        <Title>
          Diagnostic immobilier : le meilleur prix pour votre projet de vente ou
          de location
        </Title>
        {Items.map((item, index) => {
          return (
            <IconWithText
              key={`text_${index}`}
              text={item}
              style={{ marginBottom: index < Items.length - 1 ? 24 : 40 }}
            />
          );
        })}
        <UpperText
          style={{
            fontWeight: "bold",
            color: colors.grey,
            marginBottom: 24,
            textAlign: IS_MOBILE_DEVICE ? "center" : "left",
          }}
        >
          Plus de 450 professionnels de l'immobilier nous font confiance !
        </UpperText>
        <LogoWrapper>
          {Logos.map((logo, index) => {
            return (
              <Logo key={`logo_${index}`} src={logo} alt={`logo_${index}`} />
            );
          })}
        </LogoWrapper>
      </LeftSideWrapper>
      <RightSideWrapper onSubmit={handleSubmit}>
        <RightSideHeader>
          <UpperText
            style={{
              color: colors.secondary,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {isLogin ? "Connexion" : "Inscription"}
          </UpperText>
        </RightSideHeader>
        <RightSideBody>
          <InputText
            name="email"
            label="Email"
            value={authForm.email}
            onChange={onChangeHandler}
            style={{ marginBottom: 24 }}
          />
          <InputText
            name="password"
            type="password"
            label="Mot de passe"
            value={authForm.password}
            onChange={onChangeHandler}
            style={{ marginBottom: 24 }}
          />
          <FakeLink
            onClick={() => {
              setAuthForm({ email: "", password: "" });
              setIsLogin((isLogin) => !isLogin);
            }}
          >
            {isLogin
              ? "Vous n'avez pas de compte? Cliquez ici"
              : "Vous avez déjà un compte? Cliquez ici"}
          </FakeLink>
          <Button>{isLogin ? "Se connecter" : "S'inscrire"}</Button>
        </RightSideBody>
        <FlyIconWrapper>
          <i className="far fa-paper-plane"></i>
        </FlyIconWrapper>
        <CubeIconWrapper>
          <i className="fas fa-cube"></i>
        </CubeIconWrapper>
      </RightSideWrapper>
    </Container>
  );
};

export default AuthPage;

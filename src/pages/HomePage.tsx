import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { theme } from "core/Theme";

import { InputText, Button } from "components";
import { lessThan, useInnerWidth } from "utils";

const { colors, screens } = theme;

const Form = styled.form`
  ${({ theme: { colors } }) => `
  background: ${colors.white};
`}
  position: relative;
  height: max-content;
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
`;

const FormHeader = styled.div`
  ${({ theme: { colors } }) => `
  background: ${colors.secondary};
`}
  border-radius: 12px 12px 0px 0px;
  padding: 16px;
`;

const UpperText = styled.p`
  text-transform: uppercase;
`;

const FormBody = styled.div`
  padding: 40px;
`;

const InputWrapper = styled.div`
  ${lessThan("mobile")(`
    align-items: flex-end;
  `)}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  margin-bottom: 24px;
`;

const NotificationWrapper = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.white};
  `}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 12px;
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
`;

const NotificationLeftSide = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.green};
    color: ${colors.white};
  `}
  border-radius: 12px 0px 0px 12px;
  padding: 16px;
  height: 100%;
  width: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
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

const HomePage: React.FC = () => {
  const innerWidth = useInnerWidth();

  const IS_MOBILE_DEVICE = innerWidth <= screens.mobile;

  const [diagForm, setDiagForm] = useState({
    lastname: "",
    firstname: "",
    adress: "",
    phone: "",
    email: "",
    propertyType: "",
    propertyYear: "",
    diag: "",
    offer: "",
  });
  const [notification, setNotification] = useState<string>("");

  const onChangeHandler = (event) => {
    setDiagForm({ ...diagForm, [event.name]: event.value });
  };

  useEffect(() => {
    setTimeout(() => {
      setNotification("");
    }, 4000);
  }, [notification]);

  const YEARS = ["Avant 1949", "1949 - 1997", "Après 1997"];
  const TYPES = ["Type A", "Type B"];

  const calculate = () => {
    if (diagForm.propertyYear === "Avant 1949") {
      if (diagForm.propertyType === "Type A") {
        return { offer: "299", diag: "DPE, AM, TER, PB" };
      } else {
        return { offer: "249", diag: "DPE, AM, TER, PB" };
      }
    }
    if (diagForm.propertyYear === "1949 - 1997") {
      if (diagForm.propertyType === "Type A") {
        return { offer: "199", diag: "DPE, AM, TER" };
      } else {
        return { offer: "149", diag: "DPE, AM, TER" };
      }
    }
    if (diagForm.propertyYear === "Après 1997") {
      if (diagForm.propertyType === "Type A") {
        return { offer: "99", diag: "DPE, TER" };
      } else {
        return { offer: "49", diag: "DPE, TER" };
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_HOST}/send-email`,
      withCredentials: true,
      data: {
        lastname: diagForm.lastname,
        firstname: diagForm.firstname,
        adress: diagForm.adress,
        phone: diagForm.phone,
        email: diagForm.email,
        propertyType: diagForm.propertyType,
        propertyYear: diagForm.propertyYear,
        diag: calculate()?.diag,
        offer: calculate()?.offer,
      },
    }).then(() => {
      setDiagForm({
        lastname: "",
        firstname: "",
        adress: "",
        phone: "",
        email: "",
        propertyType: "",
        propertyYear: "",
        diag: "",
        offer: "",
      });
      setNotification("Votre demande a bien été envoyée !");
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {notification !== "" && (
        <NotificationWrapper>
          <NotificationLeftSide>
            <i className="far fa-check-circle"></i>
          </NotificationLeftSide>
          <p style={{ padding: 12 }}>{notification}</p>
        </NotificationWrapper>
      )}
      <FormHeader>
        <UpperText
          style={{
            color: colors.secondaryShade,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Demande de diagnostic
        </UpperText>
      </FormHeader>
      <FormBody>
        <InputWrapper>
          <InputText
            name="firstname"
            label="Prénom de votre client"
            value={diagForm.firstname}
            onChange={onChangeHandler}
          />
          <InputText
            name="lastname"
            label="Nom de votre client"
            value={diagForm.lastname}
            onChange={onChangeHandler}
          />
        </InputWrapper>
        <InputText
          name="email"
          label="Email de votre client"
          value={diagForm.email}
          onChange={onChangeHandler}
          style={{ marginBottom: 24 }}
        />
        <InputText
          name="phone"
          label="Numéro de téléphone de votre client"
          value={diagForm.phone}
          onChange={onChangeHandler}
          style={{ marginBottom: 24 }}
        />
        <InputText
          name="adress"
          label="Adresse du bien votre client"
          value={diagForm.adress}
          onChange={onChangeHandler}
          style={{ marginBottom: 24 }}
        />
        <RadioWrapper>
          {YEARS.map((year, index) => {
            return (
              <div
                key={`year_${index}`}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  id={year}
                  type="radio"
                  name="propertyYear"
                  value={year}
                  checked={diagForm.propertyYear === year}
                  onChange={() =>
                    setDiagForm({ ...diagForm, propertyYear: year })
                  }
                  style={{ cursor: "pointer" }}
                />
                <label
                  htmlFor={year}
                  style={{
                    cursor: "pointer",
                    fontSize: IS_MOBILE_DEVICE ? 10 : 16,
                  }}
                >
                  {year}
                </label>
              </div>
            );
          })}
        </RadioWrapper>
        <RadioWrapper>
          {TYPES.map((type, index) => {
            return (
              <div
                key={`type_${index}`}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  id={type}
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={diagForm.propertyType === type}
                  onChange={() =>
                    setDiagForm({ ...diagForm, propertyType: type })
                  }
                  style={{ cursor: "pointer" }}
                />
                <label
                  htmlFor={type}
                  style={{
                    cursor: "pointer",
                    fontSize: IS_MOBILE_DEVICE ? 10 : 16,
                  }}
                >
                  {type}
                </label>
              </div>
            );
          })}
        </RadioWrapper>
        <Button>Soumettre</Button>
      </FormBody>
      <FlyIconWrapper>
        <i className="far fa-paper-plane"></i>
      </FlyIconWrapper>
      <CubeIconWrapper>
        <i className="fas fa-cube"></i>
      </CubeIconWrapper>
    </Form>
  );
};

export default HomePage;

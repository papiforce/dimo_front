import { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import axios from "axios";

import { useAuth, lessThan } from "utils";

import { LogoSV } from "assets";

const Container = styled.div`
  ${({ theme: { colors } }) => `
    background: ${colors.primary};
  `}
  width: 100%;
  min-height: 100vh;
`;

const Navbar = styled.div`
  ${lessThan("tablet")(`
    box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.2);
  `)}
  display: flex;
  gap: 8px;
  padding: 12px 24px;
  align-items: center;
`;

const SiteName = styled.p`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
  `}
  ${lessThan("mobile")(`
    display: none;
  `)}
  font-size: 24px;
  font-weight: 400;
  text-transform: lowercase;
`;

const Wrapper = styled.div`
  ${lessThan("tablet")(`
    overflow-y: scroll;
    padding: 16px;
  `)}
  width: 100%;
  height: calc(100vh - 72px);
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const RightSide = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const UserLoggedText = styled.p`
  font-size: 14px;
`;

const IconWrapper = styled.span`
  ${({ theme: { colors } }) => `
    color: ${colors.secondary};
    background: ${colors.tertiary};
  `}
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
`;

const Layout: React.FC = ({ children }) => {
  const history = useHistory();
  const { response, loading } = useAuth();

  useEffect(() => {
    if (window.location.pathname === "/" && !response && !loading) {
      window.open("/auth", "_self");
    }

    if (window.location.pathname === "/auth" && response && !loading) {
      window.open("/", "_self");
    }
  }, [response, loading]);

  const logout = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_HOST}/logout`,
      withCredentials: true,
    }).then(() => {
      history.push("/auth");
    });
  };

  if (loading || response === null) return <></>;

  return (
    <Container>
      <Navbar>
        <LogoSV size={48} />
        <SiteName>Dimo Spendesk</SiteName>
        {response && (
          <RightSide>
            <UserLoggedText>{response.email}</UserLoggedText>
            <IconWrapper onClick={logout}>
              <i className="fas fa-sign-out-alt"></i>
            </IconWrapper>
          </RightSide>
        )}
      </Navbar>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Layout;

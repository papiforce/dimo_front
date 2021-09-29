import { Switch, Route, withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "core/Theme";

import { Layout, AuthPage, HomePage } from "pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          exact
          path="/auth"
          component={() => (
            <Layout>
              <AuthPage />
            </Layout>
          )}
        />

        <Route
          exact
          path="/"
          component={() => (
            <Layout>
              <HomePage />
            </Layout>
          )}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default withRouter(App);

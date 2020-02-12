import React, { useEffect } from "react";
import Layout from "./components/Layouts/Layout";
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Clients from "./components/Clients";
import SignIn from "./components/authentication/SignIn";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import InvoiceCreator from "./pages/InvoiceCreator";
import TopBar from "./components/Layouts/TopBar";
import { animated, useTransition } from "react-spring";
import theme from "./styles/theme";
import { AppStyled, GlobalStyle } from "./styles";
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "/graphql",
  credentials: "same-origin"
});

const client = new ApolloClient({
  cache,
  link,
  name: "React Front End Client",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    },
    mutate: {
      errorPolicy: "all"
    }
  }
});

function App() {
  const { user } = useSelector(state => state);
  const history = useHistory();
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: "none" }
  });

  useEffect(() => {
    if (!user.isLogged) {
      // history.push("/login");
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <TopBar />
        {transitions.map(({ item, props, key }) => {
          return (
            <animated.div key={key} style={props}>
              <Switch location={item}>
                <Route
                  exact
                  path="/clients"
                  render={() => {
                    return (
                      <Layout>
                        <Clients />
                      </Layout>
                    );
                  }}
                />
                <Route
                  exact
                  path="/invoice/creator"
                  render={() => {
                    return (
                      <Layout>
                        <InvoiceCreator />
                      </Layout>
                    );
                  }}
                />
                <Route
                  exact
                  path="/invoices"
                  render={() => {
                    return (
                      <Layout>
                        <InvoiceCreator />
                      </Layout>
                    );
                  }}
                />
                <Route exact path="/register" component={SignUp} />
                <Route
                  path="/login"
                  render={() => {
                    return <SignIn />;
                  }}
                />
              </Switch>
            </animated.div>
          );
        })}
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;

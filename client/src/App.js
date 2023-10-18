import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Global styles
import "./App.css";
import { themeStyles } from "./themeStyles.js";

import Auth from "./utils/auth.js";

// Page Components
import SignupForm from "./components/SignupForm/SignupForm.js";
import LoginForm from "./components/LoginForm/LoginForm.js";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyAccount from "./pages/MyAccount/MyAccount";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EntryScreen from "./pages/EntryScreen/EntryScreen";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      {/* Keeps track of the user global state */}
      {/* <UserProvider> */}
      <Router>
        <div className="pageContainer">
          <Header />{" "}
          <div className="contentContainer">
            {Auth.loggedIn() ? (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<MyAccount />} />
                {/* <Route path="/login" element={<Logout />} /> */}
                <Route
                  path="*"
                  element={
                    <h1 style={themeStyles.title}>404: Page Not Found</h1>
                  }
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<EntryScreen />} />
                <Route path="/dashboard" element={<LoginForm />} />
                <Route
                  path="/login"
                  element={
                    <LoginForm
                      isLoggedIn={isLoggedIn}
                      setLoggedIn={setLoggedIn}
                    />
                  }
                />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/account" element={<LoginForm />} />
                <Route
                  path="*"
                  element={
                    <h1 style={themeStyles.title}>404: Page Not Found</h1>
                  }
                />
              </Routes>
            )}
          </div>
          <Footer />
        </div>
      </Router>
      {/* </UserProvider> */}
    </ApolloProvider>
  );
}

export default App;

import React, { useState } from "react";
// Hook from Apollo Client to use mutations
import { useMutation } from "@apollo/client";
// GraphQL mutation
import { ADD_USER } from "../../utils/mutations";
// User authentication middleware
import Auth from "../../utils/auth";
import Dashboard from "../../pages/Dashboard/Dashboard";
// Global styles
import { themeStyles } from "../../themeStyles";
import { PrimaryButton } from "../Button/Button";
import { Link } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = (props) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Update the state of the input when user types
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);

      props.setLoggedIn(!props.isLoggedIn);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div>
        <div className="">
          <h4 style={themeStyles.headline}>Create An Account</h4>
          <div className="">
            {data ? (
              <Dashboard />
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="firstName">First name</label>
                <input
                  className="formInput"
                  placeholder="first name"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Last name</label>
                <input
                  className="formInput"
                  placeholder="last name"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Email address</label>
                <input
                  className="formInput"
                  placeholder="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  className="formInput"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
                <PrimaryButton text="Submit" type="Submit" />
              </form>
            )}
            {error && <div className="">{error.message}</div>}
          </div>
          <p>Not already registered?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;

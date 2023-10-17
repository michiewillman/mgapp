import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../Button/Button";

// Styles
import { themeStyles } from "../../themeStyles";
import "./LoginForm.css";

import Auth from "../../utils/auth";

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Update state change with input change
  const changeState = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submissions
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log("Data after login:", data);
      Auth.login(data.login.token);

      // console.log(context.user)

      props.setLoggedIn(!props.isLoggedIn);
    } catch (e) {
      console.error(e);
    }

    // Clear input values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <div>
        <div>
          <h4 style={themeStyles.headline}>Login</h4>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={changeState}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={changeState}
              />
              <PrimaryButton text="Submit" type="Submit" />
            </form>
            {error && <div className="submit-err">{error.message}</div>}
          </div>
          <p>Not already registered?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;

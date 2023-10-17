// import { Link } from "react-router-dom";
import styles from "./Button.css";

export const PrimaryButton = ({ text, action, type }) => {
  return (
    <button className="primaryButton" onClick={action} type={type}>
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text, action, type }) => {
  return (
    <button className="secondaryButton" onClick={action} type={type}>
      {text}
    </button>
  );
};

export const SmallButton = ({ text, action, type }) => {
  return (
    <button className="smallButton" onClick={action} type={type}>
      {text}
    </button>
  );
};

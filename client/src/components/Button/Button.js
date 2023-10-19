// import { Link } from "react-router-dom";
import "./Button.css";

export const PrimaryButton = ({ text, action, type }) => {
  return (
    <button className="btn primaryButton" onClick={action} type={type}>
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text, action, type }) => {
  return (
    <button className="btn secondaryButton" onClick={action} type={type}>
      {text}
    </button>
  );
};

export const CancelButton = ({ text, action, type }) => {
  return (
    <button className="btn cancelButton" onClick={action} type={type}>
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

export const FullWidthButton = ({ text, action, type }) => {
  return (
    <button
      className="btn primaryButton fullWidthBtn"
      onClick={action}
      type={type}
    >
      {text}
    </button>
  );
};

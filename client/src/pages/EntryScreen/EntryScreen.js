import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Button/Button";
import "./EntryScreen.css";
import entryLogo from "../../assets/logo-teal@2x.png";

const EntryScreen = () => {
  // const entryLogo = "./"

  return (
    <div className="entryScreen">
      <div className="entryLogo">
        <img src={entryLogo} />
      </div>
      <div className="entryContent">
        <h1>MG Won't Stop Me</h1>
        <p>
          Being diagnosed with Myasthenia Gravis doesn't have to be the end of
          your story. Your life has just begun. Reclaim your health.
        </p>
        <div className="entryBtns">
          <Link to="/login" className="entryBtn">
            <PrimaryButton text="Login" />
          </Link>
          <Link to="/signup">
            <PrimaryButton text="Sign Up" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;

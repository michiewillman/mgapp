import { useMutation } from "@apollo/client";
import { DELETE_MEDICATION_LOG } from "../../utils/mutations";
import firstToUppercase from "../../utils/firstToUppercase";
// Styles
import "../Button/Button.css";
import "../Icons/Icons.css";
import "./MedLogCard.css";
// Import icon for delete log button
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
 
const MedLogCard = (props) => {
  const { logId, name, dosage, time } = props;

  const displayName = firstToUppercase(name);

  const [deleteMedicationLog, { error }] = useMutation(DELETE_MEDICATION_LOG);

  // Get only time & 'am' pr 'pm' from timestamp
  const sections = time.split(" ");
  // Capitalize AM/PM
  const displayTime = sections[4] + " " + sections[5].toUpperCase();

  const handleDeleteLog = async (logId) => {
    try {
      const { data } = await deleteMedicationLog({
        variables: { logId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card medLogCard">
      <div className="logLeft">
        <p className="medLogTime">{displayTime}</p>
        <p className="medLogName">{displayName}</p>
        <p className="medLogDosage">{dosage}</p>
      </div>
      <div className="logRight">
        <button className="delLogButton">
          <CloseOutlinedIcon onClick={() => handleDeleteLog(logId)} />
        </button>
      </div>
    </div>
  );
};

export default MedLogCard;

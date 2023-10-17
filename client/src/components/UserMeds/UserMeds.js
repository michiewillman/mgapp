import { SmallButton } from "../Button/Button";
import { useState } from "react";
import MedLogForm from "../MedLogForm/MedLogForm";
import firstToUppercase from "../../utils/firstToUppercase";
import Grid from "@mui/material/Grid"; // Grid version 1
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./UserMeds.css";
import NewMedForm from "../NewMedForm/NewMedForm";

const UserMeds = (props) => {
  const userMeds = props.medications;

  // State control for New Med Form
  const [medFormShown, setMedForm] = useState(false);
  // State control for New Medication Log Form
  const [isShown, setIsShown] = useState(false);
  // Selected medication to render in the form
  const [selectedMedication, setSelectedMedication] = useState("");

  const toggleModal = (medName) => {
    setSelectedMedication(medName); // Set the selected medication before toggling the modal
    setIsShown(!isShown);
  };

  const toggleMedForm = () => {
    setMedForm(!medFormShown);
  };

  return (
    <>
      <Grid>
        <div className="">
          <Grid container>
            {userMeds.length &&
              userMeds.map((med, index) => (
                <Grid key={med + index}>
                  <div className="medCard">
                    <p className="medName">{firstToUppercase(med)}</p>
                    <SmallButton
                      text={"Take Med"}
                      action={() => toggleModal(firstToUppercase(med))}
                    />
                  </div>
                </Grid>
              ))}
            <Grid className="addMedCard">
              <AddBoxIcon
                fontSize="large"
                className="addIcon"
                onClick={() => toggleMedForm("")} // Clear selectedMedication for the "Add Med" button
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
      {/* Modal for creating log when User takes medication */}
      {isShown && (
        <MedLogForm
          // Pass the selected medication as a prop to MedLogForm
          selectedMedication={selectedMedication}
          shown={isShown}
          setIsShown={setIsShown}
          toggleModal={toggleModal}
        />
      )}
      {/* Modal for adding a medication to User property */}
      {medFormShown && (
        <NewMedForm
          medFormShown={medFormShown}
          setMedForm={setMedForm}
          toggleMedForm={toggleMedForm}
        />
      )}
    </>
  );
};

export default UserMeds;

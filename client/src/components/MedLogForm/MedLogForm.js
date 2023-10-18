import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MEDICATION_LOG } from "../../utils/mutations";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./MedLogForm.css";

import Auth from "../../utils/auth";

const MedLogForm = (props) => {
  const [formState, setFormState] = useState({
    medicationName: "",
    dosage: "",
  });

  const [addMedicationLog, { error }] = useMutation(ADD_MEDICATION_LOG);

  // Update state change with input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLogMed = async (event) => {
    event.preventDefault();

    // Get the userId for our mutation
    const user = Auth.getUser();

    try {
      const data = await addMedicationLog({
        variables: {
          medicationName: formState.medicationName,
          dosage: formState.dosage,
          userId: user.data._id,
        },
      });

      // Clear the form by resetting the state
      setFormState({ medicationName: "", dosage: "" });

      // const { renderParent, toggleModal } = props;
      // renderParent();
      props.toggleModal();
    } catch (err) {
      console.error(err);
    }
  };

  // const toggleModal = () => {
  //   props.setIsShown(!props.shown);
  // };

  return (
    <div className="overlay">
      <div className="logModal">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3>Log a Medication</h3>
            </div>
            <div className="p-6 space-y-6">
              <form onSubmit={handleLogMed}>
                <div className="col-12 col-lg-9">
                  <label htmlFor="medicationName">Medication Name</label>
                  <input
                    className="formInput"
                    name="medicationName"
                    type="text"
                    placeholder={props.selectedMedication}
                    value={formState.medicationName}
                    onChange={(event) => handleInputChange(event)}
                  />
                  <label htmlFor="dosage">Dosage</label>
                  <input
                    className="formInput"
                    name="dosage"
                    type="text"
                    placeholder="enter dosage amount"
                    value={formState.dosage}
                    onChange={(event) => handleInputChange(event)}
                  />
                </div>
                <SecondaryButton
                  text="Cancel"
                  action={props.toggleModal}
                  type="button"
                />
                <PrimaryButton text="Submit" type="Submit" />
                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedLogForm;

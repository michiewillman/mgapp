import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SYMPTOM_LOG, ADD_USER_SYMPTOM } from "../../utils/mutations";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./SympLogForm.css";

import Auth from "../../utils/auth";
import firstToUppercase from "../../utils/firstToUppercase";

const SympLogForm = (props) => {
  const [formState, setFormState] = useState({ symptomName: "", severity: "" });

  // Add Symptom Log with severity through form
  const [addSymptomLog, { error: addSymptomLogError }] =
    useMutation(ADD_SYMPTOM_LOG);

  // Add the symptom name to the User's symptoms property
  const [addUserSymptom, { error: addUserSymptomError }] =
    useMutation(ADD_USER_SYMPTOM);

  // Updat e state change with input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLogSymptom = async (event) => {
    event.preventDefault();

    // Get the userId for our mutation
    const user = Auth.getUser();
    const severityNum = Number(formState.severity);

    try {
      const data = await addSymptomLog({
        variables: {
          symptomName: formState.symptomName,
          severity: severityNum,
          userId: user.data._id,
        },
      });

      handleAddUserSymptom(formState.symptomName);

      // Clear the form by resetting the state
      setFormState({ symptomName: "", severity: "" });
      props.toggleModal();
    } catch (err) {
      console.log(addSymptomLogError);
    }
  };

  // Handle adding the symptom name to the User's symptoms property (array)
  const handleAddUserSymptom = async (input) => {
    const newSymptom = firstToUppercase(input);

    try {
      const data = await addUserSymptom({
        variables: { symptom: newSymptom },
      });
    } catch (err) {
      console.log(addUserSymptomError);
    }
  };

  return (
    <div className="overlay">
      <div className="logModal">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3>Log a Symptom</h3>
            </div>
            <div className="p-6 space-y-6">
              <form onSubmit={handleLogSymptom}>
                <div className="col-12 col-lg-9">
                  <label htmlFor="symptomName">Symptom</label>
                  <input
                    className="formInput"
                    name="symptomName"
                    type="text"
                    placeholder="enter symptom name"
                    value={formState.symptomName}
                    onChange={(event) => handleInputChange(event)}
                  />
                  <label htmlFor="severity">Severity</label>
                  <input
                    className="formInput"
                    name="severity"
                    type="number"
                    placeholder="enter a number"
                    value={formState.severity}
                    onChange={(event) => handleInputChange(event)}
                  />
                </div>
                <SecondaryButton
                  text="Cancel"
                  action={props.toggleModal}
                  type="button"
                />
                <PrimaryButton text="Submit" type="Submit" />
                {addSymptomLogError && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {addSymptomLogError.message}
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

export default SympLogForm;

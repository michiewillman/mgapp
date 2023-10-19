import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER_MEDICATION } from "../../utils/mutations";
import { CancelButton, PrimaryButton } from "../Button/Button";
import firstToUppercase from "../../utils/firstToUppercase";

const NewMedForm = (props) => {
  const [formState, setFormState] = useState({
    medication: "",
  });

  const [addUserMedication, { error }] = useMutation(ADD_USER_MEDICATION);

  // Update state change with input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddMed = async (event) => {
    event.preventDefault();

    const newMed = firstToUppercase(formState.medication);

    // Add medication to the User's medications property (array)
    try {
      const data = await addUserMedication({
        variables: { medication: newMed },
      });

      // Clear the form by resetting the state
      setFormState({
        medication: "",
      });

      // Close modal
      props.toggleMedForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overlay">
      <div className="logModal">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3>Add Medication</h3>
            </div>
            <div className="p-6 space-y-6">
              <form onSubmit={handleAddMed}>
                <div className="col-12 col-lg-9">
                  <label htmlFor="medication">Medication Name</label>
                  <input
                    className="formInput"
                    name="medication"
                    type="text"
                    placeholder="enter new medication name"
                    value={formState.medication}
                    onChange={(event) => handleInputChange(event)}
                  />
                </div>
                <CancelButton
                  text="Cancel"
                  action={props.toggleMedForm}
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

export default NewMedForm;

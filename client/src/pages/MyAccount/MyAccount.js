import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import "./MyAccount.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { REMOVE_USER_MEDICATION } from "../../utils/mutations";

const MyAccount = () => {
  // Get logged in user's data
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { _id: userId },
  });
  const user = data?.me || data?.user || {};
  // Pull out medications arary for mapping
  const userMeds = user?.medications || [];
  // Pull out symptoms array for mapping
  const userSymptoms = user?.symptoms || [];

  // Mutation to remove a medication from the array
  const [removeUserMedication, { error }] = useMutation(REMOVE_USER_MEDICATION);

  // State to manage the list of medications for re-rendering purposes
  const [medications, setMedications] = useState(userMeds);

  // Remove medication from User medications array
  const handleRemoveMed = async (medication) => {
    try {
      const { data } = await removeUserMedication({
        variables: { medication },
      });

      // Update the local state by filtering out the removed medication
      setMedications((prevMedications) =>
        prevMedications.filter((med) => med !== medication)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Account Information</h2>
      <p className="accountDetail">
        <strong>First name:</strong> {user.firstName}
      </p>
      <p className="accountDetail">
        <strong>Last name:</strong> {user.lastName}
      </p>
      <p className="accountDetail">
        <strong>Email:</strong> {user.email}
      </p>
      <div className="accountDetail">
        <p>
          <strong>Medications:</strong>
        </p>
        {medications.length ? (
          <div className="userMedsList">
            {/* Render a log card for each item in the medicines array */}
            {medications.map((med, index) => (
              <div key={med + index} className="userMedBadge">
                <p>{med}</p>
                <button onClick={() => handleRemoveMed(med)}>
                  <HighlightOffOutlinedIcon className="delBadge" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No medications added</p>
        )}
      </div>
      {/* User Symptoms */}
      <div className="accountDetail">
        <p>
          <strong>Symptoms:</strong>
        </p>
        {userSymptoms.length ? (
          <div className="userSymptomsList">
            {/* Render a log card for each item in the symptoms array */}
            {userSymptoms.map((med, index) => (
              <div key={med + index} className="userSymptomsBadge">
                <p>{med}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No symptoms reported</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

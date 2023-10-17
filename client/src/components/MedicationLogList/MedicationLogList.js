// Use query to get graphQL data
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { QUERY_MEDICATION_LOGS } from "../../utils/queries";
import MedLogCard from "../MedLogCard/MedLogCard";
import Loading from "../Loading/Loading";
import { PrimaryButton } from "../Button/Button";

const MedicationLogList = (props) => {
  // Get med logs from user from date passed in
  const { datetime } = props;
  const { loading, data } = useQuery(QUERY_MEDICATION_LOGS, {
    variables: { datetime },
  });
  const logData = data?.medicationLogs || [];

  const [listState, setListState] = useState(logData);

  const renderParent = () => {
    // setListState(listState);
    console.log(listState);
  };

  return (
    <div className="my-2">
      <h2>Medication</h2>
      {logData.length ? (
        <div className="flex-row">
          {/* Render a log card for each item in the logs array */}
          {logData.map((log) => (
            <MedLogCard
              key={log._id + log.medicationName}
              logId={log._id}
              name={log.medicationName}
              dosage={log.dosage}
              time={log.datetime}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't logged any medications today.</h3>
      )}
      {/* <Loading loading={loading} /> */}
    </div>
  );
};

export default MedicationLogList;

// Future Development code: REACT NATIVE CONFIRM
//   Alert.alert("Confirm delete", "Are you sure you want to delete this log?", [
//     {
//       text: "Cancel",
//       onPress: () => console.log("Cancel Pressed"),
//       style: "cancel",
//     },
//     {
//       text: "DELETE LOG",
//       onPress: () => console.log("Delete pressed"),
//     },
//   ]);
// };

// Use query to get graphQL data
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { QUERY_MEDICATION_LOGS } from "../../utils/queries";
import MedLogCard from "../MedLogCard/MedLogCard";
import "./MedicationLogList.css";

const MedicationLogList = (props) => {
  // Get med logs from user from date passed in
  const { datetime } = props;
  const { loading, data } = useQuery(QUERY_MEDICATION_LOGS, {
    variables: { datetime },
    // Every 200 milliseconds refresh the query
    pollInterval: 200,
  });
  const logData = data?.medicationLogs || [];

  return (
    <div className="medLogSection">
      <h2>Medication Taken Today</h2>
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
        <p className="noLogMessage">No medications logged for this day.</p>
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

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_SYMPTOM_LOG } from "../../utils/mutations";
import SymptomLogList from "../../components/SymptomLogList/SymptomLogList";
import MedicationLogList from "../../components/MedicationLogList/MedicationLogList";
import Calendar from "../../components/Calendar/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserMeds from "../../components/UserMeds/UserMeds";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  const medsArray = user?.medications || [];

  const [addSymptomLog, { error }] = useMutation(ADD_SYMPTOM_LOG);

  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Calendar onDateSelected={(date) => setSelectedDate(date)} />
          <MedicationLogList datetime={selectedDate} />
          <UserMeds medications={medsArray} />
          <SymptomLogList datetime={selectedDate} />
        </div>
      </LocalizationProvider>
    </main>
  );
};

export default Dashboard;

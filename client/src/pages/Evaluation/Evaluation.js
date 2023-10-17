// Symptoms automatically loaded into user choices
const defaultSymptoms = [
  {
    symptom: "Shortness of breath",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Difficulty swallowing",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Difficulty chewing",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Impaired speech",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Facial expressions",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Droopy eyelid(s)",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Blurred/Double vision",
    severity: symptomSeverityScale,
  },
  {
    symptom: "Muscle weakness",
    severity: symptomSeverityScale,
  },
  {
    symptom: "General fatigue",
    severity: symptomSeverityScale,
  },
];

const SymptomList = ({ userId }) => {
  const { loading, data } = useQuery(QUERY_SYMPTOM_LOGS);
  const [range, setRange] = useState(0);

  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <p>Placeholder for patient evaluation</p>
    </div>
  );
};

export default SymptomList;

// for each symptom in the defaultSymptoms, render a title with the name of the symptom, and a scale below it allowing the user to input their answers

// Symptom onPress --> toggles hiding/showing severity scale (use Switch component)
// event listener on all scale input divs
// If severity scale div is hidden or user chooses 0, skip and go to next symptom
// If user chooses anything other than 0 on scale, it gets logged with the current date, as a SymptomLog
// set symptomName as event target's symptom string
// set severity as even target's input value

// button for add symptom
// handle add symptom () --> pushes new symptom to the User.symptoms array, as well adds a SymptomLog

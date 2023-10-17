import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        medications
        symptoms
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        medications
        symptoms
      }
    }
  }
`;

// User's symptoms property
export const ADD_USER_SYMPTOM = gql`
  mutation addUserSymptom($symptom: String!) {
    addUserSymptom(symptom: $symptom) {
      symptoms
    }
  }
`;
export const REMOVE_USER_SYMPTOM = gql`
  mutation removeUserSymptom($symptom: String!) {
    removeUserSymptom(symptom: $symptom) {
      symptoms
    }
  }
`;

// User's medications property
export const ADD_USER_MEDICATION = gql`
  mutation addUserMedication($medication: String!) {
    addUserMedication(medication: $medication) {
      medications
    }
  }
`;
export const REMOVE_USER_MEDICATION = gql`
  mutation removeUserMedication($medication: String!) {
    removeUserMedication(medication: $medication) {
      medications
    }
  }
`;

// Symptom Log entries in its own collection
export const ADD_SYMPTOM_LOG = gql`
  mutation addSymptomLog($symptomName: String!, $severity: Int!) {
    addSymptomLog(symptomName: $symptomName, severity: $severity) {
      _id
      userId
      datetime
      symptomName
      severity
    }
  }
`;

export const DELETE_SYMPTOM_LOG = gql`
  mutation deleteSymptomLog($logId: ID!) {
    deleteSymptomLog(logId: $logId) {
      _id
      userId
      datetime
      symptomName
      severity
    }
  }
`;

// Medication Log entries in its own collection
export const ADD_MEDICATION_LOG = gql`
  mutation addMedicationLog($medicationName: String!, $dosage: String) {
    addMedicationLog(medicationName: $medicationName, dosage: $dosage) {
      _id
      userId
      datetime
      medicationName
      dosage
    }
  }
`;

export const DELETE_MEDICATION_LOG = gql`
  mutation deleteMedicationLog($logId: ID!) {
    deleteMedicationLog(logId: $logId) {
      _id
      userId
      datetime
      medicationName
      dosage
    }
  }
`;

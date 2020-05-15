const CVStatus = ({ was_reviewed, is_verified }) => {
  if (is_verified) {
    return "Zatwierdzone";
  } else if (was_reviewed) {
    return "Wymaga poprawek";
  } else {
    return "Oczekuje na weryfikację";
  }
};

export default CVStatus;

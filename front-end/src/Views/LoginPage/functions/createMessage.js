export const createMessage = (component, status) => {
    if (status === 400) {
      component.setState({
        message: "Niepoprawny login lub hasło"
      });
    } else {
      component.setState({
        message: "Nieznany błąd proszę spróbować później"
      });
    }
  };
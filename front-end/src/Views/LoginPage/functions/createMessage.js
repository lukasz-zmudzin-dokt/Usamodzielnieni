export const createMessage = status => {
    if (status === 400) {
      this.setState({
        message: "Niepoprawny login lub hasło"
      });
    } else {
      this.setState({
        message: "Nieznany błąd proszę spróbować później"
      });
    }
  };
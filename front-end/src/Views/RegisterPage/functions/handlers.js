import React from "react";

export const onChange = (onBlur, data, e) => {
    const name = e.target.name;
    const value = e.target.value;
    onBlur({ ...data, [name]: value})
};

export const handleIncorrectResponse = (status) => {
    switch (status) {
        case 406: return "Niepoprawne dane. Spróbuj jeszcze raz.";
        case 500: return "Błąd serwera. Spróbuj ponownie za jakiś czas.";
        default: return "Nieznany błąd.";
    }
};





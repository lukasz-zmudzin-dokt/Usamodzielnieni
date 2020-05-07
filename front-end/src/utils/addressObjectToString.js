export const addressToString = (address) => {
    return typeof address !== 'string' ?
        (address ? `ul. ${address.street} ${address.street_number}, ${address.postal_code} ${address.city}` : null)
        : address;
};
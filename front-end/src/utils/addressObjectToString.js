export const addressToString = (address) => {
    return typeof address !== 'string' ?
        (address ? `ul. ${address.street} ${address.number}, ${address.postal_code} ${address.city}` : null)
        : address;
};
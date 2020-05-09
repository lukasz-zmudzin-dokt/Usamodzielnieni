import {addressToString} from "./addressObjectToString";

describe('converter test', () => {
    describe('addressToString', () => {
        let data;
        beforeEach(() => {
            data = {
                street: "ulica",
                street_number: 123,
                postal_code: "00-000",
                city: "miasto"
            }
        });

        it('should render correct string from object', () => {
            const res = addressToString(data);
            expect(res).toBe("ul. ulica 123, 00-000 miasto");
        });

        it('should leave string and not convert', () => {
            const res = addressToString("dzień dobry");
            expect(res).toBe("dzień dobry");
        });

        it('should return null on undefined object', () => {
            const res = addressToString(undefined);
            expect(res).toBe(null);
        });
    });
});
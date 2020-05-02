import {mapData, mapFeedback, objectifyPhoto} from "./mapData";

describe('map', () => {
    describe('mapData', () => {
        let data;

        beforeEach(() => {
            data = {
                basic_info: {
                    first_name: "Jan",
                    last_name: "Kowalski",
                    date_of_birth: "01-01-2000",
                    phone_number: '+48123456789',
                    email: "qwe@qwe.qwe"
                },
                schools: [
                    {
                        name: 'szkoła1',
                        description: 'klasa1',
                        startTime: '2016',
                        endTime: '2019'
                    }
                ],
                experiences: [
                    {
                        title: "praca1",
                        description: "stanowisko1",
                        startTime: '2020',
                        endTime: null
                    }
                ],
                skills: [
                    {description: 'taniec'},
                    {description: 'śpiew'}
                ],
                languages: [
                    {
                        name: 'angielski',
                        level: 'A2'
                    },
                    {
                        name: 'niemiecki',
                        level: 'biegły'
                    }
                ]
            }
        });

        it('should map data', () => {
            const mappedData = mapData(data);
            expect(mappedData).toMatchSnapshot();
            expect(mappedData.personalData.birthDate).toEqual(new Date(2000, 0, 1))
        });

        it('should map data with empty experience array', () => {
            data.experiences = [];
            const mappedData = mapData(data);

            expect(mappedData).toMatchSnapshot();
        });
    });

    describe('mapFeedback', () => {
        let feedback;

        beforeEach(() => {
            feedback = {
                basic_info: "1",
                schools: "2",
                experiences: "3",
                skills: "4",
                languages: "5"
            }
        });

        it('should match snapshot', () => {
            const feed = mapFeedback(feedback);

            expect(feed).toMatchSnapshot();
        });

    });

    describe('Photo base64 to object object', () => {
        let data;

        beforeEach(() => {
            data = {
                file: "1234567812345678123456781234567812345678123456781234567812345678" +
                    "1234567812345678123456781234567812345678123456781234567812345678" ///128 chars
            }
        });

        it('should match snapshot', () => {
            const photo = objectifyPhoto(data);

            expect(photo).toMatchSnapshot();
        });

        it('should return file of given size', () => {
            const photo = objectifyPhoto(data);
            expect(typeof photo).toEqual(typeof {});
            expect(photo.size).toBe(data.file.length * 0.75);
        });
    })
});

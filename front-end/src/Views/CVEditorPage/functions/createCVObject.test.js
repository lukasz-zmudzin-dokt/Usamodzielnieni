
import { createCVObject } from './createCVObject.js';

describe('createCVObject', () => {
    let personalData,
        education,
        workExperience,
        skills,
        languages;
    
    beforeEach(() => {
        personalData = {
            firstName: 'Jan',
            lastName: 'Kowalski',
            birthDate: new Date(2000, 10, 4),
            phoneNumber: '+48123123123',
            email: 'jan.kowalski@mail.com'
        };
        education = [
            {
                startTime: new Date(2002, 4, 4),
                endTime: new Date(2003, 5, 6),
                place: 'Warszawa',
                description: 'Jakiś opis'
            }
        ];
        workExperience = [
            {
                startTime: new Date(2002, 4, 4),
                endTime: new Date(2003, 5, 6),
                place: 'Warszawa',
                description: 'Jakiś opis'
            }
        ];
        skills = [
            { name: 'Jakaś umiejętność' }
        ];
        languages = [
            { name: 'angielski', level: 'podstawowy' }
        ];
    });

    it('should create cv object', () => {
        const cvObject = createCVObject(
            personalData,
            education,
            workExperience,
            skills,
            languages
        );

        expect(cvObject).toMatchSnapshot();
    });

    it('should create cv object when education endTime is undefined', () => {
        education[0].endTime = undefined;
        const cvObject = createCVObject(
            personalData,
            education,
            workExperience,
            skills,
            languages
        );

        expect(cvObject).toMatchSnapshot();
    });

    it('should create cv object when workExperience endTime is undefined', () => {
        workExperience[0].endTime = undefined;
        const cvObject = createCVObject(
            personalData,
            education,
            workExperience,
            skills,
            languages
        );

        expect(cvObject).toMatchSnapshot();
    });
});
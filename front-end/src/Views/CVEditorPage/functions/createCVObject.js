const mapDate = (date) => date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

const mapPersonalData = (personalData) => ({
    first_name: personalData.firstName,
    last_name: personalData.lastName,
    date_of_birth: mapDate(personalData.birthDate),
    phone_number: personalData.phoneNumber,
    email: personalData.email
})
const mapEducation = (education) => education.map(edu => ({
    year_start: edu.startTime?.getFullYear(),
    year_end: edu.endTime?.getFullYear(),
    name: edu.place,
    additional_info: edu.description
}))
const mapWorkExperience = (workExperience) => workExperience.map(exp => ({
    year_start: exp.startTime?.getFullYear(),
    year_end: exp.endTime?.getFullYear(),
    title: exp.place,
    description: exp.description
}))
const mapSkills = (skills) => skills.map(skill => ({
    description: skill.name
}))
const mapLanguages = (languages) => languages.map(lang => ({
    name: lang.name,
    level: lang.level
}))

export const createCVObject = (personalData, education, workExperience, skills, languages) => ({
    basic_info: mapPersonalData(personalData),
    schools: mapEducation(education),
    experiences: mapWorkExperience(workExperience),
    skills: mapSkills(skills),
    languages: mapLanguages(languages),
    "wants_verification": true
})

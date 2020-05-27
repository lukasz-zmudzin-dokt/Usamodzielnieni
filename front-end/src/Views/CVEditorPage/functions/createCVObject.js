const mapDate = (date) =>
  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
const mapMonthDate = (date) =>
  date &&
  (date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1) +
    "-" +
    date.getFullYear();

const mapPersonalData = (personalData) => ({
  first_name: personalData.firstName,
  last_name: personalData.lastName,
  date_of_birth: mapDate(personalData.birthDate),
  phone_number: "+48" + personalData.phoneNumber,
  email: personalData.email,
});
const mapEducation = (education) =>
  education.map((edu) => ({
    date_start: mapMonthDate(edu.startTime),
    date_end: mapMonthDate(edu.endTime),
    name: edu.place,
    additional_info: edu.description,
  }));
const mapWorkExperience = (workExperience) =>
  workExperience.map((exp) => ({
    date_start: mapMonthDate(exp.startTime),
    date_end: mapMonthDate(exp.endTime),
    title: exp.place,
    description: exp.description,
  }));
const mapSkills = (skills) =>
  skills.map((skill) => ({
    description: skill.name,
  }));
const mapLanguages = (languages) =>
  languages.map((lang) => ({
    name: lang.name,
    level: lang.level,
  }));

export const createCVObject = (
  personalData,
  education,
  workExperience,
  skills,
  languages
) => ({
  basic_info: mapPersonalData(personalData),
  schools: mapEducation(education),
  experiences: mapWorkExperience(workExperience),
  skills: mapSkills(skills),
  languages: mapLanguages(languages),
});

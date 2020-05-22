export const mapData = (data) => {
  return {
    personalData: mapBasicInfo(data.basic_info),
    education: mapSchools(data.schools),
    workExperience: mapExperiences(data.experiences),
    skills: mapSkills(data.skills),
    languages: mapLanguages(data.languages),
  };
};

const mapBasicInfo = (data) => ({
  firstName: data.first_name,
  lastName: data.last_name,
  birthDate: mapBirthDate(data.date_of_birth),
  phoneNumber: data.phone_number,
  email: data.email,
});

const mapSchools = (data) =>
  data.map((edu) => ({
    place: edu.name,
    description: edu.additional_info,
    startTime: mapDate(edu.year_start),
    endTime: mapDate(edu.year_end),
  }));

const mapExperiences = (data) =>
  data.map((exp) => ({
    place: exp.title,
    description: exp.description,
    startTime: mapDate(exp.year_start),
    endTime: mapDate(exp.year_end),
  }));

const mapSkills = (data) =>
  data.map((skill) => ({
    name: skill.description,
  }));

const mapLanguages = (data) =>
  data.map((lang) => ({
    name: lang.name,
    level: lang.level,
  }));

const mapDate = (date) => {
  if (date !== null) return new Date(date, 0, 0);
  return undefined;
};

const mapBirthDate = (date) => {
  const dateArray = date.split("-");
  return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
};

export const mapFeedback = (data) => ({
  personalData: data.basic_info,
  education: data.schools,
  workExperience: data.experiences,
  skills: data.skills,
  languages: data.languages,
  photo: data.additional_info,
});

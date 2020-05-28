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
  phoneNumber: data.phone_number.replace(/^\+48/, ""),
  email: data.email,
});

const mapSchools = (data) =>
  data.map((edu) => ({
    place: edu.name,
    description: edu.additional_info,
    startTime: mapDate(edu.date_start),
    endTime: mapDate(edu.date_end),
  }));

const mapExperiences = (data) =>
  data.map((exp) => ({
    place: exp.title,
    description: exp.description,
    startTime: mapDate(exp.date_start),
    endTime: mapDate(exp.date_end),
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
  if (date !== null) {
    const val = date.split(".");
    return new Date(val[1], val[0] - 1, 0);
  }
  return undefined;
};

const mapBirthDate = (date) => {
  const dateArray = date.split(".");
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

export const createCVObject = (component, e) => {
  e.preventDefault();
  const {
    fullName,
    birthDate,
    phoneNumber,
    email,
    education,
    workExperience,
    skills,
    languages
  } = component.state;
  let name = fullName.split(" ");
  let edItemList = [];
  let workItemList = [];
  let langList = [];
  let eduNames = Object.keys(education);
  let workNames = Object.keys(workExperience);
  let langNames = Object.keys(languages);

  for (let index in eduNames) {
    let prop = eduNames[index];
    let endYear = education[prop][1] === undefined ? undefined : education[prop][1].getFullYear();
    edItemList.push({
      name: prop,
      year_start: education[prop][0].getFullYear(),
      year_end: endYear,
      additional_info: education[prop][2]
    });
  }

  for (let index in workNames) {
    let prop = workNames[index];
    let endYear = workExperience[prop][1] === undefined ? undefined : workExperience[prop][1].getFullYear();
    workItemList.push({
      name: prop,
      year_start: workExperience[prop][0].getFullYear(),
      year_end: endYear,
      additional_info: workExperience[prop][2]
    });
  }

  // for (let index in langNames) {
  //   langList.push({
  //     name: langNames[index],
  //     level: languages[langNames[index]]
  //   });
  // }

  langNames.forEach(lang =>
    langList.push({
      name: lang,
      level: languages[lang]
    })
  );

  return {
    cv_id: 0,
    basic_info: {
      first_name: name[0],
      last_name: name[1],
      date_of_birth:
        birthDate.getDate() +
        "-" +
        (birthDate.getMonth() + 1) +
        "-" +
        birthDate.getFullYear(),
      phone_number: phoneNumber,
      email: email
    },
    schools: edItemList.map(school => {
      return {
        name: school.name,
        year_start: school.year_start,
        year_end: school.year_end,
        additional_info: school.additional_info
      };
    }),
    experiences: workItemList.map(workPlace => {
      return {
        title: workPlace.name,
        year_start: workPlace.year_start,
        year_end: workPlace.year_end,
        description: workPlace.additional_info
      };
    }),
    skills: skills.map(skill => {
      return {
        description: skill
      };
    }),
    languages: langList.map(lang => {
      return {
        name: lang.name,
        level: lang.level
      };
    }),
    wants_verification: true,
    is_verified: false
  };
};

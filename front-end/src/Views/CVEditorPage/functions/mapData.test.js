import { mapData, mapFeedback } from "./mapData";

describe("map", () => {
  describe("mapData", () => {
    let data;

    beforeEach(() => {
      data = {
        basic_info: {
          first_name: "Jan",
          last_name: "Kowalski",
          date_of_birth: "01.01.2000",
          phone_number: "+48123456789",
          email: "qwe@qwe.qwe",
        },
        schools: [
          {
            name: "szkoła1",
            additional_info: "klasa1",
            date_start: "01.2016",
            date_end: "06.2019",
          },
        ],
        experiences: [
          {
            title: "praca1",
            description: "stanowisko1",
            date_start: "12.2020",
            date_end: null,
          },
        ],
        skills: [{ description: "taniec" }, { description: "śpiew" }],
        languages: [
          {
            name: "angielski",
            level: "A2",
          },
          {
            name: "niemiecki",
            level: "biegły",
          },
        ],
      };
    });

    it("should map data", () => {
      const mappedData = mapData(data);
      expect(mappedData).toMatchSnapshot();
      expect(mappedData.personalData.birthDate).toEqual(new Date(2000, 0, 1));
    });

    it("should map data with empty experience array", () => {
      data.experiences = [];
      const mappedData = mapData(data);

      expect(mappedData).toMatchSnapshot();
    });

    it("should map data but leave null time undefined", () => {
      const mappedData = mapData(data);
      expect(mappedData.workExperience[0].endTime).toEqual(undefined);
    });
  });

  describe("mapFeedback", () => {
    let feedback;

    beforeEach(() => {
      feedback = {
        basic_info: "1",
        schools: "2",
        experiences: "3",
        skills: "4",
        languages: "5",
      };
    });

    it("should match snapshot", () => {
      const feed = mapFeedback(feedback);

      expect(feed).toMatchSnapshot();
    });

    it("should set no comments if comments are null", () => {
      feedback.experiences = null;
      const feed = mapFeedback(feedback);

      expect(feed.workExperience).toBeNull();
    });
  });
});

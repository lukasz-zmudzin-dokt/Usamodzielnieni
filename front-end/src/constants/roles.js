import { staffTypes } from "./staffTypes";

export const adminGroup = [
  {
    name: staffTypes.VERIFICATION,
    placeholder: "Weryfikacja użytkowników",
  },
  {
    name: staffTypes.CV,
    placeholder: "Weryfikacja CV",
  },
  {
    name: staffTypes.JOBS,
    placeholder: "Weryfikacja ofert pracy",
  },
  {
    name: staffTypes.BLOG_CREATOR,
    placeholder: "Kreator postów na blogu",
  },
  {
    name: staffTypes.BLOG_MODERATOR,
    placeholder: "Moderator bloga",
  },
  {
    name: staffTypes.SPECIALIST,
    placeholder: "Specjalista"
  },
  {
    name: staffTypes.CHAT,
    placeholder: "Moderator czatu"
  }
];

export const commonGroup = [
  {
    name: "Podopiecznym",
  },
  {
    name: "Pracodawcą",
  },
];

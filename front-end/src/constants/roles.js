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
    placeholder: "Moderator bloga / designer",
  },
  {
    name: staffTypes.GUEST,
    placeholder: "Konto gościa",
  },
  {
    name: staffTypes.CHAT,
    placeholder: "Dostęp do czatu",
  },
];

export const commonGroup = [
  {
    name: "Podopiecznym",
  },
  {
    name: "Pracodawcą",
  },
];

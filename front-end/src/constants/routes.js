import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu,
  JobOffersPage,
  JobOfferDetails
} from "Views";

const paths = {
  DASHBOARD: "/",
  CV_EDITOR: "/cvEditor",
  REGISTER: "/newAccount",
  FOOTER: "/footer",
  LOGIN: "/login",
  USER: "/user",
  OFFER_FORM: "/offerForm",
  JOB_OFFERS: "/jobOffers",
  JOB_OFFER_DETAILS: "/jobOffers/:id",
  CV_APPROVAL: "/cvApproval"
};

export const userTypes = {
  STANDARD: "Standard",
  STAFF: "Staff",
  EMPLOYER: "Employer"
};

export default [
  {
    path: paths.DASHBOARD,
    component: Menu,
    exact: true
  },
  {
    path: paths.CV_EDITOR,
    component: CVEditorPage,
    isPrivate: true,
    type: userTypes.STANDARD
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    exact: true
  },
  {
    path: paths.FOOTER,
    component: Footer,
    exact: true
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    exact: true
  },
  {
    path: paths.USER,
    component: UserProfilePage,
    isPrivate: true,
    type: undefined // jeżeli jest undefined to znaczy że jest dostępne dla wszystkich typów konta
  },
  {
    path: paths.JOB_OFFERS,
    component: JobOffersPage,
    isPrivate: true,
    type: undefined
  },
  {
    path: paths.JOB_OFFER_DETAILS,
    component: JobOfferDetails,
    isPrivate: true,
    type: undefined
  },
  {
    path: paths.OFFER_FORM,
    component: UserProfilePage, // tu trzeba zmienić komponent
    isPrivate: true,
    type: userTypes.EMPLOYER
  },
  {
    path: paths.CV_APPROVAL,
    component: UserProfilePage, // tu trzeba zmienić komponent
    isPrivate: true,
    type: userTypes.STAFF
  }
];

export { paths };

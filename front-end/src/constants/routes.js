import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu,
  OfferForm,
  MyOffersPage,
  CVApprovalPage,
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
  CV_APPROVAL: "/cvApproval",
  MY_OFFERS: "/myOffers",
  JOB_OFFER_DETAILS: "/jobOffers/:id"
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
    exact: true,
    isPrivate: true,
    type: undefined
  },
  {
    path: paths.JOB_OFFER_DETAILS,
    component: JobOfferDetails,
    exact: true,
    isPrivate: true,
    type: undefined
  },
  {
    path: paths.OFFER_FORM,
    component: OfferForm,
    isPrivate: true,
    type: userTypes.EMPLOYER
  },
  {
    path: paths.CV_APPROVAL,
    component: CVApprovalPage,
    isPrivate: true,
    type: userTypes.STAFF
  },
  {
    path: paths.MY_OFFERS,
    component: MyOffersPage,
    isPrivate: true,
    type: userTypes.EMPLOYER
  }
];

export { paths };

import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu,
  OfferForm,
  MyOffersPage,
<<<<<<< HEAD
  JobOffersPage,
  JobOfferDetails,
  ContactPage
=======
  JobOfferDetails,
  MyCVsPage
>>>>>>> 7d441cc400cab580bfe6224d21bbc382e87717da
} from "Views";


const paths = {
  DASHBOARD: "/",
  CV_CREATOR: "/cvEditor",
  CV_EDITOR: "/cvEditor/:id",
  REGISTER: "/newAccount",
  FOOTER: "/footer",
  LOGIN: "/login",
  USER: "/user",
  OFFER_FORM: "/offerForm",
  JOB_OFFERS: "/jobOffers",
  CV_APPROVAL: "/cvApproval",
  MY_OFFERS: "/myOffers",
<<<<<<< HEAD
  CONTACT_PAGE: "/contact",
  JOB_OFFER_DETAILS: "/jobOffers/:id"
=======
  JOB_OFFER_DETAILS: "/jobOffers/:id",
  MY_CVS: "/myCVs"
>>>>>>> 7d441cc400cab580bfe6224d21bbc382e87717da
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
    path: paths.CV_CREATOR,
    component: CVEditorPage,
    isPrivate: true,
    type: userTypes.STANDARD,
    exact: true
  },
  {
    path: paths.CV_EDITOR,
    component: CVEditorPage,
    isPrivate: true,
    type: userTypes.STANDARD,
    exact: true
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
    component: UserProfilePage, // tu trzeba zmienić komponent
    isPrivate: true,
    type: userTypes.STAFF
  },
  {
    path: paths.MY_OFFERS,
    component: MyOffersPage,
    isPrivate: true,
    type: userTypes.EMPLOYER
  },
  {
    path: paths.CONTACT_PAGE,
    component: ContactPage,
  },
  {
    path: paths.MY_CVS,
    component: MyCVsPage,
    isPrivate: true,
    type: userTypes.STANDARD
  }
];

export { paths };


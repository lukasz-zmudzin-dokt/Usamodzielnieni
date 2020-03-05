import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu
} from "Views";

const paths = {
  DASHBOARD: "/",
  CVEDITOR: "/cvEditor",
  REGISTER: "/newAccount",
  FOOTER: "/footer",
  LOGIN: "/login",
  USER: "/user",
  OFFERFORM: "/offerForm",
  JOBOFFERS: "/jobOffers",
  CVAPPROVAL: "/cvApproval"
};

const userTypes = {
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
    path: paths.CVEDITOR,
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
    path: paths.JOBOFFERS,
    component: null,
    isPrivate: true,
    type: userTypes.EMPLOYER
  },
  {
    path: paths.OFFERFORM,
    component: null,
    isPrivate: true,
    type: userTypes.EMPLOYER
  },
  {
    path: paths.CVAPPROVAL,
    component: null,
    isPrivate: true,
    type: userTypes.STAFF
  }
];

export { paths };

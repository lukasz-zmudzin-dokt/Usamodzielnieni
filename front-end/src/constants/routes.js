import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu,
  CVApprovalPage,
  MyOffersPage
} from "Views";

const paths = {
  DASHBOARD: "/",
  CVEDITOR: "/cvEditor",
  REGISTER: "/newAccount",
  FOOTER: "/footer",
  LOGIN: "/login",
  USER: "/user",
  CVAPPROVAL: "/cvApproval",
  MYOFFERS: "/myOffers"
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
    isPrivate: true
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
    isPrivate: true
  },
  {
    path: paths.CVAPPROVAL,
    component: CVApprovalPage,
    isPrivate: true
  },
  {
    path: paths.MYOFFERS,
    component: MyOffersPage,
    isPrivate: true
  },
];

export { paths };

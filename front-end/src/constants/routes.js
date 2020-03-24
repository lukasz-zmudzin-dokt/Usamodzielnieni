import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu,
  PasswordResetPrompt,
  NewPasswordPage
} from "Views";

const paths = {
  DASHBOARD: "/",
  CVEDITOR: "/cvEditor",
  REGISTER: "/newAccount",
  FOOTER: "/footer",
  LOGIN: "/login",
  USER: "/user",
  PASSWORD_RESET: "/forgottenPassword",
  NEW_PASSWORD: "/newPassword"
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
    path: paths.PASSWORD_RESET,
    component: PasswordResetPrompt,
    exact: true
  },
  {
    path: paths.NEW_PASSWORD,
    component: NewPasswordPage,
    exact: true
  }
];

export { paths };

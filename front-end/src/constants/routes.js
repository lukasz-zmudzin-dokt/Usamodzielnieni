import {
  BlogPage,
  BlogPost,
  BlogPostForm,
  ContactPage,
  CVApprovalPage,
  CVEditorPage,
  Footer,
  JobOfferDetails,
  JobOffersPage,
  LoginPage,
  Menu,
  MyCVsPage,
  MyOffersPage,
  OfferForm,
  RegisterPage,
  UserProfilePage,
  UserApprovalPage,
  CVCorrection,
} from "Views";
import { userTypes } from "./userTypes";
import { staffTypes } from "./staffTypes";
import { paths } from "./paths";

export default [
  {
    path: paths.DASHBOARD,
    component: Menu,
    exact: true,
  },
  {
    path: paths.CV_CREATOR,
    component: CVEditorPage,
    isPrivate: true,
    type: userTypes.STANDARD,
    exact: true,
    userVerified: true
  },
  {
    path: paths.CV_EDITOR,
    component: CVEditorPage,
    isPrivate: true,
    type: userTypes.STANDARD,
    exact: true,
    userVerified: true
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    exact: true,
  },
  {
    path: paths.REGISTER_ADMIN,
    component: RegisterPage,
    exact: true,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.VERIFICATION,
    userVerified: true
  },
  {
    path: paths.FOOTER,
    component: Footer,
    exact: true,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    exact: true,
  },
  {
    path: paths.USER,
    component: UserProfilePage,
    isPrivate: true,
    type: undefined, // jeżeli jest undefined to znaczy że jest dostępne dla wszystkich typów konta
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
    type: userTypes.EMPLOYER,
    userVerified: true
  },
  {
    path: paths.CV_APPROVAL,
    component: CVApprovalPage,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.CV,
    userVerified: true
  },
  {
    path: paths.MY_OFFERS,
    component: MyOffersPage,
    isPrivate: true,
    type: userTypes.EMPLOYER,
    userVerified: true
  },
  {
    path: paths.CONTACT_PAGE,
    component: ContactPage,
  },
  {
    path: paths.BLOG_POST,
    component: BlogPost,
    isPrivate: true,
    type: undefined,
    exact: true,
  },
  {
    path: paths.BLOG_PAGE,
    component: BlogPage,
    isPrivate: true,
    type: undefined,
    exact: true,
  },
  {
    path: paths.BLOG_FORM,
    component: BlogPostForm,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.BLOG_CREATOR,
    exact: true,
    userVerified: true
  },
  {
    path: paths.BLOG_EDIT,
    component: BlogPostForm,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.BLOG_CREATOR,
    exact: true,
    userVerified: true
  },
  {
    path: paths.MY_CVS,
    component: MyCVsPage,
    isPrivate: true,
    type: userTypes.STANDARD,
    userVerified: true
  },
  {
    path: paths.USER_APPROVAL,
    component: UserApprovalPage,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.VERIFICATION,
    userVerified: true
  },
  {
    path: paths.CV_CORRECTION,
    component: CVCorrection,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.CV
  }
];

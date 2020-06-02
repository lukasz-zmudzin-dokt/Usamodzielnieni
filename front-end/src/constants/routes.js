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
  Steps,
  CVCorrection,
  MessagesList,
  Chats,
  UserList,
  OfferApprovalPage,
  ChangeData,
  PasswordResetPrompt,
  NewPasswordPage,
  PolicyPage
} from "Views";
import routesInfo from "./routesInfo";

export default [
  {
    component: Menu,
  },
  {
    component: CVEditorPage,
  },
  {
    component: CVEditorPage,
  },
  {
    component: RegisterPage,
  },
  {
    component: RegisterPage,
  },
  {
    component: Footer,
  },
  {
    component: LoginPage,
  },
  {
    component: UserProfilePage,
  },
  {
    component: JobOffersPage,
  },
  {
    component: JobOfferDetails,
  },
  {
    component: OfferForm,
  },
  {
    component: CVApprovalPage,
  },
  {
    component: MyOffersPage,
  },
  {
    component: ContactPage,
  },
  {
    component: BlogPost,
  },
  {
    component: BlogPage,
  },
  {
    component: BlogPostForm,
  },
  {
    component: BlogPostForm,
  },
  {
    component: MyCVsPage,
  },
  {
    component: UserApprovalPage,
  },
  {
    component: Steps,
  },
  {
    component: CVCorrection,
  },
  {
    component: Chats,
  },
  {
    component: MessagesList,
  },
  {
    component: UserList,
  },
  {
    component: OfferApprovalPage,
  },
  {
    component: ChangeData,
  },
  {
    component: PasswordResetPrompt,
  },
  {
    component: NewPasswordPage,
  },
  {
    component: BlogPage,
  },
  {
    component: PolicyPage,
  },
].map((value, i) => ({ ...value, ...routesInfo[i] }));

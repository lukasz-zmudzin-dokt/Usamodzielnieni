import {
  UserProfilePage,
  LoginPage,
  RegisterPage,
  Footer,
  CVEditorPage,
  Menu,
  OfferForm,
  MyOffersPage,
  BlogPost,
  BlogPage,
  BlogPostForm,
  JobOffersPage,
  JobOfferDetails,
  ContactPage,
  MyCVsPage,
} from "Views";


const paths = {
  DASHBOARD: "/",
  CV_CREATOR: "/cvEditor",
  CV_EDITOR: "/cvEditor/:id",
  REGISTER: "/newAccount/",
  REGISTER_ADMIN: "/newAccount/:role(staff)",
  FOOTER: "/footer",
  LOGIN: "/login",
  USER: "/user",
  OFFER_FORM: "/offerForm",
  JOB_OFFERS: "/jobOffers",
  CV_APPROVAL: "/cvApproval",
  MY_OFFERS: "/myOffers",
  CONTACT_PAGE: "/contact",
  BLOG_POST: "/blog/blogpost/:id",
  BLOG_PAGE: "/blog",
  BLOG_FORM: "/blog/newPost",
  BLOG_EDIT: "/blog/newPost/:id",
  JOB_OFFER_DETAILS: "/jobOffers/:id",
  MY_CVS: "/myCVs"
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
    path: paths.REGISTER_ADMIN,
    component: RegisterPage,
    exact: true,
    isPrivate: true,
    type: userTypes.STAFF
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
    path: paths.BLOG_POST,
    component: BlogPost,
    isPrivate: true,
    type: undefined,
    exact: true
  },
  {
    path: paths.BLOG_PAGE,
    component: BlogPage,
    isPrivate: true,
    type: undefined,
    exact: true
  },
  {
    path: paths.BLOG_FORM,
    component: BlogPostForm,
    isPrivate: true,
    type: userTypes.STAFF,
    exact: true
  },
  {
    path: paths.BLOG_EDIT,
    component: BlogPostForm,
    isPrivate: true,
    type: userTypes.STAFF,
    exact: true
  }, {
    path: paths.MY_CVS,
    component: MyCVsPage,
    isPrivate: true,
    type: userTypes.STANDARD
  }
];

export { paths };


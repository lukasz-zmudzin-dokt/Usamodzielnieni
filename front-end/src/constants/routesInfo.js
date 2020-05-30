import { userTypes } from "./userTypes";
import { staffTypes } from "./staffTypes";
import { paths } from "./paths";

export default [
  {
    path: paths.DASHBOARD,
    exact: true,
  },
  {
    path: paths.CV_CREATOR,
    isPrivate: true,
    type: [userTypes.STANDARD, userTypes.STAFF],
    group: [staffTypes.GUEST, staffTypes.BLOG_MODERATOR],
    exact: true,
    userVerified: true,
  },
  {
    path: paths.CV_EDITOR,
    isPrivate: true,
    type: userTypes.STANDARD,
    exact: true,
    userVerified: true,
  },
  {
    path: paths.REGISTER,
    exact: true,
  },
  {
    path: paths.REGISTER_ADMIN,
    exact: true,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.VERIFICATION,
    userVerified: true,
  },
  {
    path: paths.FOOTER,
    exact: true,
  },
  {
    path: paths.LOGIN,
    exact: true,
  },
  {
    path: paths.USER,
    isPrivate: true,
    type: undefined, // jeżeli jest undefined to znaczy że jest dostępne dla wszystkich typów konta
  },
  {
    path: paths.JOB_OFFERS,
    exact: true,
    type: undefined,
  },
  {
    path: paths.JOB_OFFER_DETAILS,
    exact: true,
    type: undefined,
  },
  {
    path: paths.OFFER_FORM,
    isPrivate: true,
    type: [userTypes.EMPLOYER, userTypes.STAFF],
    group: [staffTypes.GUEST],
    userVerified: true,
  },
  {
    path: paths.CV_APPROVAL,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.CV,
    userVerified: true,
  },
  {
    path: paths.MY_OFFERS,
    isPrivate: true,
    type: userTypes.EMPLOYER,
    userVerified: true,
  },
  {
    path: paths.CONTACT_PAGE,
  },
  {
    path: paths.BLOG_POST,
    exact: true,
  },
  {
    path: paths.BLOG_PAGE,
    exact: true,
  },
  {
    path: paths.BLOG_FORM,
    isPrivate: true,
    type: userTypes.STAFF,
    group: [staffTypes.BLOG_CREATOR],
    exact: true,
    userVerified: true,
  },
  {
    path: paths.BLOG_EDIT,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.BLOG_CREATOR,
    exact: true,
    userVerified: true,
  },
  {
    path: paths.MY_CVS,
    isPrivate: true,
    type: userTypes.STANDARD,
    userVerified: true,
  },
  {
    path: paths.USER_APPROVAL,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.VERIFICATION,
    userVerified: true,
  },
  {
    path: paths.STEPS,
    isPrivate: true,
  },
  {
    path: paths.CV_CORRECTION,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.CV,
  },
  {
    path: paths.CHATS,
    isPrivate: true,
    type: undefined,
    group: staffTypes.CHAT,
    exact: true,
    userVerified: true,
  },
  {
    path: paths.CHAT_DETAILS,
    isPrivate: true,
    type: undefined,
    group: staffTypes.CHAT,
    exact: true,
    userVerified: true,
  },
  {
    path: paths.USER_LIST,
    isPrivate: true,
    type: userTypes.STAFF,
    exact: true,
    userVerified: true,
  },
  {
    path: paths.OFFER_APPROVAL,
    isPrivate: true,
    type: userTypes.STAFF,
    group: staffTypes.JOBS,
  },
  {
    path: paths.CHANGE_DATA,
    isPrivate: true,
    type: userTypes.STAFF,
    group: undefined,
  },
  {
    path: paths.PASSWORD_RESET,
    type: undefined,
    exact: true,
  },
  {
    path: paths.NEW_PASSWORD,
    type: undefined,
    exact: true,
  },
  {
    path: paths.BLOG_PAGE_FILTERED,
    type: undefined,
    exact: true
  }
];

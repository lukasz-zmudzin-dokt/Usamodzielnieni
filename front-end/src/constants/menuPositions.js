import { userTypes } from "./userTypes";
import { staffTypes } from "./staffTypes";
import { paths } from "./paths";

export default [       
    {
        name: "Kreator CV",
        path: paths.CV_CREATOR,
        allowed: [userTypes.STANDARD],
        verified: true
    },
    {
        name: "Moje CV",
        path: paths.MY_CVS,
        allowed: [userTypes.STANDARD],
        verified: true
    },
    {
        name: "Akceptacja CV",
        path: paths.CV_APPROVAL,
        allowed: [staffTypes.CV],
        verified: true
    },
    {
        name: "Oferty pracy",
        path: paths.JOB_OFFERS,
        allowed: [userTypes.STANDARD, userTypes.STAFF, userTypes.EMPLOYER]
    },
    {
        name: "Dodaj ofertę",
        path: paths.OFFER_FORM,
        allowed: [userTypes.EMPLOYER],
        verified: true
    },
    {
        name: "Moje oferty",
        path: paths.MY_OFFERS,
        allowed: [userTypes.EMPLOYER],
        verified: true
    },
    {
        name: "Blogi",
        path: paths.BLOG_PAGE,
        allowed: [userTypes.STANDARD, userTypes.STAFF, userTypes.EMPLOYER]
    },
    {
        name: "Dodaj post",
        path: paths.BLOG_FORM,
        allowed: [staffTypes.BLOG_CREATOR],
        verified: true
    },
    {
        name: "Telefony",
        path: paths.CONTACT_PAGE,
        allowed: undefined, //wszyscy są upoważnieni - zalogowani i niezalogowani
    },
    {
        name: "Kroki",
        path: paths.STEPS,
        allowed: undefined //wszyscy są upoważnieni - zalogowani i niezalogowani
    },
    {
        name: "Chat",
        path: paths.CHATS,
        allowed: [userTypes.STANDARD, userTypes.STAFF, userTypes.EMPLOYER],
        verified: true,
    }
];

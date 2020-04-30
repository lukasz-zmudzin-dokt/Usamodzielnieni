import {userTypes} from "./userTypes";
import {staffTypes} from "./staffTypes";
import {paths} from "./paths";

export default [       
    {
        name: "Kreator CV",
        path: paths.CV_CREATOR,
        allowed: [userTypes.STANDARD]
    },
    {
        name: "Moje CV",
        path: paths.MY_CVS,
        allowed: [userTypes.STANDARD]
    },
    {
        name: "Akceptacja CV",
        path: paths.CV_APPROVAL,
        allowed: [staffTypes.CV]
    },
    {
        name: "Oferty pracy",
        path: paths.JOB_OFFERS,
        allowed: [userTypes.STANDARD, userTypes.STAFF, userTypes.EMPLOYER]
    },
    {
        name: "Dodaj ofertę",
        path: paths.OFFER_FORM,
        allowed: [userTypes.EMPLOYER]
    },
    {
        name: "Moje oferty",
        path: paths.MY_OFFERS,
        allowed: [userTypes.EMPLOYER]
    },
    {
        name: "Blogi",
        path: paths.BLOG_PAGE,
        allowed: [userTypes.STANDARD, userTypes.STAFF, userTypes.EMPLOYER]
    },
    {
        name: "Dodaj post",
        path: paths.BLOG_FORM,
        allowed: [staffTypes.BLOG_CREATOR]
    },
    {
        name: "Telefony",
        path: paths.CONTACT_PAGE,
        allowed: undefined //wszyscy są upoważnieni - zalogowani i niezalogowani
    }
];
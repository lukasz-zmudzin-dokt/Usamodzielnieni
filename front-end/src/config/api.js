const domain = process.env.REACT_APP_BACKEND_PATH;
const wsDomain = process.env.REACT_APP_BACKEND_PATH_WEBSOCKET;

const proxy = {
  plain: domain,
  wsPlain: wsDomain,
  account: domain + "/account/",
  cv: domain + "/cv/",
  job: domain + "/job/",
  blog: domain + "/blog/",
  notification: domain + "/notification/",
  wsNotification: wsDomain + "/notification/",
  chat: domain + "/chat/",
  steps: domain + "/steps/",
  videos: domain + "/videos/",
  contact: domain + "/helpline/",
  menu: domain + "/tiles/"
};

export default proxy;

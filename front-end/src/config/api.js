const domain = process.env.REACT_APP_BACKEND_PATH;

const proxy = {
  plain: domain,
  account: domain + "/account/",
  cv: domain + "/cv/",
  job: domain + "/job/",
  blog: domain + "/blog/",
  notifications: domain + "/notifications/",
  chat: domain + "/chat/",
  steps: domain + "/steps/",
  videos: domain + "/videos/",
  contact: domain + "/helpline/",
};

export default proxy;

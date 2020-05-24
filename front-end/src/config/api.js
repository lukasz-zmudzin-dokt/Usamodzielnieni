const domain = process.env.REACT_APP_BACKEND_PATH;

const proxy = {
  plain: domain,
  account: domain + "/account/",
  cv: domain + "/cv/",
  job: domain + "/job/",
  blog: domain + "/blog/",
  notification: domain + "/notification/",
  chat: domain + "/chat/",
  steps: domain + "/steps/",
};

export default proxy;

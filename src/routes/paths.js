// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_BLOG = '/blog';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  posts: path(ROOTS_BLOG, '/posts'),
  new: path(ROOTS_BLOG, '/new'),
  view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
}

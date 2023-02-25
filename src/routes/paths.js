// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_BLOG = '/blog';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_USER = '/user';

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
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  posts: path(ROOTS_BLOG, '/posts'),
  new: path(ROOTS_BLOG, '/new'),
  view: (id) => path(ROOTS_BLOG, `/post/${id}`),
}

export const PATH_USER = {
  root: ROOTS_USER,
  account: path(ROOTS_USER, '/account'),
  cards: path(ROOTS_USER, '/cards'),
  list: path(ROOTS_USER, '/list'),
  new: path(ROOTS_USER, '/new'),
  profile: path(ROOTS_USER, '/profile'),
  edit: path(ROOTS_USER, `/edit`),
};

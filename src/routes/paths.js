// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};

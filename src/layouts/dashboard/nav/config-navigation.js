// routes
import { PATH_DASHBOARD, PATH_BLOG } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  user: icon('ic_user'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general v4.2.0',
    items: [
      { title: 'Главная', path: PATH_DASHBOARD.root, icon: ICONS.dashboard },
    ],
  },
  // BLOG
  // ----------------------------------------------------------------------
  {
    subheader: 'Блог',
    items: [
      {
        title: 'Блог',
        path: PATH_BLOG.root,
        icon: ICONS.blog,
        children: [
          { title: 'Статьи', path: PATH_BLOG.posts },
          { title: 'Создать', path: PATH_BLOG.new },
        ],
      },
    ],
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'пользователи',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },
];

export default navConfig;

import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
import { Box, Card, Avatar, Typography, CardContent, Stack, Link } from '@mui/material';
// routes
import { PATH_BLOG } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import TextMaxLine from '../../components/text-max-line';
import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  index: PropTypes.number,
  post: PropTypes.object,
};

export default function BlogPostCard({ post, index }) {

  const { id, picture, title, view_count, comment, share, author, date_creation } = post;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />

        <Avatar
          alt={author?.username}
          src={author?.avatar}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />

        <Image alt="cover" src={picture} ratio="4/3" />
      </Box>

      <PostContent
        id={id}
        title={title}
        view={view_count}
        comment={comment}
        share={share}
        createdAt={date_creation}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  id: PropTypes.number,
  view: PropTypes.number,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  comment: PropTypes.number,
  createdAt: PropTypes.string,
};
/* eslint-disable */
export function PostContent({ id, title, view, comment, share, createdAt, index }) {
  const isDesktop = useResponsive('up', 'md');

  // ToDO добавить slug
  // const linkTo = PATH_BLOG.view(paramCase(id));
  const linkTo = PATH_BLOG.view(id);

  const latestPostLarge = index === 1;

  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { id: 'comment', value: comment, icon: 'eva:message-circle-fill' },
    { id: 'view', value: view, icon: 'eva:eye-fill' },
    { id: 'share', value: share, icon: 'eva:share-fill' },
  ];
  /* eslint-disable */
  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        // ...((latestPostLarge) && {
        //   pt: 0,
        //   zIndex: 9,
        //   bottom: 0,
        //   position: 'absolute',
        //   color: 'common.white',
        // }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link component={NextLink} href={linkTo} color="inherit">
        <TextMaxLine
          variant='h6'
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info) => (
          <Stack
            key={info.id}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', ml: info.id === 'comment' ? 0 : 1.5 }}
          >
            <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
            {fShortenNumber(info.value)}
          </Stack>
        ))}
      </Stack>
    </CardContent>
  );
}

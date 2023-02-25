import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Stack, Container, Typography, Pagination } from '@mui/material';
// routes
import { PATH_BLOG } from '../../../routes/paths';
// utils
import axios from '../../../utils/axios';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Markdown from '../../../components/markdown';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { SkeletonPostDetails } from '../../../components/skeleton';
// sections
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostCard,
  BlogPostCommentList,
  BlogPostCommentForm,
} from '../../../sections/blog';

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();

  const { query: { id },} = useRouter();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/knowledge/article/${id}`);
      setPost(response.data);
      setLoadingPost(false);
    } catch (error) {
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [id]);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/knowledge/article/${id}`);

      setRecentPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getRecentPosts();
  }, [getRecentPosts]);

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [getPost, id]);

  return (
    <>
      <Head>
        <title>{`Блог: ${post?.title || ''} | FatCode`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={post?.title}
          links={[
            {
              name: 'Блог',
              href: PATH_BLOG.root,
            },
            {
              name: post?.title,
            },
          ]}
        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
            }}
          >
            <BlogPostHero post={post} />

            {/*<Typography*/}
            {/*  variant="h6"*/}
            {/*  sx={{*/}
            {/*    py: 5,*/}
            {/*    px: { md: 5 },*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {post.text}*/}
            {/*</Typography>*/}

            <Markdown
              children={post.text}
              sx={{
                px: { md: 5 },
              }}
            />

            <Stack
              spacing={3}
              sx={{
                py: 5,
                px: { md: 5 },
              }}
            >
              <Divider />
              <BlogPostTags post={post} />
              <Divider />
            </Stack>

            <Stack
              sx={{
                px: { md: 5 },
              }}
            >
              <Stack direction="row" sx={{ mb: 3 }}>
                <Typography variant="h4">Комментарии</Typography>

                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments?.length})
                </Typography>
              </Stack>

              <BlogPostCommentForm />

              <Divider sx={{ mt: 5, mb: 2 }} />
            </Stack>

            <Stack sx={{px: { md: 5 },}}>
              <BlogPostCommentList pk={post.id} />

              <Pagination
                count={8}
                sx={{
                  my: 5,
                  ml: 'auto',
                  mr: { xs: 'auto', md: 0 },
                }}
              />
            </Stack>
          </Stack>
        )}

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}

        {!!recentPosts.length && (
          <>
            <Typography variant="h4" sx={{ my: 5 }}>
              Recent posts
            </Typography>

            <Box
              gap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              }}
            >
              {recentPosts.slice(recentPosts.length - 4).map((recentPost) => (
                <BlogPostCard key={recentPost.id} post={recentPost} />
              ))}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

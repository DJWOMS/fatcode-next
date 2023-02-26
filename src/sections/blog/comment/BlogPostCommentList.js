import PropTypes from 'prop-types';
// @mui
/* eslint-disable */
import {Box, List, Typography} from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';
import {useCallback, useEffect, useState} from "react";
import axios from "../../../utils/axios";
import {SkeletonPostDetails} from "../../../components/skeleton";

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  pk: PropTypes.number,
};

export default function BlogPostCommentList({pk}) {
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(true);

  const getComments = useCallback(async () => {
    try {
      const response = await axios.get(`/knowledge/article/${pk}/comment/`);
      console.log('COMMENTS ', pk, response.data.results)
      setComments(response.data.results);
      setLoadingComments(false);
    } catch (error) {
      console.error(error);
      setLoadingComments(false);
    }
  }, [pk]);

  useEffect(() => {
    getComments();
  }, [getComments, pk]);

  return (
    <List disablePadding>

      {loadingComments && <SkeletonPostDetails/>}

      {comments.map((comment) => {
        const {id, user, text, create_date} = comment;

        // const hasReply = replyComment.length > 0;

        return (
          <Box key={id}>
            <BlogPostCommentItem
              name={user.username}
              message={text}
              postedAt={create_date}
              avatarUrl={user.avatar}
            />
            {/*{hasReply &&*/}
            {/*  replyComment.map((reply) => {*/}
            {/*    const userReply = users.find((user) => user.id === reply.userId);*/}

            {/*    return (*/}
            {/*      <BlogPostCommentItem*/}
            {/*        key={reply.id}*/}
            {/*        name={userReply?.name || ''}*/}
            {/*        message={reply.message}*/}
            {/*        postedAt={reply.postedAt}*/}
            {/*        avatarUrl={userReply?.avatarUrl || ''}*/}
            {/*        tagUser={reply.tagUser}*/}
            {/*        hasReply*/}
            {/*      />*/}
            {/*    );*/}
            {/*  })}*/}
          </Box>
        );
      })}
    </List>
  );
}

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../redux/slices/comments';

export const Home = () => {
  const {tag} = useParams()
  const dispatch = useDispatch()
  const [tab, setTab] = useState('new')
  const userData = useSelector((state) => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)
  const { comments } = useSelector(state => state.comments)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const isPostsByTag = Boolean(tag)

  useEffect(() => {
    dispatch(fetchPosts({sort: tab, tag}))
    dispatch(fetchTags())
    dispatch(fetchComments())
  }, [dispatch, tab, tag])

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }
  
  return (
    <>
      {isPostsByTag
      ?
        <h1 style={{color: 'black', opacity: .3, fontSize: '3em'}}>
          #{tag}
        </h1>
      : 
        <Tabs style={{ marginBottom: 15 }} value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Новые" value='new' />
          <Tab label="Популярные" value='popular' />
        </Tabs>
      }
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) => (
            <Post
              key={item?._id || index}
              id={item?._id}
              title={item?.title}
              imageUrl={item?.imageUrl}
              user={{
                avatarUrl: item?.user?.avatarUrl,
                fullName: item?.user?.fullName,
              }}
              createdAt={item?.createAt}
              viewsCount={item?.viewsCount}
              commentsCount={3}
              tags={item?.tags}
              isLoading={isPostsLoading}
              isEditable={userData?._id === item?.user?._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          { (tags.status === 'loaded' && tags.items.length !== 0) && <TagsBlock items={tags.items} isLoading={isTagsLoading} />}
          { (comments.status === 'loaded' && comments.items.length !== 0) && <CommentsBlock items={comments.items} isLoading={false} />}
        </Grid>
      </Grid>
    </>
  );
};

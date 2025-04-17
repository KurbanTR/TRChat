import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import NotFound from '../components/NotFound'
import { useGetPostsQuery, useGetTagsQuery } from '../redux/query/postsApi'
import { useGetCommentsQuery } from '../redux/query/commentsApi'
import { useGetMeQuery } from '../redux/query/authApi'

export const Home = () => {
  const { tag } = useParams()
  const [tab, setTab] = useState('new')
  const { data: userData } = useGetMeQuery()

  const { data: posts = [], isLoading: isPostsLoading } = useGetPostsQuery({ sort: tab, tag })
  const { data: tags = [], isLoading: isTagsLoading } = useGetTagsQuery()
  const { data: comments = [], isLoading: isCommentsLoading } = useGetCommentsQuery()

  const isPostsByTag = Boolean(tag)

  const handleChange = (_, newValue) => setTab(newValue)

  if (!isPostsLoading && posts.length < 1) return <NotFound message="Нет статей" />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='container'>
        {isPostsByTag ? (
          <h1 style={{ color: 'black', opacity: .3, fontSize: '3em' }}>#{tag}</h1>
        ) : (
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 2,
              minHeight: 0, 
              height: 'fit-content',
              '& .MuiTabs-flexContainer': {
                minHeight: 0,
              },
              '& .MuiTab-root': {
                minHeight: 0,
                height: '25px',
                minWidth: 0,
                width: 'auto',
                fontSize: {
                  xs: '12px',
                  sm: '14px',
                },
                padding: {
                  xs: '2px 4px',
                  sm: '4px 8px',
                },
              },
            }}
          >
            <Tab label="Новые" value="new" />
            <Tab label="Популярные" value="popular" />
          </Tabs>
        )}
      </div>

      <Grid container spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ display: { xs: 'block', sm: 'flex' } }}>
        <Grid item xs={12} sm={8}>
          {(isPostsLoading ? [...Array(5)] : posts).map((item, index) => (
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
              commentsCount={comments.length}
              tags={item?.tags}
              isLoading={isPostsLoading}
              isEditable={userData?._id === item?.user?._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item sx={{ paddingLeft: { xs: 0, sm: 2 } }}>
          {tags.length > 0 && <TagsBlock items={tags} isLoading={isTagsLoading} />}
          {comments.length > 0 && <CommentsBlock items={comments} isLoading={isCommentsLoading} />}
        </Grid>
      </Grid>
    </div>
  )
}

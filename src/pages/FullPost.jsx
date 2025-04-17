import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../redux/query/postsApi";
import NotFound from "../components/NotFound";
import isAuth from '../utils/isAuth'

export const FullPost = () => {
  const { id } = useParams()

  const { data, isLoading, isError } = useGetPostByIdQuery(id)

  if (isLoading) return <Post isLoading={isLoading} isFullPost/>
  if (isError) return <NotFound message='Ошибка при получении статьи'/>
    
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data?.imageUrl}
        user={{
          avatarUrl: data?.user?.avatarUrl,
          fullName: data?.user?.fullName,
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} components={{a: ({node, ...props}) => (<a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>)}} />
      </Post>
      {<CommentsBlock
        items={data.comments}
        isLoading={false}
      >
        {isAuth && <Index />}
      </CommentsBlock>}
    </>
  );
};

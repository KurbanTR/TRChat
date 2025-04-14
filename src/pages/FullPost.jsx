import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { selectIsAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const isAuth = useSelector(selectIsAuth)
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data)
      setLoading(false)
    }).catch(err => {
      console.warn(err);
      alert('Ошибка при получении статьи')
    })
  }, [id])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
    
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

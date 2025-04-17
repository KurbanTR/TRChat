import { useEffect, useState } from 'react';
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../utils/serverUrl';
import { showMessage } from '../Alert/showMessage';
import { useGetMeQuery } from '../../redux/query/authApi';
import { useCreateCommentMutation } from '../../redux/query/commentsApi';

export const Index = () => {
  const [text, setText] = useState('');
  const [isValid, setValid] = useState(false);
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const { data } = useGetMeQuery()
  const { id } = useParams()

  useEffect(() => {
    if (text === '') return setValid(false) 
      setValid(true)   
  }, [text])

  const onSubmit = async (event) => {
    event.preventDefault();
    setValid(false)
    try {
      await createComment({ postId: id, text }).unwrap();  
      setText('')
      setValid(true)      
    } catch (err) {
      console.warn(err);
      showMessage('Ошибка при создании комментария!', 'error')
      setValid(true)
    }
  }
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${serverUrl}${data?.avatarUrl}`}
          alt={data?.fullName}
        />
        <form onSubmit={onSubmit} className={styles.form}>
          <TextField
            label="Написать комментарий"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button disabled={!isValid || isLoading} type="submit" variant="contained">Отправить</Button>
        </form>
      </div>
    </>
  );
};

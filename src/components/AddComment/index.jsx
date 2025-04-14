import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { showMessage } from '../Alert/showMessage';

export const Index = () => {
  const [text, setText] = useState('');
  const [isValid, setValid] = useState(false);
  const { data } = useSelector(state => state.auth)
  const { id } = useParams()

  useEffect(() => {
    if (text === '') return setValid(false) 
      setValid(true)   
  }, [text])

  const onSubmit = async (event) => {
    event.preventDefault();
    setValid(false)
    try {

      const fileds = {
        text,
        postId: id
      }

      const { data } = await axios.post(`/comments/${id}`, fileds)      
      console.log(data);
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
          src={`${serverUrl}${data.avatarUrl}`}
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
          <Button disabled={!isValid} type="submit" variant="contained">Отправить</Button>
        </form>
      </div>
    </>
  );
};

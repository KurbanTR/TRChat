import { useState } from 'react';
import { useSelector } from "react-redux";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../App';

export const Index = () => {
  const [text, setText] = useState('');
  const { data } = useSelector(state => state.auth)
  const { id } = useParams()

  const onSubmit = async (event) => {
    event.preventDefault();
    try {

      const fileds = {
        text,
        postId: id
      }

      const { data } = await axios.post(`/comments/${id}`, fileds)      
      console.log(data);
      setText('')
      
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи!')
    }
  }
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${serverUrl}/${data.avatarUrl}`}
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
          <Button type="submit" variant="contained">Отправить</Button>
        </form>
      </div>
    </>
  );
};

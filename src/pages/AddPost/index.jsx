import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios'
import { serverUrl } from '../../App';


export const AddPost = () => {
  const {id} = useParams()

  const nav = useNavigate()
  const inputFileRef = useRef(null)
  // const [isLoading, setLoading] = useState(false);
  const [isValid, setValid] = useState(false);
  const isAuth = useSelector(selectIsAuth)
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const isEditing = Boolean(id)

  useEffect(() => {
    if (text === '' || title === '') return setValid(false) 
      setValid(true)   
  }, [text, title])

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url);
      console.log(data.url);      
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!')
    }
  };

  const onClickRemoveImage = () => {  
    setImageUrl('') 
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setValid(false)
    try {
      // setLoading(true)

      const fileds = {
        title,
        imageUrl,
        tags,
        text,
      }

      const { data } = isEditing 
        ? await axios.patch(`/posts/${id}`, fileds)
        : await axios.post('/posts', fileds)
      
      setValid(true)
      const _id = isEditing ? id : data._id
      nav(`/posts/${_id}`)
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи!')
      setValid(true)
    }
  }

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({data}) => {
        setTitle(data.title)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
        setText(data.text)
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи!')
      })
    }
  }, [id])

  const options = useMemo(() => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  
  useEffect(() => {
    console.log(inputFileRef.current);
  }, [inputFileRef])

  if(!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"/>
  }

  
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current && inputFileRef.current.click()} className={styles.button} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`${serverUrl}/${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField 
          classes={{ root: styles.tags }}
          variant="standard" 
          placeholder="Тэги" 
          value={tags}
          onChange={(e) => setTags (e.target.value)}
          fullWidth />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button disabled={!isValid} type='submit' size="large" variant="contained">
            {isEditing ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <Link to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};

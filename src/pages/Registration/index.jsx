import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { showMessage } from '../../components/Alert/showMessage';
import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import axios from '../../axios';
import { serverUrl } from '../../App';

export const Registration = () => {
  const inputFileRef = useRef(null)
  const [isLoad, setLoad] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('');
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: {errors, isValid}, setValue } = useForm({
    defaultValues: {
      fullName: 'Вася Кожанович',
      email: 'vasya@test.com',
      password: '123456',
      avatarUrl,
    },
    mode: 'onChange'
  })

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setAvatarUrl(data.url);
      setValue('avatarUrl', data.url); 
    } catch (err) {
      console.warn(err);
      showMessage('Ошибка при загрузке файла!', 'error')
    }
  };
  
  const onSubmit = async (values) => {
    setLoad(true)
    showMessage('Регистрация', 'info')
    const data = await dispatch(fetchRegister(values))
    
    if(!data.payload) {
      setLoad(false)
      return showMessage('Не удалось зарегиризоваться', 'error')
    }
    
    if('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    }
    setLoad(false)
  }

  if(isAuth) {
    return <Navigate to="/"/>
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatarContainer}>        
        <div className={styles.avatar} onClick={() => inputFileRef.current && inputFileRef.current.click()}>
          {
            Boolean(avatarUrl) 
            ? <img src={`${serverUrl}${avatarUrl}`} alt='Uploaded' />
            : <Avatar sx={{ width: 100, height: 100 }} />
          }            
        </div>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />              
        <Button disabled={!isValid || isLoad} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться 
        </Button>
      </form>
    </Paper>
  );
};

import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useState } from 'react';
import { showMessage } from '../../components/Alert/showMessage';

export const Login = () => {
  const [isLoad, setLoad] = useState(false)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: 'test@test.com',
      password: '123456',
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    setLoad(true)
    showMessage('Авторизация', 'info')
    const data = await dispatch(fetchAuth(values))

    if(!data.payload) {
      setLoad(false)
      return showMessage('Не удалось авторизоваться', 'error')
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          fullWidth />
        <Button disabled={!isValid || isLoad} type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

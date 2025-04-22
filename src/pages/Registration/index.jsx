import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import axios from '../../axios'
import { serverUrl } from '../../utils/serverUrl'
import { useRegisterMutation } from '../../redux/query/authApi'
import { showMessage } from '../../components/Alert/showMessage'
import isAuth from '../../utils/isAuth'

export const Registration = () => {
  const inputFileRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [registerUser, { isLoading }] = useRegisterMutation()

  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm({
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
      setAvatarUrl(data.url)
      setValue('avatarUrl', data.url)
    } catch (err) {
      console.warn(err)
      showMessage('Ошибка при загрузке файла!', 'error')
    }
  }

  const onSubmit = async (values) => {
    showMessage('Регистрация', 'info')
    try {
      await registerUser(values).unwrap()
    } catch {
      showMessage('Ошибка регистрации', 'error')
    }
  }

  if (isAuth()) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar} onClick={() => inputFileRef.current?.click()}>
          {
            avatarUrl
              ? <img src={`${serverUrl}${avatarUrl}`} alt="Uploaded" />
              : <Avatar sx={{ width: 100, height: 100 }} />
          }
        </div>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Имя"
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите имя' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={!!errors.email}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button disabled={!isValid || isLoading} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
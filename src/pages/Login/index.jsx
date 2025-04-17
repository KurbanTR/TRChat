import { useLoginMutation } from '../../redux/query/authApi'
import { Navigate } from 'react-router-dom'
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { useForm } from 'react-hook-form'
import styles from "./Login.module.scss"
import { showMessage } from '../../components/Alert/showMessage'
import isAuth from '../../utils/isAuth'

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'test@test.com',
      password: '123456',
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    showMessage('Авторизация', 'info')
    try {
      const res = await login(values).unwrap()
      if (res.token) {
        localStorage.setItem('token', res.token)
        showMessage('Успешный вход', 'success')
      } else {
        showMessage('Не удалось авторизоваться', 'error')
      }
    } catch {
      showMessage('Ошибка входа', 'error')
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
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
          fullWidth
        />
        <Button disabled={!isValid || isLoading} type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}

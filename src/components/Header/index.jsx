import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
// import Container from '@mui/material/Container';
import isAuth from '../../utils/isAuth'
import { useLogoutMutation } from '../../redux/query/authApi';

export const Header = () => {
  const [logout] = useLogoutMutation()

  const onClickLogout = async () => {
    if(window.confirm('Вы действительно хотите выйти?'))
    await logout()
  };

  return (
    <div className={styles.root}>
      <div className={styles.contaiber}>
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>TRChat</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth() ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

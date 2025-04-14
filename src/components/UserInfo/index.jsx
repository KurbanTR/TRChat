import styles from './UserInfo.module.scss';
import { serverUrl } from '../../App';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {

  const formatDate = (isoDate) => {   
    const date = new Date(isoDate);
    if (isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl ? `${serverUrl}${avatarUrl}` : '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{formatDate(additionalText)}</span>
      </div>
    </div>
  );
};

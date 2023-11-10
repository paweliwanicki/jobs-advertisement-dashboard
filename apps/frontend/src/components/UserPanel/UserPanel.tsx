import { useMemo } from 'react';
import { useUser } from '../../hooks/useUser';
import Button from '../common/Button/Button';
import classes from './UserPanel.module.scss';
import { useSignForm } from '../../hooks/useSignForm';
import { Link } from 'react-router-dom';

export const UserPanel = () => {
  const { user } = useUser();
  const { handleSignOut } = useSignForm();

  const createdAtDate = useMemo(
    () =>
      user
        ? new Date(user.createdAt * 1000).toLocaleString('pl-PL', {
            timeZone: 'UTC',
          })
        : '',
    [user]
  );

  return (
    <div className={classes.userPanel}>
      <div className={classes.userMenu}>
        {user?.isAdmin && (
          <Link to="/dict">
            <Button variant="primary">Dictionaries</Button>
          </Link>
        )}

        {user && (
          <Link to="/offers/my">
            <Button variant="primary">My offers</Button>
          </Link>
        )}
      </div>

      <div className={classes.userProfileDetails}>
        <p>Registered at: {`${createdAtDate}`}</p>
        <p>Active offers: {100}</p>
        <p>Archived offers: {20}</p>
      </div>

      <div className={classes.moreActions}>
        <Button variant="secondary" onClick={handleSignOut}>
          Sign off
        </Button>
      </div>
    </div>
  );
};

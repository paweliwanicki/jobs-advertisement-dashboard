import { useCallback, useMemo } from 'react';
import { useUser } from '../../hooks/useUser';
import Button from '../common/Button/Button';
import classes from './UserPanel.module.scss';
import { useApi } from '../../hooks/useApi';
import { useSignForm } from '../../hooks/useSignForm';
import { HttpMethod } from '../../enums/HttpMethods';

export const UserPanel = () => {
  const { user } = useUser();
  const { fetch } = useApi();
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

  const handleGetProfile = useCallback(async () => {
    await fetch(HttpMethod.GET, {
      path: '/api/auth/getuser',
    });
  }, []);

  return (
    <div className={classes.userPanel}>
      <div>Registered at: {`${createdAtDate}`}</div>
      <Button variant="secondary" onClick={handleSignOut}>
        Sign off
      </Button>

      <Button variant="primary" onClick={handleGetProfile}>
        Get profile
      </Button>
    </div>
  );
};

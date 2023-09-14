import { useCallback, useMemo } from 'react';
import { useUser } from '../../hooks/useUser';
import Button from '../common/Button/Button';
import classes from './UserPanel.module.scss';
import { useApi } from '../../hooks/useApi';
import { useSignForm } from '../../hooks/useSignForm';
import { HttpMethod } from '../../enums/HttpMethods';

export const UserPanel = () => {
  const { user } = useUser();
  const { refreshJwtToken, fetch } = useApi();
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

  const handleRefreshtoken = useCallback(async () => {
    refreshJwtToken();
  }, []);

  const handleGetProfile = useCallback(async () => {
    {
      const res = await fetch(HttpMethod.GET, {
        path: '/api/auth/whoami',
      });
      console.log(res);
    }
  }, []);

  return (
    <div className={classes.userPanel}>
      <div>Registered at: {`${createdAtDate}`}</div>
      <Button variant="primary" onClick={handleSignOut}>
        Sign off
      </Button>

      <Button variant="secondary" onClick={handleRefreshtoken}>
        Refresh token test
      </Button>
      <Button variant="secondary" onClick={handleGetProfile}>
        Who am i
      </Button>
    </div>
  );
};

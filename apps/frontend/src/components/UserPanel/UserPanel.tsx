import { useCallback, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import Button from '../common/Button/Button';
import classes from './UserPanel.module.scss';

export const UserPanel = () => {
  const { user } = useUser();
  const { setToken } = useAuth();
  const createdAtDate = useMemo(
    () =>
      user
        ? new Date(user?.created_at * 1000).toLocaleString('pl-PL', {
            timeZone: 'UTC',
          })
        : '',
    []
  );

  const handleSignOff = useCallback(() => {
    setToken(undefined);
  }, []);

  return (
    <div className={classes.userPanel}>
      <div>Registered at: {`${createdAtDate}`}</div>
      <Button variant="primary" onClick={handleSignOff}>
        Sign off
      </Button>
    </div>
  );
};

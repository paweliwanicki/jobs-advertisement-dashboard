import { useMemo } from 'react';
import { useUser } from '../../hooks/useUser';
import Button from '../common/Button/Button';
import classes from './UserPanel.module.scss';
import { useSignForm } from '../../hooks/useSignForm';
import { Link } from 'react-router-dom';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { useOffer } from '../../contexts/offerContext';

export const UserPanel = () => {
  const { user } = useUser();
  const { myOffers } = useOffer();
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
        {user && (
          <>
            <Link to="/dict">
              <Button variant="primary">Dictionaries</Button>
            </Link>
            <Link to="/offer/my">
              <Button variant="primary">My offers</Button>
            </Link>
          </>
        )}
      </div>

      <div className={classes.userProfileDetails}>
        <p>
          <span>Registered at:</span> {`${createdAtDate}`}
        </p>
        <p>
          <span>Your active offers:</span> {myOffers.length}
        </p>
        <p>
          <span>Archived offers:</span> {20}
        </p>
      </div>

      <div className={classes.moreActions}>
        <Button
          variant="secondary"
          onClick={handleSignOut}
          classNames={classes.btnSignOut}
        >
          <SvgIcon id="icon-signout" height={24} width={24} color="#5964e0" />
          Sign off
        </Button>
      </div>
    </div>
  );
};

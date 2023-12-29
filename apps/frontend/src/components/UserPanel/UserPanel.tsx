import { useMemo, useEffect, useState } from 'react';
import Button from '../common/Button/Button';
import classes from './UserPanel.module.scss';
import { useSignForm } from '../../hooks/useSignForm';
import { Link } from 'react-router-dom';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { useOffer } from '../../providers/OfferProvider';
import { useUser } from '../../providers/UserProvider';
import { Offer } from '../../types/Offer';

export const UserPanel = () => {
  const { user } = useUser();
  const { myOffers, countOffers, getMyOffers } = useOffer();
  const [archivedOffers, setArchivedOffers] = useState<Offer[]>([]);
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

  useEffect(() => {
    if (!myOffers.length) getMyOffers();
    console.log(myOffers);
    console.log(myOffers.filter((el) => el.archived));
    setArchivedOffers(myOffers.filter((el) => el.archived));
  }, [myOffers]);

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
          <span>Your active offers:</span> {countOffers}
        </p>
        <p>
          <span>Archived offers:</span> {archivedOffers.length}
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

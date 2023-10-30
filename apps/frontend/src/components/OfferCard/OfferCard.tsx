import classes from './OfferCard.module.scss';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { Link } from 'react-router-dom';
import { useDictionaries } from '../../hooks/useDictionaries';

export type OfferCardProps = {
  id: number;
  title: string;
  company: string;
  companyId: number;
  contract: string;
  location: string;
  createdAt: number;
  unremovable: boolean;
  logoFileName: string;
};

const now = Math.floor(new Date().getTime() / 1000);

const getOfferAddedTime = (createdAt: number) => {
  const hoursDiff = Math.abs(now - createdAt) / 3600;
  let suffix = 'h';
  let diff = Math.floor(hoursDiff);

  if (!diff) {
    return 'Recent';
  }

  if (hoursDiff >= 24) {
    diff = Math.floor(hoursDiff / 24);
    suffix = 'd';
  }

  return `${diff}${suffix} ago`;
};

const OfferCard = ({
  id,
  title,
  company,
  companyId,
  location,
  contract,
  createdAt,
  unremovable,
  logoFileName,
}: OfferCardProps) => {
  const { companies } = useDictionaries();
  const companyName = companies.find(
    (company) => company.id === companyId
  )?.name;

  return (
    <div className={classes.offerCard}>
      <Link to={`/offer/${id}`}>
        {unremovable ? (
          <SvgIcon
            id={companyName?.toLocaleLowerCase().trim() ?? ''}
            width={50}
            height={50}
            classNames={classes.companyLogo}
          />
        ) : (
          <img
            src={`/uploads/${logoFileName}`}
            alt="company"
            className={classes.companyLogo}
          />
        )}

        <div className={classes.content}>
          <p>
            <span>{getOfferAddedTime(createdAt)}</span>
            <SvgIcon id="icon-dot" width={4} height={4} />
            <span>{contract}</span>
          </p>
          <div>
            <h3>{title}</h3>
          </div>
          <p>{company}</p>
          <div className={classes.locationBox}>
            <p className={classes.location}>{location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OfferCard;

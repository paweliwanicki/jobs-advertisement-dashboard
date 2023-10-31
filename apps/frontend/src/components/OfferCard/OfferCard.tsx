import classes from './OfferCard.module.scss';
import SvgIcon from '../common/SvgIcon/SvgIcon';
import { Link } from 'react-router-dom';
import { Company } from '../../types/Company';

export type OfferCardProps = {
  id: number;
  title: string;
  company: Company;
  contract: string;
  location: string;
  createdAt: number;
  unremovable: boolean;
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
  location,
  contract,
  createdAt,
}: OfferCardProps) => {
  console.log(company);
  return (
    <div className={classes.offerCard}>
      <Link to={`/offer/${id}`}>
        <img
          src={`/uploads/${
            company?.logoFileName
              ? company?.logoFileName
              : 'company_default_logo.jpeg'
          }`}
          alt="company"
          className={classes.companyLogo}
        />

        <div className={classes.content}>
          <p>
            <span>{getOfferAddedTime(createdAt)}</span>
            <SvgIcon id="icon-dot" width={4} height={4} />
            <span>{contract}</span>
          </p>
          <div>
            <h3>{title}</h3>
          </div>
          <p>{company?.name}</p>
          <div className={classes.locationBox}>
            <p className={classes.location}>{location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OfferCard;

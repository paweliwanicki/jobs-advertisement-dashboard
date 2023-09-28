import classes from "./OfferCard.module.scss";
import testLogo from "../../assets/logos/pod.svg";
import SvgIcon from "../common/SvgIcon/SvgIcon";

export type OfferCardProps = {
  id: number;
  title: string;
  company: string;
  workTime: string;
  country: string;
  createdAt: number;
};

const now = Math.floor(new Date().getTime() / 1000);

const getOfferAddedTime = (createdAt: number) => {
  const hoursDiff = Math.abs(now - createdAt) / 3600;
  let suffix = "h";
  let diff = Math.floor(hoursDiff);

  if (!diff) {
    return "Recent";
  }

  if (hoursDiff >= 24) {
    diff = Math.floor(hoursDiff / 24);
    suffix = "d";
  }

  return `${diff}${suffix} ago`;
};

const OfferCard = ({
  title,
  company,
  country,
  workTime,
  createdAt,
}: OfferCardProps) => {
  const companyLogo = "";
  return (
    <div className={classes.offerCard}>
      {/* <img src={companyLogo} className={classes.companyLogo} alt="company" /> */}
      <img src={testLogo} className={classes.companyLogo} alt="company" />

      <div className={classes.content}>
        <p>
          <span>{getOfferAddedTime(createdAt)}</span>
          <SvgIcon id="icon-dot" width={4} height={4} />
          <span>{workTime}</span>
        </p>
        <h3>{title}</h3>
        <p>{company}</p>
        <p className={classes.country}>{country}</p>
      </div>
    </div>
  );
};

export default OfferCard;

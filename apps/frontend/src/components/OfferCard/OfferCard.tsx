import classes from "./OfferCard.module.scss";
import testLogo from "../../assets/logos/pod.svg";
import SvgIcon from "../common/SvgIcon/SvgIcon";

export type OfferCardProps = {
  id: number;
  title: string;
  company: string;
  workTime: string;
  country: string;
};

const offerAddedTime = (createdAt: number) => {
  return "15h ago";
};

const OfferCard = ({
  title,
  company = "FIRMA",
  country = "United Country",
  workTime,
}: OfferCardProps) => {
  const companyLogo = "";
  return (
    <div className={classes.offerCard}>
      {/* <img src={companyLogo} className={classes.companyLogo} alt="company" /> */}
      <img src={testLogo} className={classes.companyLogo} alt="company" />

      <div className={classes.content}>
        <p>
          <span>{offerAddedTime(22)}</span>
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

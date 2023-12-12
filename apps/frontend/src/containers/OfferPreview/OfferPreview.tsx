import { useParams } from 'react-router-dom';
import classes from './OfferPreview.module.scss';
import Button from '../../components/common/Button/Button';
import { useEffect } from 'react';
import { getOfferAddedTime } from '../../components/OfferCard/OfferCard';
import SvgIcon from '../../components/common/SvgIcon/SvgIcon';
import { useOffer } from '../../contexts/offerContext';

type OfferPreviewProps = {};

const OfferPreview = ({}: OfferPreviewProps) => {
  const { id } = useParams();
  const { fetchOffer, selectedOffer } = useOffer();
  const { company, createdAt, contract, location, title } = selectedOffer ?? {};

  useEffect(() => {
    if (id) {
      fetchOffer(parseInt(id));
    }
  }, [id]);

  const offerDetails = { __html: selectedOffer?.description ?? '' };

  return (
    <div className={classes.offerPreviewContainer}>
      {selectedOffer ? (
        <>
          <section className={classes.offerDetailsSection}>
            <div className={classes.companyInfoBox}>
              <img
                src={`/uploads/${
                  company?.logoFileName
                    ? company?.logoFileName
                    : 'company_default_logo.jpeg'
                }`}
                alt="company"
              />
              <div className={classes.companyInfo}>
                <h3>{company?.name}</h3>
                <a
                  href={company?.website ?? 'www.defaultCompany.test.com'}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {company?.website ?? 'www.defaultCompany.test.com'}
                </a>
              </div>
              <a
                href={company?.website}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button variant="link">Company Site</Button>
              </a>
            </div>

            <div className={classes.offerContent}>
              <div className={classes.offerInfoApplyBox}>
                <div className={classes.offerInfoBox}>
                  <p>
                    <span>{createdAt && getOfferAddedTime(createdAt)}</span>
                    <SvgIcon id="icon-dot" width={4} height={4} />
                    <span>{contract}</span>
                  </p>
                  <div>
                    <h3>{title}</h3>
                  </div>
                  <div className={classes.locationBox}>
                    <p className={classes.location}>{location}</p>
                  </div>
                </div>
                <Button variant="primary">Apply Now</Button>
              </div>
              <section
                className={classes.offerDetails}
                dangerouslySetInnerHTML={offerDetails}
              ></section>
            </div>
          </section>

          <div className={classes.offerFooter}>
            <div className={classes.footerContent}>
              <div>
                <h3>{title}</h3>
                <p>{company?.name}</p>
              </div>
              <Button variant="primary">Apply Now</Button>
            </div>
          </div>
        </>
      ) : (
        <div className={classes.noOfferWarningBox}>
          <SvgIcon id="icon-error" color="black" width={64} height={64} />
          <h3>Offer (id: {id}) not found!</h3>
        </div>
      )}
    </div>
  );
};

export default OfferPreview;

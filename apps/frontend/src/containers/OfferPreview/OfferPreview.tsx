import { useParams } from 'react-router-dom';
import classes from './OfferPreview.module.scss';
import { Offer } from '../../hooks/useOfferEditor';
import Button from '../../components/common/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { HttpMethod } from '../../enums/HttpMethods';
import { useApi } from '../../hooks/useApi';
import { getOfferAddedTime } from '../../components/OfferCard/OfferCard';
import SvgIcon from '../../components/common/SvgIcon/SvgIcon';

type OfferPreviewProps = {};

const OfferPreview = ({}: OfferPreviewProps) => {
  const { id } = useParams();

  const { fetch } = useApi();

  const [offer, setOffer] = useState<Offer | undefined>();

  const { company, createdAt, contract, location, title } = offer ?? {};

  const fetchOffer = useCallback(async (id: number) => {
    const [fetchedOffer, response] = await fetch<Offer>(HttpMethod.GET, {
      path: `/api/offers/${id}`,
    });

    if (response.statusCode !== 404) {
      setOffer(fetchedOffer);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchOffer(parseInt(id));
    }
  }, []);

  console.log(offer);

  const offerDetails = { __html: offer?.description ?? '' };

  return (
    <>
      <div className={classes.offerPreviewContainer}>
        <section className={classes.offerDetailsSection}>
          <div className={classes.companyInfoBox}>
            <img src={`/uploads/${company?.logoFileName}`} alt="company" />
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
      </div>
    </>
  );
};

export default OfferPreview;

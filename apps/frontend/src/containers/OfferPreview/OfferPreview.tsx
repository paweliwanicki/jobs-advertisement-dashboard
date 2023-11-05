import { useParams } from "react-router-dom";
import classes from "./OfferPreview.module.scss";
import { Offer } from "../../hooks/useOfferEditor";
import Button from "../../components/common/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { HttpMethod } from "../../enums/HttpMethods";
import { useApi } from "../../hooks/useApi";

type OfferPreviewProps = {};

const OfferPreview = ({}: OfferPreviewProps) => {
  const { id } = useParams();

  const { fetch } = useApi();

  const [offer, setOffer] = useState<Offer | undefined>();

  const { company } = offer ?? {};

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

  return (
    <div className={classes.offerPreviewContainer}>
      <div className={classes.companyInfoBox}>
        <img src={`/uploads/${company?.logoFileName}`} alt="company" />
        <div className={classes.companyInfo}>
          <h3>{company?.name}</h3>
          <p>{company?.website}</p>
        </div>
        <a href={company?.website} target="_blank" rel="noreferrer noopener">
          <Button variant="link">Company Site</Button>
        </a>
      </div>
    </div>
  );
};

export default OfferPreview;

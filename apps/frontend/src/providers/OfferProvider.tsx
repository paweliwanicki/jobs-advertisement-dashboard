import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { OfferContext } from '../contexts/offerContext';
import { HttpMethod } from '../enums/HttpMethods';
import { Offer } from '../types/Offer';
import { useApi } from '../hooks/useApi';

type OfferProviderProps = {
  children: ReactNode;
};

const OfferProvider = ({ children }: OfferProviderProps) => {
  const { fetch, isFetching } = useApi();

  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [offers, setOffers] = useState<Offer[]>([]);

  const fetchOffers = useCallback(async () => {
    const [fetchedOffers, response] = await fetch<Offer[]>(HttpMethod.GET, {
      path: `/api/offers/`,
    });
    if (response.statusCode === 200) {
      setOffers(fetchedOffers);
    }
  }, [offers]);

  const fetchOffer = useCallback(
    async (id: number) => {
      const [fetchedOffer, response] = await fetch<Offer>(HttpMethod.GET, {
        path: `/api/offers/${id}`,
      });

      if (response.statusCode === 200) {
        setSelectedOffer(fetchedOffer);
      }
    },
    [selectedOffer]
  );

  const contextValue = useMemo(
    () => ({
      selectedOffer,
      offers,
      isFetching,
      fetchOffer,
      fetchOffers,
    }),
    [selectedOffer, offers, isFetching, fetchOffer, fetchOffers]
  );

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <OfferContext.Provider value={contextValue}>
      {children}
    </OfferContext.Provider>
  );
};

export default OfferProvider;

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { OfferContext } from '../contexts/offerContext';
import { HttpMethod } from '../enums/HttpMethods';
import { Offer } from '../types/Offer';
import { useApi } from '../hooks/useApi';
import { useUser } from '../hooks/useUser';
import { useSnackBar } from '../hooks/useSnackBar';

type OfferProviderProps = {
  children: ReactNode;
};

const OfferProvider = ({ children }: OfferProviderProps) => {
  const { fetch, isFetching } = useApi();

  const { handleShowSnackBar } = useSnackBar();

  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [myOffers, setMyOffers] = useState<Offer[]>([]);

  const { user } = useUser();

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

  const removeOffer = useCallback(
    async (id: number) => {
      const [, response] = await fetch<Offer>(HttpMethod.DELETE, {
        path: `/api/offers/${id}`,
      });

      if (response.statusCode === 200) {
        fetchOffers();
        handleShowSnackBar('Offer removed successfully', 'success');
      } else {
        handleShowSnackBar(
          'There was an error when deleting the offer',
          'error'
        );
      }
    },
    [selectedOffer]
  );

  const getMyOffers = useCallback(() => {
    const myOffers = offers?.filter(
      ({ createdBy }: Offer) => user?.id === createdBy
    );
    setMyOffers(myOffers);
  }, [user, offers]);

  const contextValue = useMemo(
    () => ({
      selectedOffer,
      offers,
      myOffers,
      isFetching,
      fetchOffer,
      fetchOffers,
      getMyOffers,
      removeOffer,
    }),
    [
      selectedOffer,
      offers,
      myOffers,
      isFetching,
      fetchOffer,
      fetchOffers,
      removeOffer,
    ]
  );

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    getMyOffers();
  }, [offers]);

  return (
    <OfferContext.Provider value={contextValue}>
      {children}
    </OfferContext.Provider>
  );
};

export default OfferProvider;

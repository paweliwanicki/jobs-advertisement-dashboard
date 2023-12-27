import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OfferContext } from "../contexts/offerContext";
import { HttpMethod } from "../enums/HttpMethods";
import { Offer } from "../types/Offer";
import { RequestOptions, useApi } from "../hooks/useApi";
import { useSnackBar } from "./SnackBarProvider";
import { FiltersValuesType } from "../contexts/filtersContext";

type OfferProviderProps = {
  children: ReactNode;
};

const OfferProvider = ({ children }: OfferProviderProps) => {
  const { fetch, isFetching } = useApi();
  const { handleShowSnackBar } = useSnackBar();

  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [countOffers, setCountOffers] = useState<number>(0);
  const [filteredOffers, setFilteredOffers] = useState<Offer[] | undefined>();
  const [myOffers, setMyOffers] = useState<Offer[]>([]);
  const [filteredMyOffers, setFilteredMyOffers] = useState<
    Offer[] | undefined
  >();

  const fetchOffers = useCallback(async (filters?: FiltersValuesType) => {
    const requestOptions: RequestOptions = {
      path: `/api/offers/all`,
    };
    if (filters) {
      requestOptions.payload = JSON.stringify(filters);
    }
    const [fetchedOffers, response] = await fetch<[Offer[], number]>(
      HttpMethod.POST,
      requestOptions
    );

    if (response.statusCode === 201) {
      const [offers, count] = fetchedOffers;
      setCountOffers(count);
      if (filters) {
        setFilteredOffers(offers);
      } else {
        setOffers(offers);
        setFilteredOffers(undefined);
      }
    }
  }, []);

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
        handleShowSnackBar("Offer removed successfully", "success");
      } else {
        handleShowSnackBar(
          "There was an error when deleting the offer",
          "error"
        );
      }
    },
    [fetchOffers, selectedOffer]
  );

  const getMyOffers = useCallback(async (filters?: FiltersValuesType) => {
    const requestOptions: RequestOptions = {
      path: `/api/offers/my`,
    };
    if (filters) {
      requestOptions.payload = JSON.stringify(filters);
    }
    const [fetchedOffers, response] = await fetch<[Offer[], number]>(
      HttpMethod.POST,
      requestOptions
    );

    if (response.statusCode === 201) {
      const [offers, count] = fetchedOffers;
      setCountOffers(count);
      if (filters) {
        setFilteredMyOffers(offers);
      } else {
        setMyOffers(offers);
        setFilteredMyOffers(undefined);
      }
    }
  }, []);

  const clearFilteredOffers = useCallback(() => {
    filteredOffers && setFilteredOffers(undefined);
    filteredMyOffers && setFilteredMyOffers(undefined);
  }, [filteredOffers, filteredMyOffers]);

  const contextValue = useMemo(
    () => ({
      selectedOffer,
      offers,
      countOffers,
      filteredOffers,
      myOffers,
      filteredMyOffers,
      isFetching,
      fetchOffer,
      fetchOffers,
      getMyOffers,
      removeOffer,
      setFilteredOffers,
      clearFilteredOffers,
    }),
    [
      selectedOffer,
      offers,
      countOffers,
      filteredOffers,
      myOffers,
      filteredMyOffers,
      isFetching,
      fetchOffer,
      fetchOffers,
      getMyOffers,
      removeOffer,
      setFilteredOffers,
      clearFilteredOffers,
    ]
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

export const useOffer = () => useContext(OfferContext);

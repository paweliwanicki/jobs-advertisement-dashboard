import { createContext, useContext } from 'react';
import { Offer } from '../types/Offer';
import { OffersFilters } from '../hooks/useFilters';

type OfferContextType = {
  selectedOffer?: Offer;
  offers: Offer[];
  myOffers: Offer[];
  fetchOffer: (id: number) => void;
  fetchOffers: (filters: OffersFilters) => void;
  removeOffer: (id: number) => void;
  setFilteredOffers: (offers: Offer[]) => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  offers: [],
  myOffers: [],
  fetchOffer: () => undefined,
  fetchOffers: () => undefined,
  removeOffer: () => undefined,
  setFilteredOffers: () => [],
});

export const useOffer = () => useContext(OfferContext);

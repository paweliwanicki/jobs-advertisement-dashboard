import { createContext } from 'react';
import { Offer } from '../types/Offer';
import { FiltersValuesType } from './filtersContext';

type OfferContextType = {
  selectedOffer?: Offer;
  countOffers: number;
  offers: Offer[];
  // filteredOffers: Offer[] | undefined;
  myOffers: Offer[];
  // filteredMyOffers: Offer[] | undefined;
  fetchOffer: (id: number) => void;
  fetchOffers: (filters?: FiltersValuesType) => void;
  getMyOffers: (filters?: FiltersValuesType) => void;
  removeOffer: (id: number) => void;
  // setFilteredOffers: (offers: Offer[]) => void;
  // clearFilteredOffers: () => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  countOffers: 0,
  offers: [],
  // filteredOffers: [],
  myOffers: [],
  // filteredMyOffers: [],
  fetchOffer: () => undefined,
  fetchOffers: () => undefined,
  removeOffer: () => undefined,
  getMyOffers: () => undefined,
  // setFilteredOffers: () => [],
  // clearFilteredOffers: () => undefined,
});

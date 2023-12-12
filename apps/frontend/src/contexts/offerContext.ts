import { createContext, useContext } from 'react';
import { Offer } from '../types/Offer';

type OfferContextType = {
  selectedOffer?: Offer;
  offers: Offer[];
  myOffers: Offer[];
  fetchOffer: (id: number) => void;
  fetchOffers: () => void;
  removeOffer: (id: number) => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  offers: [],
  myOffers: [],
  fetchOffer: () => undefined,
  fetchOffers: () => undefined,
  removeOffer: () => undefined,
});

export const useOffer = () => useContext(OfferContext);

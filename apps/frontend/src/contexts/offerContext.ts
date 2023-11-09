import { createContext } from 'react';
import { Offer } from '../types/Offer';

type OfferContextType = {
  selectedOffer?: Offer;
  offers: Offer[];
  fetchOffer: (id: number) => void;
  fetchOffers: () => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  offers: [],
  fetchOffer: () => undefined,
  fetchOffers: () => undefined,
});

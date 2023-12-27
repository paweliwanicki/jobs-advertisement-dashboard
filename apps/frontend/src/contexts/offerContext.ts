import { createContext } from "react";
import { Offer } from "../types/Offer";
import { FiltersValuesType } from "./filtersContext";

type OfferContextType = {
  selectedOffer?: Offer;
  offers: Offer[];
  countOffers: number;
  filteredOffers: Offer[] | undefined;
  myOffers: Offer[];
  filteredMyOffers: Offer[] | undefined;
  fetchOffer: (id: number) => void;
  fetchOffers: (filters?: FiltersValuesType) => void;
  getMyOffers: (filters?: FiltersValuesType) => void;
  removeOffer: (id: number) => void;
  setFilteredOffers: (offers: Offer[]) => void;
  clearFilteredOffers: () => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  offers: [],
  countOffers: 0,
  filteredOffers: [],
  myOffers: [],
  filteredMyOffers: [],
  fetchOffer: () => undefined,
  fetchOffers: () => undefined,
  removeOffer: () => undefined,
  getMyOffers: () => undefined,
  setFilteredOffers: () => [],
  clearFilteredOffers: () => undefined,
});

import { createContext } from "react";
import { Offer } from "../types/Offer";
import { FiltersValuesType } from "./filtersContext";

type OfferContextType = {
  selectedOffer?: Offer;
  countOffers: number;
  offers: Offer[];
  myOffers: Offer[];
  countMyArchivedOffers: number;
  fetchOffer: (id: number) => void;
  fetchOffers: (filters?: FiltersValuesType) => void;
  fetchMyOffers: (filters?: FiltersValuesType) => void;
  fetchArchivedOffers: (filters?: FiltersValuesType) => void;
  fetchMyArchivedOffers: (filters?: FiltersValuesType) => void;
  removeOffer: (id: number) => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  countOffers: 0,
  offers: [],
  myOffers: [],
  countMyArchivedOffers: 0,
  fetchOffer: () => undefined,
  fetchOffers: () => undefined,
  removeOffer: () => undefined,
  fetchMyOffers: () => undefined,
  fetchArchivedOffers: () => undefined,
  fetchMyArchivedOffers: () => undefined,
});

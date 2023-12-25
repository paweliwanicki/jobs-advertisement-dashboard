import { createContext } from "react";
import { Offer } from "../types/Offer";
import { OffersFiltersValues } from "../providers/FiltersProvider";

type OfferContextType = {
  selectedOffer?: Offer;
  offers: Offer[];
  filteredOffers: Offer[] | undefined;
  myOffers: Offer[];
  filteredMyOffers: Offer[] | undefined;
  fetchOffer: (id: number) => void;
  fetchOffers: (filters?: OffersFiltersValues) => void;
  getMyOffers: (filters?: OffersFiltersValues) => void;
  removeOffer: (id: number) => void;
  setFilteredOffers: (offers: Offer[]) => void;
  clearFilteredOffers: () => void;
};

export const OfferContext = createContext<OfferContextType>({
  selectedOffer: undefined,
  offers: [],
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

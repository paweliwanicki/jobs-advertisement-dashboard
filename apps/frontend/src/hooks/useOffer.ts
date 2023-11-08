import { useContext } from 'react';
import { OfferContext } from '../contexts/offerContext';

export const useOffer = () => useContext(OfferContext);

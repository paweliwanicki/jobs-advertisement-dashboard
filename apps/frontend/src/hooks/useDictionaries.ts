import { useContext } from 'react';
import { DictionaryContext } from '../contexts/dictionaryContext';

export const useDictionaries = () => useContext(DictionaryContext);

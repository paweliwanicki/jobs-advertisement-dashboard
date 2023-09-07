import { createContext } from 'react';
import { User } from '../models/User';

type UserContextType = {
  user: User | undefined;
  changeUser: () => User | undefined;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  changeUser: () => undefined,
});

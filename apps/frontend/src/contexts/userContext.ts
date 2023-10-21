import { createContext } from 'react';
import { User } from '../models/User';

type UserContextType = {
  user?: User;
  changeUser: (user?: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  changeUser: () => undefined,
});

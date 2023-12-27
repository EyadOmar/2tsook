import { ReactNode, createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export interface counteryDataTypes {
  id: number;
  name: string;
  nameArabic: string;
  currency: string;
  currencyArabic: string;
  countryCode: string;
  isActive: boolean;
  countryImage: string | null;
}

type CounteryContextType = {
  currCountery: object;
  toggleCountery: (value: counteryDataTypes) => void;
};

const CounteryContext = createContext<CounteryContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useCounteryContext() {
  const value = useContext(CounteryContext);
  if (value == null) throw Error('Cannot use it outside sidebar provider');
  return value;
}

type CounteryContextProviderProps = {
  children: ReactNode;
};

function CounteryContextProvider({ children }: CounteryContextProviderProps) {
  const [currCountery, setCurrCountery] = useState<counteryDataTypes>(
    (Cookies.get('countery') && JSON.parse(Cookies.get('countery'))) || {
      id: 25,
      name: 'Canada',
      nameArabic: 'كندا',
      currency: 'CAD',
      currencyArabic: 'دولار',
      countryCode: 'CA',
      isActive: true,
      countryImage: null,
    }
  );

  function toggleCountery(countery: counteryDataTypes) {
    setCurrCountery(countery);
    Cookies.set('countery', JSON.stringify(countery));
  }

  return (
    <CounteryContext.Provider value={{ currCountery, toggleCountery }}>
      {children}
    </CounteryContext.Provider>
  );
}

export default CounteryContextProvider;

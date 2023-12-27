import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type CounteryContextType = {
  currCountery: object;
  setCurrCountery: (value: object) => void;
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
  const [currCountery, setCurrCountery] = useState({});

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => setCurrCountery(data));
  }, []);

  return (
    <CounteryContext.Provider value={{ currCountery, setCurrCountery }}>
      {children}
    </CounteryContext.Provider>
  );
}

export default CounteryContextProvider;

import CounteryContextProvider from './Contexts/CounteryContext';
import UserControlls from './layout/UserControlls';

function App() {
  return (
    <CounteryContextProvider>
      <UserControlls />
    </CounteryContextProvider>
  );
}

export default App;

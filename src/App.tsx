import CounteryContextProvider from './Contexts/CounteryContext';
import Nav from './layout/Nav';
import UserControlls from './layout/UserControlls';

function App() {
  return (
    <CounteryContextProvider>
      <UserControlls />
      <Nav />
    </CounteryContextProvider>
  );
}

export default App;

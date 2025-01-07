import { FirebaseProvider } from './contexts/FirebaseContext';
import Login from './components/Login';

function AppContext() {
  return (
    <FirebaseProvider>
      <Login />
    </FirebaseProvider>
  );
}

export default AppContext; 
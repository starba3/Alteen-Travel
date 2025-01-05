import { FirebaseProvider } from './contexts/FirebaseContext';
import Login from './components/Login';

function App() {
  return (
    <FirebaseProvider>
      <Login />
    </FirebaseProvider>
  );
}

export default App; 
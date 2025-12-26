import RouterPage from './Pages/RouterPage';
import * as React from 'react';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <RouterPage />
      </div>
    </AuthProvider>
  );
}

export default App;

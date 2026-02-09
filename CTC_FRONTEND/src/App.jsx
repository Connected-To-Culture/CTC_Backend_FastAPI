import React, { useState } from 'react';
import CustomerHomeScreen from './screens/CustomerHomeScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useCart } from './hooks/useCart';
import { globalStyles } from './styles/globalStyles';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const { user, logout } = useAuth();
  const cart = useCart();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <CustomerHomeScreen />;
      default:
        return <CustomerHomeScreen />;
    }
  };

  return (
    <div style={globalStyles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>CTC Market</h1>
        <nav style={styles.nav}>
          <button style={styles.navButton} onClick={() => setCurrentScreen('home')}>
            Home
          </button>
          {user ? (
            <button style={styles.navButton} onClick={logout}>
              Logout
            </button>
          ) : (
            <button style={styles.navButton} onClick={() => setCurrentScreen('login')}>
              Login
            </button>
          )}
          <span style={styles.cartCount}>Cart: {cart.cartItems.length}</span>
        </nav>
      </header>

      <main style={styles.main}>
        {renderScreen()}
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 CTC Market. Connecting Communities Through Commerce.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const styles = {
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  navButton: {
    backgroundColor: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartCount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.5rem',
    borderRadius: '4px',
  },
  main: {
    flex: 1,
    padding: '2rem',
  },
  footer: {
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #dee2e6',
  },
};

export default App;
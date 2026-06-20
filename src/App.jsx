import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Layout from './components/Layout'
import Home from './components/sections/Home'
import Catalog from './components/sections/Catalog'
import Cart from './components/sections/Cart'
import Orders from './components/sections/Orders'
import Admin from './components/sections/Admin'
import Invoice from './components/sections/Invoice'
import Toast from './components/Toast'
import './index.css'

function AppContent() {
  const { currentSection, toast } = useContext(AppContext);

  const renderSection = () => {
    switch (currentSection) {
      case 'home': return <Home />;
      case 'catalog': return <Catalog />;
      case 'cart': return <Cart />;
      case 'orders': return <Orders />;
      case 'admin': return <Admin />;
      case 'invoice': return <Invoice />;
      default: return <Home />;
    }
  };

  return (
    <Layout>
      {renderSection()}
      <Toast message={toast.message} show={toast.show} />
      <footer className="footer no-print">
        Dibuat sebagai aplikasi React. Data disimpan lokal di browser kamu.
      </footer>
    </Layout>
  );
}

function App() {
  return (
    <AppContent />
  )
}

export default App

import Topbar from './Topbar';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Topbar />
      <main className="container">
        {children}
      </main>
    </div>
  );
}

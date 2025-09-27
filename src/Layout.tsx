import Footer from "./components/Footer"
import Header from "./components/Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <a className="sr-only focus:not-sr-only focus:inline-block p-2" href="#main-content">
        Пропустить к содержимому
      </a>

      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen mb-11">
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
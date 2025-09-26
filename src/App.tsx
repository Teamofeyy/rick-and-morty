import { Route, Routes } from "react-router"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/locations" element={<LocationsPage />} />
        <Route path="/episodes" element={EpisodesPage />} /> */}
      </Routes>
    </Layout>

  )
}

export default App

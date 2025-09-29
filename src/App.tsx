import { Route, Routes } from "react-router"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharachterPage from "./pages/CharacterPage";
import LocationPage from "./pages/LocationPage";
import LocationsPage from "./pages/LocationsPage";
import EpisodesPage from "./pages/EpisodesPage";
import EpisodePage from "./pages/EpisodePage";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="episodes" element={<EpisodesPage />} />
          <Route path="episode/:id" element={<EpisodePage />} />
          <Route path="character/:id" element={<CharachterPage />} />
          <Route path="location/:id" element={<LocationPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>


  )
}

export default App

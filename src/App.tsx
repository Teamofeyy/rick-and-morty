import { Link, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterPage from "./pages/CharacterPage";
import LocationPage from "./pages/LocationPage";
import LocationsPage from "./pages/LocationsPage";
import EpisodesPage from "./pages/EpisodesPage";
import EpisodePage from "./pages/EpisodePage";
import { shouldRetryRequest } from "./api/services";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: shouldRetryRequest,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="episodes" element={<EpisodesPage />} />
          <Route path="episode/:id" element={<EpisodePage />} />
          <Route path="character/:id" element={<CharacterPage />} />
          <Route path="location/:id" element={<LocationPage />} />
          <Route
            path="*"
            element={(
              <div className="container mx-auto py-16 text-center">
                <h1 className="text-3xl mb-4">Page not found</h1>
                <Link className="text-primary-accent underline" to="/">Return to characters</Link>
              </div>
            )}
          />
        </Routes>
      </Layout>
    </QueryClientProvider>
  )
}

export default App

import { Route, Routes } from "react-router"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharachterPage from "./pages/CharachterPage";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="charachter/:id" element={<CharachterPage />} />
          {/* <Route path="/locations" element={<LocationsPage />} />
        <Route path="/episodes" element={EpisodesPage />} /> */}
        </Routes>
      </Layout>
    </QueryClientProvider>


  )
}

export default App

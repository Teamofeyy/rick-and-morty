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
          <Route path="character/:id" element={<CharachterPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>


  )
}

export default App

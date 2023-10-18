// import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
// import SearchParams from "./SearchParams";
// import Details from "./Details";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Test from "./Test";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🌀</h2>
                </div>
              }
            >
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
    </div>
  );
};

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);

export default App;

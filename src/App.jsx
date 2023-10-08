import { createRoot } from "react-dom";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";

// App coponent

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

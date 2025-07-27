import { BrowserRouter, Route, Routes } from "react-router";

import { Layout } from "./pages/main";

function App() {
  return (
    <BrowserRouter basename="user-table-t1">
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

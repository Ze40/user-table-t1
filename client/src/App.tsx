import { BrowserRouter, Route, Routes } from "react-router";

import { Login } from "./pages/auth";
import { Layout, UserTablePage } from "./pages/main";

function App() {
  return (
    <BrowserRouter basename="user-table-t1">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserTablePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

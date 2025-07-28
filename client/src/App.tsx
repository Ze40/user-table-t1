import { BrowserRouter, Route, Routes } from "react-router";

import { Login } from "./pages/auth";
import { EditUserPage, Layout, UserTablePage } from "./pages/main";
import CreateUserPage from "./pages/main/create-user-page";

function App() {
  return (
    <BrowserRouter basename="user-table-t1">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserTablePage />} />
          <Route path="user/create" element={<CreateUserPage />} />
          <Route path="user/edit/:id" element={<EditUserPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

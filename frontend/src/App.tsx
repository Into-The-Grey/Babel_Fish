import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExportImportPage from "./pages/ExportImportPage";
import HomePage from "./pages/HomePage";
import PayloadDetailPage from "./pages/PayloadDetailPage";
import PayloadFormPage from "./pages/PayloadFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payload/:id" element={<PayloadDetailPage />} />
        <Route path="/submit" element={<PayloadFormPage />} />
        <Route path="/admin" element={<ExportImportPage />} />
      </Routes>
    </Router>
  );
}

export default App;

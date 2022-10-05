import "./styles/App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginProvider from "./providers/LoginProvider";
import LoadingPage from "./pages/LoadingPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<LoadingPage></LoadingPage>}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;

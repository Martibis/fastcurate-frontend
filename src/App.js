import "./styles/App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginProvider from "./providers/LoginProvider";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoadingPage = lazy(() => import("./pages/LoadingPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <BrowserRouter>
          <Suspense fallback={<LoadingPage></LoadingPage>}></Suspense>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;

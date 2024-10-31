import { Route, Routes } from "react-router-dom";
import SignInSignUp from "./pages/Login";
import { LoadingContextProvider } from "./context/LoadingContext";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import { UserContextProvider } from "./context/UserContext";
import { MessageContextProvider } from "./context/MessageContext";
import { ModelContextProvider } from "./context/ModelRenderContext";

function App() {
  return (
    <>
      <ModelContextProvider>
        <MessageContextProvider>
          <UserContextProvider>
            <LoadingContextProvider>
              <Routes>
                <Route element={<SignInSignUp />} path="/" index />
                <Route element={<ResetPasswordPage />} path="/reset-password" />
                <Route element={<HomePage />} path="/home" />
              </Routes>
            </LoadingContextProvider>
          </UserContextProvider>
        </MessageContextProvider>
      </ModelContextProvider>
    </>
  );
}

export default App;

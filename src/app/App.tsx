import { useContext } from "react";

import { LocaleContext } from "@context/LocaleContext";
import { ThemeContext } from "@context/ThemeContext";
import { UserProvider } from "@context/UserContext";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "@styles/theme.css";
import Header from "./components/header/Header";
import AppRoutes from "../shared/routes/AppRoutes";

function App() {
  const { theme } = useContext(ThemeContext);
  const { locale, messages } = useContext(LocaleContext);

  return (
    <IntlProvider messages={messages} locale={locale}>
      <BrowserRouter>
        <UserProvider>
          <div className={`app ${theme}`}>
            <div className="container p-4">
              <Header />
              <AppRoutes />
            </div>
          </div>
        </UserProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;

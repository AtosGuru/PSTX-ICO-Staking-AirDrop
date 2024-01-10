import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/Home";
import AirdropPage from "./pages/Airdrop";
import BuySell from "./pages/BuySell";
import Stake from "./pages/Stake";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<AirdropPage />} />
              <Route path="dashboard" element={<></>} />
              <Route path="airdrop" element={<AirdropPage />} />
              <Route path="purchase" element={<BuySell />} />
              <Route path="stake" element={<Stake />} />
              <Route path="marketplace" element={<></>} />
              <Route path="community" element={<></>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;

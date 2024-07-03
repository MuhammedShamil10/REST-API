import { Route, Routes, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorPage from "./routes/errorPage";
import { SideNav } from "./routes/sideNav";
import { Users } from "./container/users";
import { SideNavBar } from "./container/sideNavBar";
import { SingleUser } from "./container/singleUserList";
import { Home } from "./container/home";
import { Login } from "./components/login/login";
import { Location } from "./common/location";

function App() {
  const setToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString as any);
    return userToken?.token;
  };
  const token = getToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Routes>
        <Route path={Location.base} element={<SideNavBar />}>
          <Route path={Location.admin_control} element={<SideNav />}>
            <Route index element={<Users />} />
            <Route path={Location.single_user} element={<SingleUser />} />
          </Route>
          <Route index element={<Home />} />
        </Route>
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
  );
}

export default App;

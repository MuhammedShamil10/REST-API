import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PaginationUserList } from "./components/paginationUserList";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="dev-xwomj844del2gkwu.us.auth0.com"
        clientId="6y8tBoX1Cv1WD0iKFxoVugZSOZWiPFDC"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://dev-xwomj844del2gkwu.us.auth0.com/api/v2/",
          scope: "read:current_user update:current_user_metadata",
        }}
      >
        <PaginationUserList>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PaginationUserList>
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

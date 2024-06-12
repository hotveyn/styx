import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import "./i18n.ts";
import "./index.css";
import LocaleProvider from "./providers/LocaleProvider.tsx";
import { router } from "./routing/routes.tsx";

if (!import.meta.env.VITE_API_URL) {
  console.error("Файл .env не настроен");
}

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    <QueryClientProvider client={queryClinet}>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </QueryClientProvider>
  </>
  // </React.StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import VideoPage from './pages/VideoPage.tsx'
import ContextProvider from './context/ContextProvider.tsx'
import SearchPage from './pages/SearchPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider>
        <App />
      </ContextProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/video/:categoryId/:videoId",
        element: <VideoPage />
      },
      {
        path: "/search",
        element: <SearchPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

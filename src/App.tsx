import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { FeedPage } from '@/pages/FeedPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { RewardsPage } from '@/pages/RewardsPage';
import { MemoryPage } from '@/pages/MemoryPage';
import { RevealPage } from '@/pages/RevealPage';
import { ConfessPage } from '@/pages/ConfessPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: 'rewards',
        element: <RewardsPage />,
      },
      {
        path: 'memory',
        element: <MemoryPage />,
      },
      {
        path: 'reveal',
        element: <RevealPage />,
      },
      {
        path: 'confess',
        element: <ConfessPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;





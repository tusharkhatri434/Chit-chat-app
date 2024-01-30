import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage';
import Chats from './pages/Chats';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage />
  },
  {
    path:'/chats',
    element:<Chats />
  }
])

const App = () => {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
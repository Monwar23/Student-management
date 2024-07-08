import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FirebaseProvider from './firebase/FirebaseProvider.jsx'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>,
)

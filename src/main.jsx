import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import { ReduxStore } from './Components/Redux/ReduxStore.js'
import { RouterProvider } from 'react-router'
import { AllRoutes } from './Components/Routing/Allroutes.jsx'



createRoot(document.getElementById('root')).render(
  
      <Provider store={ReduxStore}>
        <RouterProvider router={AllRoutes}></RouterProvider>
      </Provider>
 
)

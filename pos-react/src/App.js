import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import Items from './Items';
import ItemCategories from './ItemCategories';
import Stocks from './Stocks';
import Orders from './Orders';
import EditOrder from './EditOder';
import LoginPage from './Login';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoutes from './utils/ProtectedRoutes';


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/*Authenticated Routes*/}
          <Route element={<ProtectedRoutes/>}>

            <Route path='/items' element={<Items />} />

            <Route path='/stocks' element={<Stocks/>} />

            <Route path='/itemCategories' element={<ItemCategories />} />

            <Route path='/orders' element={<Orders />} />

            <Route path='/orders/:id/editOrder' element={<EditOrder />} />
            
            <Route path='/' element={<Home />} />

          </Route>

          {/*Unauthenticated Routes*/}
          <Route path = "/login" element={<LoginPage />}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  )

}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListProduct from './components/ListProduct';
import Home from './components/Home/Home';
import SalesScreen from './components/Sales/SalesScreen';
import Navbar from './components/Navbar';
import BasketContextProvider from "./context/basket/BasketContextProvider";

function App() {

  return (
    <BasketContextProvider>

      <Navbar />
      <main className="container">
        <div className="table">

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stock-list" element={<ListProduct />} />
              <Route path="/sales" element={<SalesScreen />} />
            </Routes>
          </BrowserRouter>


        </div>
      </main>
    </BasketContextProvider>

  );
}

export default App;
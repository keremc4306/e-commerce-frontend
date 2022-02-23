import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListProduct from './components/ListProduct';
import Home from './components/Home/Home';
import SalesScreen from './components/Sales/SalesScreen';
import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Navbar/>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
    </div>
  );
}

export default App;
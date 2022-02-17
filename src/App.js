import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListProduct from './components/ListProduct';
import Home from './components/Home/Home';
function App() {

  return (
    <div className="container">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock-list" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
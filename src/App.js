import './App.css';
import ListProduct from './components/ListProduct';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <div className="container">
      <Navbar title="Product List" />
      <hr />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import Analysis from './component/Analysis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SelectCustomers from './component/SelectCustomers';
import allCustomers from './utils/CustomerManager';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SelectCustomers customerList={allCustomers}/>} />
        allCustomers
        {
          Object.keys(allCustomers).map((value, index) => (
            <Route key={index} path={allCustomers[value].url} 
              element={<Analysis customer={allCustomers[value]}/>}/>
          ))
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;

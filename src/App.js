import Analysis from './component/Analysis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GoalImage from "./images/icon_03.png";
import CostIamge from "./images/icon_04.png";
import ClickImage from "./images/icon_05.png";
import ImpImage from "./images/icon_06.png";
import './App.css';

function App() {
  const lina = {
    "청약": GoalImage, 
    "CPA": GoalImage, 
    "광고비": CostIamge,
    "CPC": CostIamge, 
    "노출": ImpImage, 
    "클릭": ClickImage,
  };

  const kbinsurance = {
    "청약": GoalImage, 
    "CPA": GoalImage, 
    "설계": GoalImage, 
    "광고비": CostIamge,
    "CPS": CostIamge,
    "유입": ClickImage,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/carrot' element={<Analysis keywordMenuList={lina}/>}/>
        <Route path='/' element={<Analysis keywordMenuList={kbinsurance}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

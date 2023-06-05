import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Header from './Components/header/Header';
import {store} from './redux/store'
import Homepage  from './Components/Home/homepage';
import { Provider } from 'react-redux';
import Detail from './Components/detailPage/detail';
import TheatrePage from './Components/Theatre/theatrePage';
import Snacks from './Components/snackes/snacks'
import ScreenPage from './Components/screen/screenPage';
import Footersection from './Components/footer/footersection';
import { useSelector } from 'react-redux';
// import {Success} from './Components/success/success';

const Myrouter = () => {

    const {isScreenPageOpen} = useSelector(({screen}) => screen)
    console.log(isScreenPageOpen);

  return (
    <div>
        <BrowserRouter>
      {/* <Header/>  */}
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path='/detail' element={<Detail/>}></Route>
                <Route path='/theatrePage' element={<TheatrePage/>}></Route>
                <Route path='/snacks' element={<Snacks/>}></Route>
                <Route path='/screenPage' element={<ScreenPage/>}></Route>
                <Route path="/header" element={<Header/>}></Route>
            </Routes>
         {/* <Footersection/> */}
        </BrowserRouter>
    </div>
  )
}

const Main =() =>{
    return(
        <Provider store={ store }>
        <Myrouter/>
    </Provider>
    )
}

export default Main




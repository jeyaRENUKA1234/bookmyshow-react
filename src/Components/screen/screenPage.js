import { ArrowBackIos, CloseOutlined} from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './screenPage.scss'
import { seating } from '../../redux/detailSlice';
import { Col, ListGroup, Row } from 'react-bootstrap';
import UpperTooltip from '../Theatre/tooltip/tooltip';
import Tooltip from '@mui/material/Tooltip';



const ScreenPage = () => {
    const {seats} = useSelector(({screen}) => screen)
    const {theatreDetail} = useSelector(({screen}) => screen)
    // console.log(seats);
    console.log(theatreDetail);
    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [label, setLabel] = useState('');
    const [seatWithLabel, setSeatWithLabel] = useState([]);

  const isSeatSelected = (seat, id) => {
    return seatWithLabel?.includes((id + seat));
  };

  useEffect(() =>{
 
let mappedSeats = selectedSeats.map(e => label + e)
console.log(label);
console.log(mappedSeats);
setSeatWithLabel(mappedSeats)

},[selectedSeats, label])

  let NUM_COLS = 14;

  const seatClicked = (seat, seatId) => {
   
    setLabel(seatId)
    seatClick(seat);
 
  }


  
  const seatClick = (seat) => {
    console.log(seat);
    const row = Math.floor((seat - 1) / NUM_COLS);
    const startSeat = row * NUM_COLS + 1;
    let numSelected = 1;
    let bookedSeats = [];
  
    setSelectedSeats([seat]);
  
    for (let i = seat + 1; i <= NUM_COLS * (row + 1) && numSelected < seats; i++) {
      if (!bookedSeats.includes(i)) {
        setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, i]);
        numSelected++;
      } else {
        break;
      }
    }
  
    if (numSelected < seats && seat > startSeat) {
      for (let i = seat - 1; i >= startSeat && numSelected < seats; i--) {
        if (!bookedSeats.includes(i)) {
          setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, i]);
          numSelected++;
        } else {
          break;
        }
      }
    }
  
 console.log(selectedSeats); 
  }


//   console.log(theatreDetail.time);

  const useButton =()=>{
    navigate('/snacks')
    dispatch(seating(seatWithLabel))
  }


  let count=seatWithLabel.length*160
     console.log(count)
    console.log( theatreDetail?.showTimes)

 return (
    <>
      <div className='screen_header'>
        <div className='screen_row'>
            <div className='screen_col left'>
                <div className='back_btn'  onClick={() => navigate(-1)}>
                 <ArrowBackIos fontSize='medium' style={{cursor:'pointer',Color:"white"}}/>
                </div>
                <div className='theatre_content'>
                   <h2 className='name'>{theatreDetail.movie_name} <span className='censor'>UA</span></h2> 
                <p className='td_content'>{theatreDetail.theatre_name} | Today,{theatreDetail.time >= 12
                                    ? ((theatreDetail . time % 12) % 1 === 0
                                    ? (theatreDetail .time % 12 || 12) + ":00"
                                    : Math.floor(theatreDetail.time % 12) +
                                    `:${
                                     ((theatreDetail.time % 12) - Math.floor(theatreDetail.time % 12)) * 60
                                    }`) + " PM" 
                                    : ((theatreDetail.time % 12) % 1 === 0
                                    ? (theatreDetail.time % 12) + ":00"
                                    : Math.floor(theatreDetail.time % 12) +
                                    `:${
                                     ((theatreDetail.time % 12) - Math.floor(theatreDetail.time % 12)) * 60
                                    }`) + " AM" 
                                    }</p>
                </div>
            </div>
            <div className='screen_col right'>
                <div>
            <Button variant="outlined" className='tickets' endIcon={<EditIcon />}>
             {seats} Tickets
            </Button>
            </div>
            <div className='close_btn'>
                <IconButton onClick={() => navigate(-1)}>
                    <CloseOutlined style={{color : '#fff'}}/>
                </IconButton>
            </div>

            </div>
        </div>
      </div>
      <div className='theatre_sec'>
      <div className='theatre_details'>
       
                        <div className='show_row'>
                        {theatreDetail?.showTime?.map((e,i) =>(
                            
                            <div  className={theatreDetail.time === e ? 'showtimes active' : 'showtimes'} 
                            style={new Date().getHours() < e
                                ? {display:"block"}
                                 : {display:"none"}
                                 }
                              
                                 >

                           
                            <span > 
                                   {e >= 12
                                    ? ((e % 12) % 1 === 0
                                    ? (e % 12 || 12) + ":00"
                                    : Math.floor(e % 12) +
                                    `:${
                                     ((e % 12) - Math.floor(e % 12)) * 60
                                    }`) + " PM" 
                                    : ((e % 12) % 1 === 0
                                    ? (e % 12) + ":00"
                                    : Math.floor(e % 12) +
                                    `:${
                                     ((e % 12) - Math.floor(e % 12)) * 60
                                    }`) + " AM" 
                                    }
                                 </span>
                        </div>
                       
                        ))}
                        </div>
                       
                          
              </div>
              </div>

      <section className='seat_layout'>
        <div className='seat_container'>
            <div className='seat_row'>
                <table>
                    
                    <tbody>
                        <tr>
                            <td colSpan={2}>GOLD-Rs160.00</td>
                        </tr>
                        
                        <tr>
                            <td>A</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'A')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'A')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'A')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'A')} data-seat="4">
                                    4
                                </div>
                                
                                <div className={`seat ${isSeatSelected(5, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'A')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'A')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'A')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'A')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'A')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'A')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'A')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'A')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'A') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>B</td>
                            <td>
                            <div className='seat_row'>
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className={`seat ${isSeatSelected(1, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'B')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'B')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'B')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'B')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'B')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'B')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'B')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'B')} data-seat="8">
                                    8
                                </div>
                            
                            
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className={`seat ${isSeatSelected(9, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'B')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'B')} data-seat="10">
                                    10
                                </div>
                                <div className={`seat ${isSeatSelected(11,'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(11,'B')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'B') ? 'selected' : 'available'}`} onClick={() => seatClicked(12, 'B')} data-seat="12">
                                    12
                                </div>
                              
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>C</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'C')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'C')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'C')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'C')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'C')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'C')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'C')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'C')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'C')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'C')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'C')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'C')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'C')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'C') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'C')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>D</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'D')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'D')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'D')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'D')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'D')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'D')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'D')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'D')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'D')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'D')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'D')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'D')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'D')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'D') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'D')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>E</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'E')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'E')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'E')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'E')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'E')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'E')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'E')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'E')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'E')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'E')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'E')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'E')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'E')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'E') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'E')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>F</td>
                            <td>
                            <div className='seat_row'>
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className={`seat ${isSeatSelected(1, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'F')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'F')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'F')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'F')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'F')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'F')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'F')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'F')} data-seat="8">
                                    8
                                </div>
                                 <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className={`seat ${isSeatSelected(9, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'F')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'F')} data-seat="10">
                                    10
                                </div>
                                <div className={`seat ${isSeatSelected(11,'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(11,'F')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'F') ? 'selected' : 'available'}`} onClick={() => seatClicked(12, 'F')} data-seat="12">
                                    12
                                </div>
                              
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>G</td>
                            <td>
                            <div className='seat_row'>
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className={`seat ${isSeatSelected(1, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'G')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'G')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'G')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'G')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'G')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'G')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'G')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'G')} data-seat="8">
                                    8
                                </div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <div className={`seat ${isSeatSelected(9, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'G')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'G')} data-seat="10">
                                    10
                                </div>
                                <div className={`seat ${isSeatSelected(11,'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(11,'G')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'G') ? 'selected' : 'available'}`} onClick={() => seatClicked(12, 'G')} data-seat="12">
                                    12
                                </div>
                              
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>H</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'H')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'H')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'H')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'H')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'H')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'H')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'H')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'H')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'H')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'H')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'H')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'H')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'H')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'H')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>

                        <tr>
                            <td>I</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'I')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'I')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'I')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'I')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'I')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'I')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'I')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'I')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'I')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'I')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'I')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'I')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'I')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'I') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'I')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>

                        <tr>
                            <td>J</td>
                            <td>
                                <div className='seat_row'>
                                <div className={`seat ${isSeatSelected(1, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'J')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'J')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'J')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'J')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'J')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'J')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'J')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'J')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'J')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'J') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'J')} data-seat="10">
                                    10
                                </div>
                               
                                <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                {/* <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div> */}
                                <div className={`seat ${isSeatSelected(11,'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'J')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'J')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'J')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'H') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'J')} data-seat="14">
                                    14
                                </div>
                             </div>
                            </td>
                        </tr>
                                 <div className='seat empty'>&nbsp;</div>
                                <div className='seat empty'>&nbsp;</div>
                                <hr/>
                        <tr>
                         <td classname="price-sect">SILVER-Rs.80.00</td>
                                                 </tr>
                         <tr>
                               
                         <td>A1</td>
                            <td>
                                <div className='seat_row '>
                                <div className={`seat ${isSeatSelected(1, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'A1')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'A1')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'A1')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'A1')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'A1')} data-seat="5">
                                    5
                                </div>
                                <div className= {`seat ${isSeatSelected(6, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'A1')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'A1')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'A1')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'A1')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'A1')} data-seat="10">
                                    10
                                </div>
                                <div className={`seat ${isSeatSelected(11,'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'A1')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'A1')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A1')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A1')} data-seat="14">
                                    14
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A1')} data-seat="15">
                                    15
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'A1') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A1')} data-seat="16">
                                    16
                                </div>
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>A2</td>
                            <td>
                                <div className='seat_row  blocked'>
                                <div className={`seat ${isSeatSelected(1, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'A2')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'A2')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'A2')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'A2')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'A2')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'A2')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'A2')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'A2')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'A2')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'A2')} data-seat="10">
                                    10
                                </div>
                                <div className={`seat ${isSeatSelected(11,'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'A2')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'A2')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A2')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A2')} data-seat="14">
                                    14
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A2')} data-seat="15">
                                    15
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'A2') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A2')} data-seat="16">
                                    16
                                </div>
                             </div>
                            </td>
                        </tr>
                        <tr>
                            <td>A3</td>
                            <td>
                                <div className='seat_row  blocked'>
                                <div className={`seat ${isSeatSelected(1, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(1, 'A3')} data-seat="1">
                                    1
                                </div>
                                <div className={`seat ${isSeatSelected(2, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(2, 'A3')} data-seat="2">
                                    2
                                </div>
                                <div className={`seat ${isSeatSelected(3, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(3, 'A3')} data-seat="3">
                                    3
                                </div>
                                <div className={`seat ${isSeatSelected(4, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(4, 'A3')} data-seat="4">
                                    4
                                </div>
                                <div className={`seat ${isSeatSelected(5, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(5, 'A3')} data-seat="5">
                                    5
                                </div>
                                <div className={`seat ${isSeatSelected(6, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(6, 'A3')} data-seat="6">
                                    6
                                </div>
                                <div className={`seat ${isSeatSelected(7, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(7, 'A3')} data-seat="7">
                                    7
                                </div>
                                <div className={`seat ${isSeatSelected(8, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(8, 'A3')} data-seat="8">
                                    8
                                </div>
                                <div className={`seat ${isSeatSelected(9,'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(9, 'A3')} data-seat="9">
                                    9
                                </div>
                                <div className={`seat ${isSeatSelected(10, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(10, 'A3')} data-seat="10">
                                    10
                                </div>
                                <div className={`seat ${isSeatSelected(11,'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(11, 'A3')} data-seat="11">
                                    11
                                </div>
                                <div className={`seat ${isSeatSelected(12,'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(12,'A3')} data-seat="12">
                                    12
                                </div>
                                <div className={`seat ${isSeatSelected(13, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A3')} data-seat="13">
                                    13
                                </div>
                                <div className={`seat ${isSeatSelected(14, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A3')} data-seat="14">
                                    14
                                </div>
                                <div className={`seat ${isSeatSelected(15, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(13, 'A3')} data-seat="15">
                                    15
                                </div>
                                <div className={`seat ${isSeatSelected(16, 'A3') ? 'selected' : 'available'}`} onClick={() => seatClicked(14, 'A3')} data-seat="16">
                                   16
                                </div>
                             </div>
                            </td>
                        </tr>
                        
                        
                    </tbody>
                </table>
                {/* {seatWithLabel.map(e => <h2>{e}</h2>)} */}
            </div>
            
        </div>
        
      </section>
      <div>
      {/* <VideoLabelIcon style= {{fontSize:60}}/> */}
      <h3 className='class'>

      </h3>
      <h4 className='eyes-class'>All eyes this way please!</h4>
      </div>
      <div className='selects'>
        <CheckBoxOutlineBlankIcon className='firsticon'/><h6 className='letter'>Available</h6>
        <CheckBoxIcon  className='secondicon'/><h6 className='letter'> Selected</h6>
        <CheckBoxOutlineBlankIcon  className='thirdicon'/><h6 className='letter'>Sold</h6>
      </div>
      <div className='pay'>
      {seatWithLabel.length> 0  ? <button className='lastbutton' onClick={useButton}> 
      Pay Rs.{count}.00
        </button>: ''}
      </div>

    </>
  )
}

export default ScreenPage



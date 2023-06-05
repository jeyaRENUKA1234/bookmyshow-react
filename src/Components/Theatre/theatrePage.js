import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './theatre.scss';
import { Col, ListGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UpperTooltip from './tooltip/tooltip';
import Tooltip from '@mui/material/Tooltip';
import { FastfoodOutlined, FiberManualRecord, PhoneIphoneOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Pagination } from '@mui/material';
import { getTheatreDetail, screenPage, screenSeats } from '../../redux/theatreScreenSlice';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/Header';
import Footer from '../footer/footersection'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import First from  "./cuteimage/cycle.png"
import Second from './cuteimage/scooter.png'
import Third from './cuteimage/auto.png'
import Four from './cuteimage/car.png'
import Bus from './cuteimage/van.png'
import Bigcar from './cuteimage/bigcar.png'


const TheatrePage = () => {
    const { detail } = useSelector(({ detail }) => detail);
  console.log(detail);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  
  };

  const dateBuilder = (d, i) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "Septemper",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay() + (i>6 || 6 ? i%6 : i) ];
    let date = d.getDate() + i;
    let month = months[date > 31 ? d.getMonth()+ 1 : d.getMonth()] ;
    // let year = d.getFullYear();
    return `${day}, ${month} ${date}`;
  };


  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [image, setImage] = useState('https://contents.mediadecathlon.com/p2277240/a00a35dea99e3a6e6e0d6200666b8749/p2277240.jpg')


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (tym, theatreName, budget, premium, movieName,showTimes) => {
    setOpen(true);
    dispatch(getTheatreDetail({
        time : tym,
        theatre_name : theatreName,
        movie_name : movieName,
        budgetPrice : budget,
        premiumPrice : premium,
        numberOfSeatSelected : page,
        showTime:showTimes,
    }))

    localStorage.setItem('theatreDetail', JSON.stringify({
        time : tym,
        theatre_name :  theatreName,
        movie_name : movieName,
        budgetPrice : budget,
        premiumPrice : premium,
        numberOfSeatSelected : page,
        showTime:showTimes,

    }))
  };
 

  const handleClose = () => {
    setOpen(false);
  };

const dispatch = useDispatch()
const navigate = useNavigate()
  const handleNavigateScreen = (seat) =>{
   // setOpen(false);
    
    dispatch(screenSeats(page))

    navigate('/screenPage')

    dispatch(screenPage(true))

    localStorage.setItem('screenPageOpen', true)

   
    // localStorage.setItem('seatSelected', JSON.stringify(page))
  }

 
  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  useEffect(() => {
    // swithCase()
    switch(page){
        case 1 :
            setImage(First);
        break;
        case 2:
            setImage(Second);
        break;
        case 3 :
          setImage(Third);
        break;
        case 4 :
            setImage(Four)
        break;
        case 5 :
            setImage(Bigcar)
        break;
        case 6 :
            setImage(Bigcar)
        break;
        case 7 :
            setImage(Bigcar)
        break;
        case 8 :
            setImage(Bus)
        break;
        case 9 :
            setImage(Bus);
        break;
        default :
          setImage(Bus)
    
    }
      
  },[page])


  return (
    <>
    <Header/>
      <div className='header'>
        <div className='title_container'>
            <h1 className='movie_name'>{detail.movie_name}</h1>
            <div className='more_detail'>
                <span className='censor'>UA</span>
                <span className='tags'>
                {detail?.genre?.map(e =>  <span key={e} className='genre_tag'>{e}</span>)}
                </span>
            </div>
        </div>
      </div>
      <div className='filters'>
        <div className='filter_container'>
            <div className='filter_row'>
                <div className='date_picker'>
                <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {[...Array(10)].map((_,idx) => (
           <Tab label={dateBuilder(new Date(), idx)} />
        ))}
     
      </Tabs>
    </Box>
               </div>
            </div>
        </div>
      </div>
      <div className='theatre_sec'>
      <div className='theatre_detail'>
        <ListGroup>
            {detail?.theatres?.map((item,idx) => (
                  <ListGroup.Item key={idx}>
                  <Row>
                      <Col md={5} className='icon-pads'>
                        <p style={{fontSize:15, color:"#000", fontWeight:700,marginRight:50}}><FavoriteBorderIcon className='fav-heart'/> {item.theatre_name} </p>
                         <span style={{color:'#49ba8e', fontSize: 15, paddingRight:20}}><PhoneIphoneOutlined/> Mi-ticket</span>
                         <span style={{color:'orange', fontSize: 15}}><FastfoodOutlined/> Food & Reverage</span>
                      </Col>
                      <Col md={6}>
                        <div className='show_row'>
                        {item?.showTimes?.map((e,i) =>(
                            <Tooltip title={<UpperTooltip/>} placement='top' arrow>
                            <div onClick={() =>handleClickOpen(e, item.theatre_name, item.budgetPrice, item.premiumPrice, detail.movie_name, item.showTimes)} className='showtimes' 
                            style={new Date().getHours() < e
                             ? {display:"block"}
                              : {display:"none"}
                              }
                               >
                        
                         <span>
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
                          <div className='atmos'>4K DOLBY ATMOS</div>  
                            </div>
                            </Tooltip>
                        ))}
                        </div>
                        {item.isCancellable ? (<span style={{fontSize:12, textTransform:'capitalize'}}><FiberManualRecord style={{fontSize: 10, color: "orange"}}/> Cancellation available</span>) : (<span style={{fontSize:12, textTransform:'capitalize'}}><FiberManualRecord style={{fontSize: 10,color: "orange"}}/>Non-Cancellable</span>)}
                      </Col>
                  </Row>
              </ListGroup.Item>
            ))}
           
        </ListGroup>
      </div>
      </div>

      {/* <DialogPage fullScreen={fullScreen} open={open} closeFun={handleClose} handlePageChange={handlePageChange} handleNavigateScreen={handleNavigateScreen} page={page} image={image}/> */}

      <Dialog
      className='res'
        fullScreen={fullScreen}
       
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle textAlign={'center'} id="responsive-dialog-title">
        How Many Seats?
       
        </DialogTitle>
        <DialogContent>
      
            <div className='dialog-content'>
        <div style={{marginBottom: 20}}>  <img  src={image} alt=''/></div>
        <Pagination count={10} page={page} onChange={handlePageChange} color='error' hideNextButton hidePrevButton />
        </div>
        
        </DialogContent>
        <Divider/>
        <DialogActions>
         <div>
            <UpperTooltip/>
         </div>
         <div>
          <Button  variant='contained' style={{backgroundColor:'#f84464', color:'#fff'}} onClick={handleNavigateScreen} >
            Select Seats
          </Button>
        </div>
        </DialogActions>
      </Dialog>
      <Footer/>
    </>
  )
}

export default TheatrePage
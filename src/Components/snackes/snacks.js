import React from 'react'
import './snacks.scss';
// import '../screen/screenPage.scss'
import { ArrowBackIos, CloseOutlined} from '@mui/icons-material'
// import Footersection from './footersection';
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import Image from './back.png'
import  {IconButton} from '@mui/material'
import Icons from './icon.png'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Snacksdetail from '../../snacksdetail'
import Book from '../image/prebook.jpg';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import AdjustIcon from '@mui/icons-material/Adjust';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Navigate, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Snacks = () => {


    const details=useSelector(({allDetail})=> allDetail. SnacksDetails);
    const {seat}=useSelector(({detail}) => detail)
    const {theatreDetail} = useSelector(({screen}) => screen)

    const [open, setOpen] = React.useState(false);
    console.log(open)
    

    const navigate = useNavigate()
    console.log(seat)
    console.log('details',details);

     let count=seat.length*160
     console.log(count)

     var sum=120.00
     let total=count+sum
    console.log(total)

    var slength=seat.length
    console.log(slength)

    var amounttotal=seat.length+total
    console.log(amounttotal)

    // const navigate = useNavigate()
    const finaloutput= () =>{
        setOpen(true);

         }
    const handleClose = () => {
            setOpen(false);
            // setClose(false);
          };
  return (
  <div>
        <div className='scr-section'>
        <div className='screen_row'>
            <div className='na-section'>
            <div className='screen_col left'>
                <div className='back_btn'  onClick={() => navigate(-1)}>
                 <ArrowBackIos fontSize='medium' style={{cursor:'pointer'}}/>
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
            {/* <Button variant="outlined" className='tickets' endIcon={<EditIcon />}>
             {seats} Tickets
            </Button> */}
            </div>
            <div className='close_btn'>
                <IconButton onClick={() => navigate(-1)}>
                    <CloseOutlined style={{color : '#fff'}}/>
                </IconButton>
            </div>
            </div>
        </div>
        </div>
    <div className='snacks-sect'>
        <div className='snacks-container'>
            <div className='snacks-row'>
                <div className='snacks-col1'>
                <div className='snacks-banner'>
                    <img src={Book}/>
                </div>
                <div className='bites'>
                    <div className='fixed'>
                    <div>
                    <h2 className='bite'>Grab a <span>bite!</span></h2>
                    <p className='savemore'>Prebook Your Meal and Save more!</p>
                    </div>
                    <div className='lists'>
                    
                            <ul>
                        <li className='bite-list1'>ALL</li>
                        <li className='bite-list'>COMBOS</li>
                        <li className='bite-list'>POPCORN</li>
                        <li className='bite-list'>SNACKS</li>
                        <li className='bite-list'>DESSET</li>
                        </ul>
                        
                    </div>
                    </div>
                    <div className='sna-container'>
                      <div className='sna-row'>
                        
                      {details.map((value,index)=>{
                        return(
                            <div className="feat1" key={index}>
                            <Card sx={{ maxWidth: 300 }} className='card'>
                                <div  className='image-popcorn'>
                            <CardMedia
                             sx={{ height: 150 }}
                            image={value.image}
                             title="Choose Snackes"
                                />

                                 <div className='popcorn'>
                                    <h2 className='amount'>{value.price}</h2>
                                </div>
                                </div>
      <CardContent  sx={{ height: 120 }}>
        <Typography gutterBottom variant="h5" component="div" className='snacksss'>
            <div>
                <h4 className='snacks-name'>{value.name}</h4>
            <p className='snak-para'>{value.regular}</p>
            <div>
            
                <div className='latco'>
                <Icon icon="mdi:lacto-vegetarian" className='veg-icon'/>
                <h6 className='counting'>ADD</h6>
                </div>
                

            </div>
          </div>
          
        </Typography>
        
        {/* <Typography variant="body2" color="text.secondary">
        
        </Typography> */}
      </CardContent>
    </Card>
            </div>
                    )
                })
            }
        </div>

               </div>
               <div>
           
            <p className='notepara'> Note:<br/>1, Images are for representation purposes only.<br/>2, Prices inclusive of taxes.<br/>3,All nutritional information is indicative, values are per serve as shared by
                 the Cinema and may vary depending on the ingredients and portion size.<br/>
                 4, An average active adult requires 2000 kcal energy per day, however, calorie needs may vary.</p>
        </div>
                </div>
        
                </div>

                {/* <div className='booking-sect'> */}
            <div className='snacks-col2'>
                <div className='tickets-booking'>
                    <div className='order-summary'>
                         <span className='icon-left'></span>
                         <span className='icon-right'></span>
                    </div>
                <h2 className='col2-head'>BOOKING SUMMARY</h2>
                <div className='book'> 
                <div>
                GOLD-
                {seat.map((value,index)=>{
                        return(
                            
                            <span key={index} >
                                <span>{value}, </span>
                                </span>
                             )})
                            }
                <span className='col2-ticket'>({slength} Tickets) </span>
                </div>
                 <div>
                    <p className='col2-amount'>Rs.{count}.00</p>
                    </div>
                    
                </div>
                <p className='col2-screen'>SCREEN 2</p>
                 <div className='col3-amount'> 
                     <div>
                        <p className='conven'>< ReportGmailerrorredIcon className='fees-icon'/>Convenience fees </p>
                    </div> 
                    <div> 
                        <p className='conven'>Rs.120.00</p>
                        </div> 
                     </div>
               
                
                <div className='expand'>
                    <div>
                        <p>Sub total</p>
                    </div>
                    <div>
                        <p>Rs.{total}.00</p>
                    </div>
                </div>
                <div className='col2-book'>
                    <div  className='col2-smile'>
                        <div>
                        <p className='col2-to'><span><MoodBadIcon/></span>Contribution to BookASmile</p>
                        <h6 className='col2-two'>(₹1 per ticket has been added)</h6>
                        <p className='col2-view'>VIEW T&C</p>
                        </div>
                        <div>
                            <p className='col2-to'>Rs.{slength}</p>
                            <h6 className='remove'>Remove</h6>
                        </div>
                     </div>
                     
                <div>
            </div>
            </div>
            <div className='col2-state'>
                <p>Your current state is<span>Tamil Nadu</span></p>
            </div>
                </div>
                <div className='total-amounts'>
                    <h4 className='amo'>Amount Payable</h4>
                    <h4 className='amo'>Rs. {amounttotal}.00</h4>
                </div>
                <div className='col2-ticket'>
                    <h4>SELECT TICKET TYPE</h4>
                    </div>
                    <div className='ticket-icon'>
                    <div>
                        <span className='adjustIcon'><AdjustIcon className='iconcolor'/></span>
                        <span className='adjustIcon'><BookOnlineIcon/>M-Ticket</span>
                    </div>
                    <div>
                        <span className='adjustIcon'><RadioButtonUncheckedIcon/></span>
                        <span className='adjustIcon'><HomeWorkIcon/>Box Office Pickup</span>
                    </div>
                    </div>
                    <div className='col2-show'>
                    <p>Show the m-ticket QR Code on your mobile to enter the cinema.</p>
                    </div>
                    <div className='last-para'>
                    <p><ReportGmailerrorredIcon/></p>
                    <p className='process'>By proceeding, I express my consent to complete this transaction.</p>
                    </div>
                    <div className='button' onClick={finaloutput}> 
                        <div>
                        <h4 className='total'>TOTAL:Rs {amounttotal}.00</h4>
                        </div>
                        <div>
                        <h4 className='total'>Proceed</h4>
                        </div>
                        </div>
                        <Dialog
                        
                         open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title" className='con'>
                             {/* {Image} */}
                        </DialogTitle>
                        <DialogContent className='con' >
                            <DialogContentText id="alert-dialog-description">
                                <div>
                                    <img src={Image} className="backimg"/>
                                </div>
                                <div className='img2'>
                                    <img src={Icons} className="successimg"/>
                                   
                                </div>
                                <h4 className='succ'>successfully confirmed</h4>  
                               
                               
                            </DialogContentText>
        </DialogContent>
        <DialogActions className='con'>
         
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
                   
                    
               

            </div>
            {/* </div> */}
            </div>
        </div>
        {/* <Footersection/> */}
     </div>
     </div>
     </div>

    
)
}
  


export default Snacks

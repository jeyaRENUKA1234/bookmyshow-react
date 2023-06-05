import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router';
import { detailPage } from '../../redux/detailSlice';




const SingleMovie = () => {
  const datas = useSelector(({detail})=>detail)
  console.log(datas);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
     // partialVisibilityGutter: 140
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
     
  const navigate = useNavigate();
     const dispatch = useDispatch()

 const navigateToFullDetails = (value) =>{
     navigate('/detail')
    dispatch(detailPage(value))
    //  localStorage.setItem('movieDetail', JSON.stringify(value))
  }

  return (
    <div className='movies' >
        <Carousel 
        swipeable={true}
        draggable={true}
        responsive={responsive}
        transitionDuration={300}
        keyBoardControl={true}
        partialVisbile={true}
        >
     {datas.detail.map((value, index) => {
        return(
       <div key={index} >   
      <div className='movies-card' onClick={() => navigateToFullDetails(value)} >
       <div className='card_img'>
        <img src={value.imgUrl}  />
       </div>
       <div className='card_content'>
         <div className='movie_name'>{value.movie_name}</div>
         <div className='description'>{value.genre}</div>
       
      </div>
     </div>
     </div>
     )
        })}
     </Carousel>  
    </div>
  )
}

export default SingleMovie

     
    
 













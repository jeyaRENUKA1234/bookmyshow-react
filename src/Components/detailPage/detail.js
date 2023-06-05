import React from "react";
import "./detail.scss";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from '../header/Header'
import Footer from '../footer/footersection';

const Detail = () => {
  const { detail } = useSelector(({ detail }) => detail);
  console.log(detail);
  const navigate = useNavigate()

  return (
    <>
    <Header/>
      <div
        className="detail-sect"
        style={{
          backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%,
                #1A1A1A 38.3%, rgba(26, 26, 26, 0.0409746) 97.47%, #1A1A1A 100%), url(${detail.posterUrl})`,
          backgroundColor: "black",
          padding: "60px 0",
          marginTop: "-10px",
          // backgroundRepeat:"no-repeat",
          backgroundPosition:"right",
        }}
      >
        <div className="detail-container">
          <div className="detail-row">
            {/* <div className="detail-col1"> */}
              <div className="detail-img">
              <img src={detail.imgUrl} alt={detail.movie_name} />
                <div className="trailer_btn">
                <button> <PlayArrow fontSize="small"/> <a style={{textDecoration:'none', color:'white'}} href={`${detail.trailer}`}>Trailer</a></button>
              </div>
            </div>
            {/* </div> */}
            {/* <div className="detail-col2"> */}
            <div className="detail-content">
              <div className="movie_title">{detail.movie_name}</div>
              <div className="votes">
                <span>
                  <StarIcon className="star" />
                </span>
                <span style={{ fontSize: 30 }}>{detail.ratings}/10 </span>
                <span style={{ fontSize: 18 }} className="vote">
                  {detail.votes} votes
                </span>
              </div>
              <div className="votes1">
                <div className="rat">
                  <h5 className="rating">Add your rating & review</h5>
                  <h6 className="rating1">Your ratings matter</h6>
                </div>
                <div>
                  <button className="buttons">Rate now</button>
                </div>
              </div>
              <div className="movie">
                <div className="max">
                  <h6>
                    {detail.projectors?.map(
                      (e,i) => (
                        (
                            <>
                          <a className="show" key={i} href="#top">
                            {e}
                          </a><span>{`, `}</span>
                          </>
                        )
                      
                      )
                    )}

                    {/* <a className='show' href='#top'>4DX,</a>
                                <a className='show' href='#top'>IMAX 2D</a> */}
                  </h6>
                </div>
                <div>
                  <h6 className="langu">
                    {detail.languages?.map(
                      (e, i) => (
                        (
                            <>
                          <a className="style" key={i} href="#top">
                            {e}
                          </a><span>{`, `}</span>
                          </>
                        )
                      )
                    )}

                    {/* <a className='style' href='#top'>Telugu,</a>
                                <a className='style' href='#top'>Hindu,</a>
                                <a className='style' href='#top'>Kannada,</a>
                                <a className='style' href='#top'>Malayalam</a>*/}
                  </h6>
                </div>
              </div>
              <div className="timing">
                <h6>
                  <span className="points">{detail.duration}</span>
                  <span className="dot">  •  </span>
                  {detail?.genre?.map(e =>  <span key={e} className="type">{e},</span> )}
                 
                  {/* <span className="type">Adventure,</span>
                  <span className="type">Drama,</span>
                  <span className="type">Historical</span> */}
                  <span className="dot">  •  </span>
                  <span className="points">UA</span>
                  <span className="dot">  •  </span>
                  <span className="points">{detail.release_date}</span>
                </h6>
              </div>
              <div className="ticket">
                <button 
                className="button" 
                type="button"
                 onClick={() => navigate('/theatrePage')}
                >
                Book Tickets
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      <div className="about-sect">
        <div className="about-container">
          <div className="about-content">
              <h2 className="about-head">About The Movie</h2>
              <p className="about-para">
                {detail.movie_description}
              </p>
          </div>
        </div>
      </div>
     < Footer/>
    </>
  );
};

export default Detail;

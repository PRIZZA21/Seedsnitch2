import React, {useEffect, useState} from 'react'
import "./Carousel.css"
import {useSwipeable} from "react-swipeable"


export const CarouselItem=({children,width})=>{
    return (
      <div className="carousel-item" style={{width:width}}>
        {children}
      </div>
    )
}



export const Carousel = ({children}) => {
  const [activeIndex,setActiveIndex]= useState(0);
  const [paused,setPaused] = useState(false)
  
  const updateIndex = (newIndex)=>{
    if(newIndex<0)
    {
      newIndex = React.Children.count(children)-1;
    } else if(newIndex>= React.Children.count(children))
    {
      newIndex=0;
    }
    setActiveIndex(newIndex);
  }
  
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(!paused){updateIndex(activeIndex+1);}
    },1000);
    return()=>{
      if(interval){
        clearInterval(interval);
      }
    }

  }
  )
  const handlers = useSwipeable({
    onSwipedLeft: ()=> updateIndex(activeIndex+1),
    onSwipedRight: ()=> updateIndex(activeIndex-1)
  });
    

  return (
    <div>
      <div className="carousel"
      {...handlers}
      onMouseEnter={()=>{setPaused(true)}}
      onMouseLeave={()=>{setPaused(false)}}>
        <div className="inner" style={{transform:`translate(-${activeIndex*100}%)`}}>
          {React.Children.map(children,(child,index)=>{
            return React.cloneElement(child,{width:"100%"});
          })}
        </div>
      </div>
      {/* <div className="indicators">
        <button onClick={()=>{
          updateIndex(activeIndex-1);
        }}>
          Prev
        </button>
        <button onClick={()=>{
          updateIndex(activeIndex+1);
        }}>
          Next
        </button>
      </div> */}
    </div>

  )
}



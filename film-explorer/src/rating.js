import { useState } from "react";

const RatingContainerStyle ={
    width:"100%",
    display:"flex",
    alignItem:"center",
    gap:"10px",

} 
export default function Rating({maxRating=5,setGetMyRate}){
    
    const maxRate= Number(maxRating)
    const [rate,setRate] = useState(0);
    const [hoverRate , setHoverRate] = useState(0)
    function HandleRating(ratingnumber){
        setRate(ratingnumber);
        setGetMyRate(ratingnumber);
        
    }
    return(
        <div style={RatingContainerStyle}>
        
            {
            Array.from({length:maxRate},(number,index)=>
                <RatedStar 
            full={hoverRate?hoverRate>=index+1:rate>=index+1} 
            onclick={()=>HandleRating(index+1)} 
            onMouseHover = {()=>setHoverRate(index+1)}
            onMouseOut = {()=>setHoverRate(0)} key={index} 
            height="20px"
            width="20px"
            />
                

            )
            
            } {hoverRate||rate||""}

        </div>
        

    
    )
}
const ratedStayle ={
        display:"flex",
        marginTop:"0.5rem",
        cursor:"pointer"
        
}
function RatedStar({onclick,full,onMouseHover,onMouseOut,height="20px",width="20px"}){
    
    return (
        <span style={{...ratedStayle,height:height,width:width}} onClick={onclick} onMouseEnter={onMouseHover} onMouseLeave={onMouseOut} >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={full?"yellow":"#000"}
            stroke="#fff"
            >
            <path 
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
            </svg>
        </span>
        
    );
}
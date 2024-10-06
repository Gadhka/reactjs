import { useState } from "react";
export default function  showMoreText(){
  return (<TextExpender
    btn_close_name="close my word"
    btn_open_name="open my word"
    limit_word="200"
    color="red"
    isopen = {false}
    >
        Unlock your desires with iwanto!
         🌟 Whether you’re dreaming big 
         or seeking small joys, our platform empowers you 
         to express what you truly want. Connect with like-minded individuals,
          share your aspirations, and inspire each other. Don't wait—embrace your wishes and make them
           a reality with iwanto today! ✨

    </TextExpender>);
}
function TextExpender({children,limit_word= 50 ,btn_open_name = "Open",btn_close_name="close",color="blue",isopen=true}) {
    const [isOpen,setIsOpen] = useState(isopen)
    return (
        <>
        <p style={{fontSize:"26px"}}>{!isOpen?children.slice(0,limit_word) : children}</p>
        <button onClick={()=>setIsOpen(open=>!open)} style={{color:color,padding:"0.5rem 1rem",marginTop:"1rem"}}>{!isOpen ?btn_open_name:btn_close_name}</button>
        </>
        

    );
}
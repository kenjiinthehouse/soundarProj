import React,{useEffect} from 'react';
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket } from "react-icons/md";




function PdComment(props){
    const {pdDetail,SubImg}=props
    // const pdItem1 = pds[1].pd_sub_imgs.split(',')
    // pdItem1.unshift(pds[1].pd_main_pic)
    // pdItem1.unshift(pds[1].pd_main_pic)
    // useEffect(()=>{
    //     if(SubImg){
    //         const newPdItem1 = SubImg.slice(0,Math.floor(Math.random()*3)+1);
    //     }else{
    //         return '';
    //     }
    // },[SunImg])
    let newPdItem1=[]
    if(SubImg){
        newPdItem1=[...SubImg]
        newPdItem1 = newPdItem1.slice(0,Math.floor(Math.random()*3)+1);           
    }else{
        newPdItem1=[]
    }
     
    
 

    return(
    <>
    <div className="d-flex justify-content-between PdComment align-items-center">
        <div className="d-flex align-items-center">
            <div className="text-center commentAvatarPart">
                <div className="commentAvatar mb-2"></div> 
                <div className="commentMember">Josh</div> 
            </div>
        
            <div className="commentContentPart"> 
                <div style={{color:'gold', fontSize:'1rem'}}>
                    <MdStar/><MdStar/><MdStar/><MdStar/><MdStarHalf/>   
                </div>
                <div className="body3 dark">舒適度跟音質超好，
消噪耳罩耳機這款真的非常值得入手。</div>
            </div> 
        </div>
        
        <div className="commentPdPicPart d-flex">
        {newPdItem1.map((item)=>{
              return <div className="commentPdPic mx-1">
                <img src={item} style={{width:"100px",height:"100px"}}/>
            </div>
        })}
            {/* <div className="commentPdPic"></div>
            <div className="commentPdPic"></div>
            <div className="commentPdPic"></div> */}
        </div>
    </div>

 
    </>
    )
}

export default PdComment
import React,{useEffect} from 'react';
import { MdStar,MdStarBorder,MdStarHalf,MdShoppingCart,MdShoppingBasket } from "react-icons/md";




function PdComment(props){
    const {pdDetail,SubImg,pdComment}=props
   

    
    let newPdItem1=[]
    if(SubImg){
        newPdItem1=[...SubImg]
        newPdItem1 = newPdItem1.slice(0,Math.floor(Math.random()*2)+1);           
    }else{
        newPdItem1=[]
    }

    return(
    <>
    <div className="d-flex justify-content-between PdComment align-items-center">
        <div className="d-flex align-items-center">
            <div className="text-center commentAvatarPart">
                <div className="commentAvatar mb-2">
                    <img 
                    src={`/ppicture/${pdComment.avatar_url}`}
                    style={{width:"100%",
                    height:"100%",
                    objectFit:"cover",objectPosition:"center center"}}    
                    />
                </div> 
                <div className="commentMember">{pdComment.user_name}</div> 
            </div>
        
            <div className="commentContentPart"> 
                <div style={{color:'gold', fontSize:'1rem'}}>
                    <MdStar/><MdStar/><MdStar/><MdStar/><MdStarHalf/>   
                </div>
                <div className="body3 dark">{pdComment.content}</div>
            </div> 
        </div>
        
        <div className="commentPdPicPart d-flex">
        {newPdItem1.map((item)=>{
              return <div className="commentPdPic mx-1">
                <img src={item.indexOf('http')=== -1 ? `/reckie_img/${item}`:item} style={{width:"100px",objectFit:"contain"}}/>
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
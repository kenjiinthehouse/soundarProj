import React from 'react';
import PdSideBar2 from '../Pdlist/PdSideBar2';

function PdPicitems(props){
const pds={props}
console.log(pds)
    return(<>
    <h1>Main</h1>
    <img src={pds.pd_main_pic} className=""/>
    <h2>Sub</h2>
    <ul>
       {pds.map((item, index) => {

          return <li>
            <img src={item.sub_pics}/>
          </li>

        })}  
    </ul>
   

    </>)

}
export default PdPicitems
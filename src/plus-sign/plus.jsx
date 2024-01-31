import { useState,useEffect } from 'react';
import './plus.css';
import { FaPlus } from "react-icons/fa6";

function Plus(props) {
  const [ showPlus, setShowPlus]=useState(true);
  // useEffect(() => {
  //   if (props.accountsNumber === 4) {
  //     setShowPlus(false);
  //   } else {
  //     setShowPlus(true);
  //   }
  // }, [props.accountsNumber]);

  return (
    <div className='accounts-bottom-div'>
      <div className={`plus-div ${showPlus ? '': 'hidden'}`} onClick={props.openCreateModal}>
        <p className='plus-sign'><FaPlus/></p>
      </div>
      <p className={`max-text ${showPlus ? 'hidden': ''}`}>You reached the maximum accounts number</p>
    </div>
    
  );
}

export default Plus;

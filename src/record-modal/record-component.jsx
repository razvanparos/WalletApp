import { useState } from 'react';
import './record-component.css';


function RecordComponent(props) {

  function handleRemoveRecord(){
    props.removeRecord(props.value,props.id);
  }

  return (
    <div className='record-component-div'>
      <div className='record-component-content'>
        <p>{props.title}</p> 
        <p>{`${props.value}`}</p> 
        <p>{props.type}</p>
      </div>
      <button className='record-remove-btn' onClick={handleRemoveRecord}>Remove</button>
       
    </div>
  );
}

export default RecordComponent;

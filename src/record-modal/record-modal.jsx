import { useState,useEffect } from 'react';
import './record-modal.css';


function RecordModal(props) {
    const [isOpen, setIsOpen] = useState(props.recordModalStatus)
    const [newRecordTitle, setNewRecordTitle] = useState("")
    const [newRecordValue, setNewRecordValue] = useState("")
    const [newRecordType, setNewRecordType] = useState('Expense')

    useEffect(() => {
        setIsOpen(props.recordModalStatus);
}, [props.recordModalStatus]);
    
function closeRecordModal(){
    setNewRecordTitle('')
    setNewRecordValue('')
    setNewRecordType('Expense')
    props.closeRecordModalFunction()
    const buttonsDiv = document.querySelector('.delete-buttons-div');
    const buttons = buttonsDiv.querySelectorAll('button');
    buttons.forEach(button => {
    button.style.transition = 'none'; 
    });
    document.body.style.overflowY = 'scroll';
}
function handleConfirmButton(){
    if(newRecordTitle && newRecordValue){
        if(newRecordValue>999999999999){
            alert('Value too big')
            return;
        }
        if(newRecordTitle.length>100){
            alert('Name too big')
            return;
        }
        if(newRecordType==='Expense'){
            props.addRecord(newRecordTitle,-newRecordValue,newRecordType);
        }else props.addRecord(newRecordTitle,newRecordValue,newRecordType);
       
       closeRecordModal(); 
    }else {
        alert('Please complete all fields')
        return;
    }
   
   
}

function handleChangeRecordTitle(e){
    setNewRecordTitle(e.target.value)
}
function handleChangeRecordValue(e){
    setNewRecordValue(parseFloat(e.target.value))
}
function handleExpenseClick(){
    setNewRecordType('Expense')
}
function handleIncomeClick(){
    setNewRecordType('Income')
}


  return (
    <div className={`record-modal-div ${ isOpen ? '' : 'hidden'}`}>
       <div className={`record-dialog ${ isOpen ? 'record-dialog-down' : 'record-dialog-up'}`}>
            <p className='record-modal-title'>Add new record to account "{props.accountName}" <span className='record-name'>{props.deleteName}</span></p>
            <div className='create-inputs-div'>
                <label htmlFor="">Title</label>
                <input type="text" onChange={handleChangeRecordTitle} value={newRecordTitle}/>
                <label htmlFor="">{`Value(${props.recordSymbol})`}</label>
                <input type="number" onChange={handleChangeRecordValue} value={newRecordValue}/>
                <label htmlFor="">Record Type</label>
                <div className='type-buttons'>
                    <button className={`${newRecordType==='Expense' ? 'active':''}`} onClick={handleExpenseClick}>Expense</button>
                    <button className={`${newRecordType==='Income' ? 'active':''}`} onClick={handleIncomeClick}>Income</button>
                </div>
                
            </div>
            <div className='record-buttons-div'>
                <button onClick={closeRecordModal}>Cancel</button>
                <button onClick={handleConfirmButton}>Confirm</button>
            </div>
        </div>
    </div>
  );
}

export default RecordModal;

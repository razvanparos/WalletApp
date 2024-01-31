import { useState } from 'react';
import Chart from '../data-chart/chart';
import './net-worth.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";


function NetWorth(props) {
    const [totalCurrency,setTotalCurrency] = useState('RON')
    const [totalSymbol,setTotalSymbol] = useState('RON')
    function handleChangeTotalCurrency(e){
        setTotalCurrency(e.target.value)
        if(e.target.value==='RON'){
            setTotalSymbol('RON')
        }
        if(e.target.value==='EURO'){
            setTotalSymbol('€')
        }
        if(e.target.value==='USD'){
            setTotalSymbol('$')
        }
        if(e.target.value==='YEN'){
            setTotalSymbol('¥')
        }
    }
    var totalBalanceRONtoEURO = props.totalBalanceRON*0.2;
    var totalBalanceRONtoUSD = props.totalBalanceRON*0.22;
    var totalBalanceRONtoYEN = props.totalBalanceRON*1.55;
    var totalBalanceRONtoRON = props.totalBalanceRON*1;

    var totalBalanceEUROtoRON = props.totalBalanceEURO*4.98;
    var totalBalanceEUROtoUSD = props.totalBalanceEURO*1.09;
    var totalBalanceEUROtoYEN = props.totalBalanceEURO*7.71;
    var totalBalanceEUROtoEURO = props.totalBalanceEURO*1;

    var totalBalanceUSDtoRON = props.totalBalanceUSD*4.58;
    var totalBalanceUSDtoEURO = props.totalBalanceUSD*0.92;
    var totalBalanceUSDtoYEN = props.totalBalanceUSD*7.1;
    var totalBalanceUSDtoUSD = props.totalBalanceUSD*1;

    var totalBalanceYENtoRON = props.totalBalanceYEN*0.65;
    var totalBalanceYENtoEURO = props.totalBalanceYEN*0.13;
    var totalBalanceYENtoUSD = props.totalBalanceYEN*0.14;
    var totalBalanceYENtoYEN = props.totalBalanceYEN*1;

    const variableMapping = {
        'totalBalanceRONtoRON': totalBalanceRONtoRON,
        'totalBalanceRONtoEURO': totalBalanceRONtoEURO,
        'totalBalanceRONtoUSD': totalBalanceRONtoUSD,
        'totalBalanceRONtoYEN': totalBalanceRONtoYEN,
        'totalBalanceEUROtoRON': totalBalanceEUROtoRON,
        'totalBalanceEUROtoEURO': totalBalanceEUROtoEURO,
        'totalBalanceEUROtoUSD': totalBalanceEUROtoUSD,
        'totalBalanceEUROtoYEN': totalBalanceEUROtoYEN,
        'totalBalanceUSDtoRON': totalBalanceUSDtoRON,
        'totalBalanceUSDtoEURO': totalBalanceUSDtoEURO,
        'totalBalanceUSDtoUSD': totalBalanceUSDtoUSD,
        'totalBalanceUSDtoYEN': totalBalanceUSDtoYEN,
        'totalBalanceYENtoRON': totalBalanceYENtoRON,
        'totalBalanceYENtoEURO': totalBalanceYENtoEURO,
        'totalBalanceYENtoUSD': totalBalanceYENtoUSD,
        'totalBalanceYENtoYEN': totalBalanceYENtoYEN,
      };

    var totalTotalBalance =  variableMapping[`totalBalanceRONto${totalCurrency}`]+
    variableMapping[`totalBalanceEUROto${totalCurrency}`]+
    variableMapping[`totalBalanceUSDto${totalCurrency}`]+
    variableMapping[`totalBalanceYENto${totalCurrency}`];
    
    let formattedTotalBalance = totalTotalBalance
    ? totalTotalBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    : "0";
    let totalTotalBalanceInRON=variableMapping[`totalBalanceRONtoRON`]+
    variableMapping[`totalBalanceEUROtoRON`]+
    variableMapping[`totalBalanceUSDtoRON`]+
    variableMapping[`totalBalanceYENtoRON`];
  return (
    <div className='net-worth-div'>
        <div className='currencies-list'>
            <div className='currencies-individual'>
                <p className='flex'>{`RON ${props.totalBalanceRON}`} <span className="fi fi-ro"></span></p>
                <p className='flex'>{`€${props.totalBalanceEURO}`} <span className="fi fi-eu"></span></p>
                <p className='flex'>{`$${props.totalBalanceUSD}`} <span className="fi fi-us"></span></p>
                <p className='flex'>{`¥${props.totalBalanceYEN}`} <span className="fi fi-cn"></span></p> 
            </div>
            
            <div>
                <p className='net-total'>{`TOTAL(${totalCurrency}) ${totalSymbol}${formattedTotalBalance}`}</p>
            </div>
            <div>
                <select name="total-currency" id="" onChange={handleChangeTotalCurrency}>
                    <option value="RON">RON</option>
                    <option value="EURO">€</option>
                    <option value="USD">$</option>
                    <option value="YEN">¥</option>
                </select>
            </div>
        </div>
        
        <Chart totalTotalBalance={totalTotalBalanceInRON} symbol={totalSymbol}/>
    </div>
    
  );
}
export default NetWorth;

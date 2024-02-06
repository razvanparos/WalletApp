import React, { useEffect, useState } from "react";
import './chart.css';
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip} from "recharts";



function Chart(props) {
  const [chartData, setChartData] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem('chartData')){
  }else {
    setDefaultData();
  }
  },[])
  
  const options = { day: '2-digit', month: 'short' };
  const locale = 'eu-Eu';
  let currentDate= new Date();
  let tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate()+1);

  let day7= new Date();
  day7.setDate(currentDate.getDate()-1);
  let day6= new Date();
  day6.setDate(currentDate.getDate()-2);
  let day5= new Date();
  day5.setDate(currentDate.getDate()-3);
  let day4= new Date();
  day4.setDate(currentDate.getDate()-4);
  let day3= new Date();
  day3.setDate(currentDate.getDate()-5);
  let day2= new Date();
  day2.setDate(currentDate.getDate()-6);
  let day1= new Date();
  day1.setDate(currentDate.getDate()-7);
  let defaultData=[
    {name:day1.toLocaleString(locale,options),pv:0},
    {name:day2.toLocaleString(locale,options),pv:0},
    {name:day3.toLocaleString(locale,options),pv:0},
    {name:day4.toLocaleString(locale,options),pv:0},
    {name:day5.toLocaleString(locale,options),pv:0},
    {name:day6.toLocaleString(locale,options),pv:0},
    {name:day7.toLocaleString(locale,options),pv:0},
    {name:currentDate.toLocaleString(locale,options),pv:0},]

 function setDefaultData(){
  setChartData(defaultData);
  localStorage.setItem('chartData',JSON.stringify(defaultData))
  return defaultData
 }
 function setLastestPv(p){
  let getStoredData = JSON.parse(localStorage.getItem('chartData'));
  getStoredData[7].pv=p;
  localStorage.setItem('chartData',JSON.stringify(getStoredData))
  setChartData(getStoredData)
 }
 function checkNextDay(){
  let getStoredData = JSON.parse(localStorage.getItem('chartData'));
  let lastDate=getStoredData[7].name;
  const currentYear = new Date().getFullYear();
  const dateStringWithYear = `${lastDate} ${currentYear}`;
  const formattedDate = new Date(dateStringWithYear);

  let timeDifference=currentDate.getTime()-formattedDate.getTime();
  let daysDifference = parseInt(timeDifference / (1000 * 60 * 60 * 24));
  // console.log(daysDifference);

  if(daysDifference>0){
    let oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    console.log('e alta zi si au trecut',daysDifference);
    for(let i = 0;i<daysDifference;i++){
      let formattedDateTime = formattedDate.getTime();
      let nextDayTime = formattedDateTime + oneDayInMilliseconds+i*oneDayInMilliseconds;
      let nextDay = new Date(nextDayTime);
      let nextDayValue=getStoredData[7].pv;

      getStoredData.shift();
      getStoredData.push({name:nextDay.toLocaleString('eu-EU',options),pv:nextDayValue})
      
      
    }
    setLastestPv(props.totalTotalBalance);
      localStorage.setItem('chartData',JSON.stringify(getStoredData))
      setChartData(getStoredData);
    
    
  } else console.log('nu e alta zi')
 }

useEffect(()=>{
  checkNextDay();
},[])

useEffect(()=>{
  setLastestPv(props.totalTotalBalance);
},[props.totalTotalBalance])


      function CustomTooltip({ payload, label, active }) {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label} : RON ${payload[0].value}`}</p>
            </div>
          );
        }
      
        return null;
      }
      

  return (
    <div className="chart-div">
    
    <AreaChart className="chart-desktop"
      width={1000}
      height={300}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="0 1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />}/>
      <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884c1" />
    </AreaChart>
    

   </div>  
  );
}

export default Chart;

import React, { useState } from 'react';

const DigitalClock =()=>
{
    let newTime = new Date().toLocaleTimeString();
    const [currTime, setcurrTime]=useState(newTime);
    const Update =()=>
    {
        newTime = new Date().toLocaleTimeString();
        setcurrTime(newTime);
    }
    setInterval(Update,1000);
    return(
        <>
        <div className="btm">
            <h3>Time: {currTime}</h3>
        </div>
        </>
    );
}

export default DigitalClock;
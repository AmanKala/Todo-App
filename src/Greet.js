import React from 'react';

function Greet(){
    let hour= new Date().getHours();
    let greet="";
    const styling={};

    if(hour>=1 && hour<12)
    {
        greet="Good Morning";
        styling.color="Orange";
    }
    else if(hour>=12 && hour<16)
    {
        greet="Good Afternoon";
        styling.color="orange";
    }
    else
    {
        greet="Good Evening";
        styling.color="#d3ca4a";
    }
    return(
        <div className="greeting">
            <h1>Hello!<span style={styling}> {greet}! </span></h1>
        </div>
    );
}

export default Greet;
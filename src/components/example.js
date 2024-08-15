import React, { useEffect } from 'react';

const Example = (props) => {
    
    useEffect(()=>{
        console.log("Example render");

        return () => {
            console.log("Example unmounting !!!");
        };
    },[]);

    // console.log("Props là:",props);
    return (
        <div>
            <h1>Đây là example</h1>
        </div>
    );
};

export default Example;

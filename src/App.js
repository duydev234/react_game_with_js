// import logo from './logo.svg';
import './App.css';
// import React from 'react'
// import Home from './pages/Home'
import { useEffect,useState } from "react";
import Example from './components/example'; // Update the import statement

function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const updateCount = () => {
    setCount(count + 1);
  };

  const updateShow = () => {
    setShow(!show);
  };

  useEffect(()=>{
    console.log("App runnnn");
  },[count])

  // console.log("Hello");
  return (
    <div>
      {/* <Example a="1" b= {2} c={[1,2,3]}/> */}
      {show && <Example/>}
      <h1>Count là {count}</h1>
      <h1>Show là {show.toString()}</h1>
      <button onClick={updateCount}>Tăng count lên 1</button>
      <button onClick={updateShow}>Thay đổi giá trị show</button>
    </div>
  );
}

export default App;

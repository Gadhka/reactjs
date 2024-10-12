import { useState,useEffect } from "react";
export default function App() {
  const [fromCurrency,setFromCurrency] =  useState("USD");
  const [fromCurrency1,setFromCurrency1] = useState("EUR");
  const [Result, setResult] = useState("");
  const [amount,setAmount] = useState(1);
  useEffect(function(){
    const abortCantrol = new AbortController();
    async function calculateMyCurrnecy(){
      
      try {
        const resp = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${fromCurrency1}`,{"signal":abortCantrol.signal});
        if (!resp.ok) throw new Error("please check youre internet");
        const data = await resp.json();
        if (data.message==="not found") throw new Error("we canot calculate it");
        setResult(data["rates"][fromCurrency1]);
      }catch(error){
        console.log(error.message);
        setResult();
      }
      
      
    }
    if ( Number(amount) === NaN | amount===0){
      setResult();
      console.log("number is important");
      return;
    }
    calculateMyCurrnecy();
    return function() {
      return abortCantrol.abort();
    }

  },[amount,fromCurrency,fromCurrency1])
  return (
    <div className="container">
      <h1 style={{color:"white",textTransform:"capitalize"}}>currency converter using reactjs</h1>
      <div >
        <div className="header">
          <input type="number" placeholder="calculate currency" value={amount} onChange={e=>setAmount(ele=>e.target.value)}/>
          <select value={fromCurrency} onChange={e=>setFromCurrency(el=>e.target.value)}>
            <option value="EUR" key="EUR">EUR</option>
            <option value="USD" key="USD">USD</option>
            <option value="CAD" key="CAD">CAD</option>
            <option value="INR" key="INR">INR</option>
          </select>
          <select value={fromCurrency1} onChange={e=>setFromCurrency1(el=>e.target.value)}>
            <option value="EUR" key="EUR">EUR</option>
            <option value="USD" key="USD">USD</option>
            <option value="CAD" key="CAD">CAD</option>
            <option value="INR" key="INR">INR</option>
          </select>
          <h2 className="block">
            {Result && Result !==0 && fromCurrency1 && `${fromCurrency1} == ${Result}`}
            {!Result &&fromCurrency!==fromCurrency1 && "Loading..."}
            {fromCurrency1===fromCurrency && "you have problem you choose same currency"}
          </h2>
  
        </div>
        <div className="result">
          
        </div>

      </div>
    </div>
  );
}


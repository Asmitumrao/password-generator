import { useCallback, useState,useEffect,useRef} from 'react'
// import React from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(6);
  const [uppercase, setUppercase] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState();
  const passwordRef = useRef(null);




  const generatePassword = useCallback(() => {

    let charset = 'abcdefghijklmnopqrstuvwxyz';

    if(uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(symbols) charset += '!@#$%^&*()_+';

    let generated_password = '';
    for(let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated_password += charset[randomIndex];
    }
    setPassword(generated_password);

  }, [length, uppercase, symbols,setPassword]);

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(passwordRef.current.innerText);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length,uppercase,symbols,generatePassword]);

  return (
    <div className='password-generator'>
      <h1>Password Generator</h1>
      <div>
        <div className="password" >
          <p ref={passwordRef}>
            {password}
          </p>
          <button onClick={copyToClipboard}>
            Copy
          </button>
          </div>
        <div className='form-control'>
          <div className='controls'>
            <label htmlFor="length">Length :{length}</label>
            <input type="range" name='length' min={6} max={20} value={length} onChange={(e) => setLength(Number(e.target.value))}/>
          </div>
         
          <div className='controls'>
            <label htmlFor="uppercase" >Uppercase</label>
            <input type="checkbox" name='uppercase' onClick={()=>{setUppercase(!uppercase)}}/>
          </div>

          <div className='controls'>
            <label htmlFor="symbols">Special Symbols</label>
            <input type="checkbox" name='symbols' onClick={()=>{setSymbols(!symbols)}}/>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default App
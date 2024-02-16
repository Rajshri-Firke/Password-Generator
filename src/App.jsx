import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*~+=[]{}`"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

      setPassword(pass)
    }
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='custom-div'>
        <h1 style={{color:"white"}}>Password Generator</h1>
        <div className='input'>
          <input type='text'
           value={password}
           placeholder='Password'
           readOnly
           ref={passwordRef}
           className='custom-input-2'
          ></input>
          <button onClick={copyPasswordToClipboard} className='custom-button'>Copy</button>
        </div>
        <div className='custom-input'>
          <div className='custom-input-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) =>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='custom-input-1'>
              <input
                type='checkbox'
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() =>{
                  setNumberAllowed((prev) => ! prev);
                }}
              />
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='custom-input-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() =>{
                setCharAllowed((prev) => ! prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
      

    </>
  )
}

export default App

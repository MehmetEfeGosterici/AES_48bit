import React, { useState } from 'react'
import axios from 'axios'
import icon from "./assets/AES48.png"
import {AiOutlineCopy} from "react-icons/ai"
import "./App.css"
import { toast } from 'https://cdn.skypack.dev/wc-toast';

function App() {

  const[response,setResponse] = useState("");
  const[encryption,setEncryption] = useState("")

  async function Encrypt(){
    let refactor = encryption.toUpperCase()
                        .replace("Ş","S")
                        .replace("Ç","C")
                        .replace("Ö","O")
                        .replace("Ğ","G")
                        .replace("Ü","U")
                        .replace("İ","I")

     console.log(refactor);
    let apicall = await axios.post("http://localhost:5000/encrypt",{
        plainText: refactor
    })
    setResponse(apicall.data)
  }

  return <>
  <wc-toast position="top-right">
  </wc-toast>    
    <div style={{ display:"flex",backgroundColor:"#1f1f1f",alignItems:'center',justifyContent:'center',height:"15vh"}}>
      <div style={{display:"flex",flexDirection:"row",width:"95%",position:"relative",}}>
        <img alt='icon' style={{width:"120px",height:"62px",padding:"20px 40px",position:"absolute",bottom:"-30px"}} src={icon} />
        <h1 style={{ display:"flex",alignSelf:"center",margin:"auto",fontSize:36,}}>AES 48-bit Encryption</h1>
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"row",height:"85vh"}}>
    <div style={{display:"flex",flexDirection:"column",alignItems:'center',height:"100%",width:"100%",}}>
      <h2>Plain Text Encryption</h2>
      <div style={{display:"flex",flexDirection:"column",alignItems:'center',width:"100%",position:'relative'}}>
        <textarea style={{resize:"none",width:"80%",borderRadius:15,padding:10,backgroundColor:"#1f1f1f",color:"#e7e7e7",}} placeholder="Enter your plain text to be encrypted here..." rows={15} value={encryption} onChange={(e)=>setEncryption(e.target.value)} ></textarea>
        <span style={{position:"absolute",right:"10%",top:10,}} onClick={()=>{
          toast.success("Copied to clipboard",{theme:{type:"dark"}})
          navigator.clipboard.writeText(encryption)}}
          ><AiOutlineCopy size={25}/></span>
      </div>
        {/*<input className='button' style={{padding:"10px 20px",borderRadius:10,border:"none",}} type="button" value={'Key Size'}/>*/}
        <input className='button' style={{padding:"10px 20px",borderRadius:10,border:"none"}} type="button" value='Encrypt' onClick={()=>Encrypt()}/>
    </div>



    <div style={{display:"flex",flexDirection:"column",alignItems:'center',height:"100%",width:"100%",position:'relative'}}>
      <h2>Cipher Text Decryption</h2>
      <div style={{display:"flex",flexDirection:"column",alignItems:'center',width:"100%",position:'relative'}}>
        <textarea style={{resize:"none",width:"80%",borderRadius:15,padding:10,backgroundColor:"#1f1f1f",color:"#e7e7e7",}} placeholder="Enter your cipher text to be decrypted here..." rows={15} ></textarea>
        <span style={{position:"absolute",right:"10%",top:10,}} ><AiOutlineCopy size={25}/></span>
      </div>
        {/*<input className='button' style={{padding:"10px 20px",borderRadius:10,border:"none"}} type="button" value={'Key Size'}/>*/}
        <input className='button' style={{padding:"10px 20px",borderRadius:10,border:"none"}} type="button" value='Decrypt'/>
      <div style={{display:"flex",flexDirection:"row"}}>
        <h1 style={{color:"white"}}>{response}</h1>
      </div>
    </div>
    </div>
  </>
}

export default App
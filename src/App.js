import React, { useEffect, useState } from 'react'
import axios from 'axios'
import icon from "./assets/AES48.png"
import { AiOutlineCopy } from "react-icons/ai"
import "./App.css"
import { toast } from 'https://cdn.skypack.dev/wc-toast';
import {AiOutlinePlusCircle} from "react-icons/ai"

function App() {

  const [response, setResponse] = useState("");
  const [encryption, setEncryption] = useState("")
  const [keys, setKeys] = useState([])
  const [firstBlock, setFirstBlock] = useState([])
  const [afterSubBytes, setAfterSubBytes] = useState([])
  const [afterShiftRows, setAfterShiftRows] = useState([])
  const [afterMixColumns, setAfterMixColumns] = useState([])

  async function Encrypt() {
    let refactor = encryption.toUpperCase()
      .replace("Ş", "S")
      .replace("Ç", "C")
      .replace("Ö", "O")
      .replace("Ğ", "G")
      .replace("Ü", "U")
      .replace("İ", "I")

    console.log(refactor);
    let apicall = await axios.post("http://localhost:5000/encrypt", {
      plainText: refactor
    })
    setResponse(apicall.data.encryptedMessage)
    setFirstBlock([])
    setAfterSubBytes([])
    setAfterShiftRows([])
    setAfterMixColumns([])
    // setFirstBlock(apicall.data.startofRound)
    // setAfterSubBytes(apicall.data.SubBytes)
    // setAfterShiftRows(apicall.data.ShiftRows)
    // setAfterMixColumns(apicall.data.MixColumns)

    setKeys(apicall.data.keys)

    apicall.data.startofRound.map((block) => {
      var rowarray = []
      block.map((row) => {
        row.map((item) => {
          rowarray.push(item)
          if (rowarray.length === 16) {
            setFirstBlock(oldarray => [...oldarray, rowarray])
          }
        })
      })

    })
    apicall.data.SubBytes.map((block) => {
      var rowarray = []
      block.map((row) => {
        row.map((item) => {
          rowarray.push(item)
          if (rowarray.length === 16) {
            setAfterSubBytes(oldarray => [...oldarray, rowarray])
          }
        })
      })
    })
    apicall.data.ShiftRows.map((block) => {
      var rowarray = []
      block.map((row) => {
        row.map((item) => {
          rowarray.push(item)
          if (rowarray.length === 16) {
            setAfterShiftRows(oldarray => [...oldarray, rowarray])
          }
        })
      })

    })
    apicall.data.MixColumns.map((block) => {
      var rowarray = []
      block.map((row) => {
        row.map((item) => {
          rowarray.push(item)
          if (rowarray.length === 16) {
            setAfterMixColumns(oldarray => [...oldarray, rowarray])
          }
        })
      })

    })
    apicall.data.keys.map((block) => {
      var rowarray = []
      block.map((row) => {
        row.map((item) => {
          rowarray.push(item)
          if (rowarray.length === 16) {
            setKeys(oldarray => [...oldarray, rowarray])
          }
        })
      })

    })

  }

  useEffect(() => {
    console.log(firstBlock, "sub", afterSubBytes, afterShiftRows, afterMixColumns, "keys", keys)
  })

  return <>
    <wc-toast position="top-right">
    </wc-toast>
    <div style={{ display: "flex", backgroundColor: "#1f1f1f", alignItems: 'center', justifyContent: 'center', height: "15vh" }}>
      <div style={{ display: "flex", flexDirection: "row", width: "95%", position: "relative", }}>
        <img alt='icon' style={{ width: "120px", height: "62px", padding: "20px 40px", position: "absolute", bottom: "-30px" }} src={icon} />
        <h1 style={{ display: "flex", alignSelf: "center", margin: "auto", fontSize: 36, }}>AES 48-bit Encryption</h1>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "row", height: "65vh" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', height: "100%", width: "100%", }}>
        <h2>Plain Text Encryption</h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', width: "100%", position: 'relative' }}>
          <textarea style={{ resize: "none", width: "80%", borderRadius: 15, padding: 10, backgroundColor: "#1f1f1f", color: "#e7e7e7", }} placeholder="Enter your plain text to be encrypted here..." rows={15} value={encryption} onChange={(e) => setEncryption(e.target.value)} ></textarea>
          <span style={{ position: "absolute", right: "10%", top: 10, }} onClick={() => {
            toast.success("Copied to clipboard", { theme: { type: "dark" } })
            navigator.clipboard.writeText(encryption)
          }}
          ><AiOutlineCopy size={25} /></span>
        </div>
        {/*<input className='button' style={{padding:"10px 20px",borderRadius:10,border:"none",}} type="button" value={'Key Size'}/>*/}
        <input className='button' style={{ padding: "10px 20px", borderRadius: 10, border: "none" }} type="button" value='Encrypt' onClick={() => Encrypt()} />
      </div>



      <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', height: "100%", width: "100%", position: 'relative' }}>
        <h2>Cipher Text Decryption</h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', width: "100%", position: 'relative' }}>
          <textarea style={{ resize: "none", width: "80%", borderRadius: 15, padding: 10, backgroundColor: "#1f1f1f", color: "#e7e7e7", }} placeholder="Enter your cipher text to be decrypted here..." rows={15} ></textarea>
          <span style={{ position: "absolute", right: "10%", top: 10, }} ><AiOutlineCopy size={25} /></span>
        </div>
        {/*<input className='button' style={{padding:"10px 20px",borderRadius:10,border:"none"}} type="button" value={'Key Size'}/>*/}
        <input className='button' style={{ padding: "10px 20px", borderRadius: 10, border: "none" }} type="button" value='Decrypt' />
        <div style={{ display: "flex", flexDirection: "row" }}>
        </div>
      </div>
    </div>
    {response ? <div style={{ marginRight: 20, marginLeft: 20, marginBottom: 20, display: "flex", alignItems: "center", color: "white", justifyContent: "center" }}>
      <h2>Şifrelenmiş Metin:</h2>
      <p style={{ display: "flex", alignSelf: "center", padding: 10, fontSize: 20 }} >{response}</p>
    </div> : null}
    <div style={{ marginRight: 20, marginLeft: 20, marginBottom: 20, display: "flex" }}>
      {
        <>
          <div style={{ flexDirection: "row", display: "flex", width: "18%", flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
            {firstBlock.length>0&&<h3>Start of Round</h3>}
            {firstBlock.map((x, index) => {
              return (
                <div style={index !== 0 && index % 9 === 0 ? { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderTop: "1px solid red", width: "100%" } : { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                  {firstBlock[index].map(y => {
                    return (
                      <div style={{ backgroundColor: "#1f1f1f", width: "24%", margin: 0.7 }}>
                        <p style={{ color: "white", textAlign: 'center' }}>{parseInt(y, 2).toString(16)}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div style={{ flexDirection: "row", display: "flex", width: "18%", flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
            {afterSubBytes.length>0&&<h3>After SubBytes</h3>}
            {afterSubBytes.map((x, index) => {
              return (
                <div style={index !== 0 && index % 9 === 0 ? { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderTop: "1px solid red", width: "100%" } : { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                  {afterSubBytes[index].map(y => {
                    return (
                      <div style={{ backgroundColor: "#1f1f1f", width: "24%", margin: 0.7 }}>
                        <p style={{ color: "white", textAlign: 'center' }}>{y === "X" ? y : parseInt(y, 2).toString(16)}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div style={{ flexDirection: "row", display: "flex", width: "18%", flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
            {afterShiftRows.length>0&&<h3>After ShiftRows</h3>}
            {afterShiftRows.map((x, index) => {
              return (
                <div style={index !== 0 && index % 9 === 0 ? { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderTop: "1px solid red", width: "100%" } : { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                  {afterShiftRows[index].map(y => {
                    return (
                      <div style={{ backgroundColor: "#1f1f1f", width: "24%", margin: 0.7 }}>
                        <p style={{ color: "white", textAlign: 'center' }}>{y === "X" ? y : parseInt(y, 2).toString(16)}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div style={{ flexDirection: "row", display: "flex", width: "18%", flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
            {afterMixColumns.length>0&&<h3>After MixColumns</h3>}
            {afterMixColumns.map((x, index) => {
              return (
                <div style={index !== 0 && index % 9 === 0 ? { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderTop: "1px solid red", width: "100%" } : { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                  {afterMixColumns[index].map(y => {
                    return (
                      <div style={{ backgroundColor: "#1f1f1f", width: "24%", margin: 0.7 }}>
                        <p style={{ color: "white", textAlign: 'center' }}>{y === "X" ? y : parseInt(y, 2).toString(16)}</p>
                      </div>
                    )
                  })}

                </div>
              )
            })}
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:'center',marginBottom:20,marginTop:40}} >
            {keys.map((x, index) => {
              return (
                <div style={{ display: "flex", marginTop: 30,marginTop:30, alignItems: 'center', justifyContent: 'center', width: "100%",height:"90%" }}>
                  <AiOutlinePlusCircle color='white' size={30}/>
                </div>
              )
            })}
          </div>
          <div style={{ flexDirection: "row", display: "flex", width: "18%", flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
            {keys.length>0&&<h3>Round Key</h3>}
            {keys.map((x, index) => {
              return (
                <div style={index !== 0 && index % 9 === 0 ? { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderTop: "1px solid red", width: "100%" } : { display: "flex", flexWrap: "wrap", margin: 10, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                  {keys[index].map(y => {
                    return (
                      <div style={{ backgroundColor: "#1f1f1f", width: "24%", margin: 0.7 }}>
                        <p style={{ color: "white", textAlign: 'center' }}>{y === "X" ? y : parseInt(y, 2).toString(16)}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </>
      }
    </div>

  </>
}

export default App
{/* {
  firstBlock.map((block) => {
    console.log(block)
    block.map((row) => {
      row.map((item) => {
        console.log(item)
        return (
          <h5 style={{color:"white"}}>{item}</h5>
        )
      })
    })

  })
} */}
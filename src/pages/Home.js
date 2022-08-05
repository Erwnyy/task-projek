import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import './home.css'

//REACT BOOSTRAP
import Form from 'react-bootstrap/Form';


const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dokter, setDokter] = useState("");
    // console.log(data.filter(data => data.name.includes("ita")))

    

    const getAllProductss = async() => {
        setLoading(true)
        const res = await fetch('https://run.mocky.io/v3/c9a2b598-9c93-4999-bd04-0194839ef2dc')
        const resJs = await res.json();
        setData(resJs.data)
    }

    useEffect(() => {
        getAllProductss();
    }, [])

  return (
    <div>

        {/* FORM DATA */}

        <div style={{margin:"100px", border:"5px solid black", padding:"10px"}}>
            <h1>Doctor Finder</h1>
            <div className='container-form' style={{display:"flex", margin:"40px"}} >
                <div>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Keyword" 
                    onChange={(e) => setDokter(e.target.value)} 
                    style={{width:"300px", marginLeft:"40px"}}/>

                </div>
                <div>
                  <Form.Select aria-label="Default select example" style={{width:"300px", marginLeft:"40px"}}>
                  <option>Hospital</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Select aria-label="Default select example" style={{width:"300px", marginLeft:"40px"}}>
                  <option>Specialization</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  </Form.Select>
                </div>
            </div>
        </div>


        {/* DATA TABLE */}

              <div>
                  <section className='featured section' id='featured'>
                        <h2 className='section_title'>DATA DOCTOR</h2>
                        
                        {data.filter((names) => 
                          names.name.toLowerCase().includes(dokter)
                        ).map((e , i) => 
                        <div className='featured_container' loading={loading} key={`${e.id}`} style={{marginBottom:"100px"}}>
                            <div className='container-cards'>
                              <img src={e.photo.url} className='item-img'/>
                              <div className='item-title'>
                                  <h5>{e.name}</h5>
                                  <span>
                                    {e.hospital.map((names, id) => (
                                      <h6 key={id}>{names.name} - {e.specialization.name}</h6>
                                    ))}
                                  </span>
                                  
                                  <div dangerouslySetInnerHTML={{__html: e.about}} style={{textAlign:"center", marginTop:"30px"}}></div>
                                  <div className='button-light'>{e.price.formatted}</div>
                              </div>
                            </div>
                            
                        </div>)}
                    </section>
                </div>
    </div>
  )

}

export default Home
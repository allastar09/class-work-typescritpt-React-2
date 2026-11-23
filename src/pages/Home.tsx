import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios'

let api = 'https://to-dos-api.softclub.tj/api/to-dos'
let apiimg = 'https://to-dos-api.softclub.tj/'
const Home = () => {

  const [data, setData] = useState([])

  async function get() {
    try {
      let {data} = await axios.get(api)
      setData(data.data)
    } catch (error) {
      console.error('problem with get', error);
    }
  }

  async function post(values) {
    await axios.post(api, values)
    get()
  }

  useEffect(()=>{
    get()
  },[])

  const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
    initialValues: {
      name: '',
      description: '',
      images: ''
  
    },
  
    onSubmit: values => {
      post(values)
      
    },
  
  });

  return (
    <div>
     {data.map((el) => (
        <div key={el.id}>
          <p>{el.name}</p>

          {el.images?.map((e) => (
            <img src={apiimg + e} width="100"/>
          ))}
        </div>
      ))}
      <form action="" onSubmit={handleSubmit} className='flex gap-[10px] ml-[50px] mt-[30px]'>
          <input type="text" name='Name' onChange={handleChange} value={values.name} className='border'/>
          <input type="text" name='Description' onChange={handleChange} value={values.description} className='border'/>
          <input type='file' onChange={(e)=> setFieldValue('file', e.target.files[0])} className='border'/>
          <button type='submit' className='border p-[10px]'>submit</button>
      </form> 
    </div>
  )
}

export default Home
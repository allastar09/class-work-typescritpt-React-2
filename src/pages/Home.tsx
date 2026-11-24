
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
    try {
      let formData = new FormData()
      formData.append('Name', values.name)
      formData.append('Description', values.description)

      values.images.forEach((image) => {
        formData.append('Images', image)
      })

      await axios.post(api, formData)

      get()

    } catch (error) {
      console.error('error with post', error);
    }
  }

  useEffect(()=>{
    get()
  },[])

  const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
    initialValues: {
      name: '',
      description: '',
      images: []
    },

    onSubmit: values => {
      post(values)
    },
  });

  async function deleteUser(id) {
    try {
      await axios.delete(`${api}?id=${id}`)
      get()
    } catch (error) {
      console.error('problem with delete', error);
    }
  }
  return (
    <div>

      <form onSubmit={handleSubmit} className='flex gap-[10px] ml-[50px] mt-[30px] mb-[30px]'>
        <input type="text" name='name' placeholder='Name' onChange={handleChange} value={values.name} className='border p-[2px]'/>
        <input type="text" name='description' placeholder='Description' onChange={handleChange} value={values.description} className='border p-[2px]'/>
        <input
          type="file"
          onChange={(e) => setFieldValue('images', Array.from(e.target.files))}
          className="border"
        />
        <button type='submit' className='border p-[10px]'>submit</button>
      </form>

      <table className="border border-collapse">
  <thead>
    <tr>
      <th className="border p-[3px]">Images</th>
      <th className="border p-[3px]">Name</th>
      <th className="border p-[3px]">Description</th>
      <th>A</th>
    </tr>
  </thead>

  <tbody>
    {data.map((el) => (
      <tr key={el.id}>
        <td className="border p-[3px]">
          {el.images.map((e) => (
            <img src={apiimg + el.iamges + e.imageName} width="100" alt="" />
          ))}
        </td>

        <td className="border p-[3px]">{el.name}</td>
        <td className="border p-[3px]">{el.description}</td>
        <td>
          <button className='p-[5px] bg-[red] text-[white]' onClick={()=>deleteUser(el.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}

export default Home
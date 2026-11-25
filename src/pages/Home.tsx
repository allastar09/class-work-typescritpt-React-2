import { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { z } from 'zod'

const Home = () => {
  let api = 'https://to-dos-api.softclub.tj/api/to-dos'
  const [data, setData] = useState([])

  async function get() {
    try {
      let {data} = await axios.get(api)
      setData(data.data)
    } catch (error) {
      console.error('problem with get', error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${api}?id=${id}`)
      get()
    } catch (error) {
      console.error('problem with delete', error);
    }
  }

   useEffect(()=>{
    get()
  }, [])

  return (
    <div>

      <table className="border-collapse border border-black w-full">
        <thead>
          <tr>
            <th className="border border-black p-2">Img</th>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Descritpion</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(el=>{
              return(
        <tr>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2">{el.name}</td>
              <td className="border border-black p-2">{el.description}</td>
              <td className="border border-black p-2">
          <button onClick={() => deleteUser(el.id)}>
            Delete
          </button>
        </td>
      </tr>
              )  
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'

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
      console.error('problem with post', error);
    }
  }

   useEffect(()=>{
    get()
  }, [])

  return (
    <div>

    <Formik
  initialValues={{
    name: '',
    description: '',
    images: []
  }}
  onSubmit={(values) => {
    post(values)
  }}
>
  {({ setFieldValue }) => (
    <Form className="p-[30px] flex gap-[20px]">

      <Field name="name" className="border" />

      <Field name="description" className="border" />

      <input
        type="file"
        multiple
        onChange={(e) => {
          setFieldValue('images', Array.from(e.target.files))
        }}
      />

      <button
        type="submit"
        className="border p-[2px] bg-[green] text-[white] w-[60px]"
      >
        Send
      </button>

    </Form>
  )}
</Formik>

      <table className="border-collapse border border-black w-full">
        <thead>
          <tr>
            <th className="border border-black p-2">Img</th>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Descritpion</th>
            <th className="border border-black ">Action</th>
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
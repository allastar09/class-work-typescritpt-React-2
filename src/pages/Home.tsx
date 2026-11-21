import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DialogDemo from '../components/ui/Dialog';
import { Button } from '../components/ui/button';


export let api = 'https://to-dos-api.softclub.tj/api/to-dos';
export let imgApi = 'https://to-dos-api.softclub.tj/images/';

const Home = () => {
    const [data, setData] = useState([]);

    async function get() {
        try {
            let { data } = await axios.get(api);
            setData(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function delet(id) {
        try {
            await axios.delete(`${api}?id=${id}`)
            get()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            {
                data.map(el => (
                    <div key={el.id} >
                        <img src={`${imgApi}${el.images[0].imageName}`} alt="" width="150"/>
                        <p>{el.name}</p>
                        <DialogDemo name={el.name} desc={el.description}/>
                        <Button onClick={()=>delet(el.id)}  variant="destructive" >Delete</Button>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
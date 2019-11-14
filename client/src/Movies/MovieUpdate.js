import React from 'react';
import axios from 'axios';

const MovieUpdate = (props)=>{

    const [update, setUpdate] = React.useState({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

    React.useEffect(() => {

        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then((res)=>{
                
                setUpdate(res.data)
                
            })
            .catch((err)=>{
                console.log(err)
            })
       
    }, [])

    const handleInput =(e)=>{

        setUpdate({...update, [e.target.name]: e.target.value})
    }

    const handleSub = (e)=>{
        e.preventDefault();
        console.log("update",update);
        setUpdate({
            ...update,
            title:"",
            director:"",
            metascore: "",
            stars:[]
        })
       
    }

    return(
        <form className="Update">
            <div>
                <label>Title:</label>
                <input name="title" value={update.title} onChange={handleInput}/>
            </div>
            <div>
                <label>Director:</label>
                <input name="director" value={update.director} onChange={handleInput}/>
            </div>
            <div>
                <label>Metascore:</label>
                <input name="metascore" value={update.metascore} onChange={handleInput}/>
            </div>
            {update.stars.map((star)=>(
                <div>
                <label>Stars:</label>
                <input name="stars" value={star} onChange={handleInput}/>
            </div>
            ))}
            <button onClick={handleSub}>Edit</button>
        </form>
    );
}

export default MovieUpdate;
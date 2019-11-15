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

    const handleStar = (e)=>{

        const newStars = update.stars.slice();

        newStars[e.target.name] = e.target.value;
        console.log(newStars)

        setUpdate({...update, ...update.stars = newStars})

     
     
     
    }

    const handleSub = (e)=>{
        e.preventDefault();
        console.log("update",update);
        // axios.put(`http://localhost:5000/api/movie/${update.id}`)
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
            {update.stars.map((star, index)=>(
                <div>
                <label>Stars:</label>
                <input name={index} value={star} onChange={handleStar}/>
            </div>
            ))}
            <button onClick={handleSub}>Edit</button>
        </form>
    );
}

export default MovieUpdate;
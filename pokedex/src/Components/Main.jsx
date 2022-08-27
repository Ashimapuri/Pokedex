import React from "react";
import Card from "./Card";
import Pokemoninfo from "./Pokemoninfo";
import axios from "axios";
import {useState, useEffect} from "react";


const Main=()=>{
    const [pokeData, setPokeData]=useState([]);
    const [loading, setLoading]= useState(true);
    const [url,setUrl] =useState("https://pokeapi.co/api/v2/pokemon/");
    const[nextUrl, setNextUrl]=useState();
    const[prevUrl, setPrevUrl]= useState();

   const pokeFun=async()=>{
       setLoading(true)
       const res=await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
      setLoading(false)
   }
   const getPokemon=async(res)=>{
       res.map(async(item)=>{
         const result=await axios.get(item.url)
         setPokeData(state=>){
             state=[...state,result.data]
             return state;
         }
       })
   }

    useEffect(()=>{
       pokeFun();
    },[url])
    return(
        <>
        <div className="container">
            <div className="left-content">
                 <Card />  
                 <Card/>
                 <Card/> 
                 <div className="btn-group">
                     <button>Previous</button>
                     <button>Next</button>
                 </div>
            </div>
            <div className="right-content">
                <Pokemoninfo/>
            </div>
        </div>

       
        </>
    )
}

export default Main;

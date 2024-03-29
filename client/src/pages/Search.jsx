import React, { useEffect, useRef, useState } from 'react'
import './search.css';
import Layout from '../components/layout/Layout';
import {useNavigate} from "react-router-dom"

const Search = () => {
    const inputRef=useRef(null);
    const [keyword,setKeyword]=useState("");
    const navigate=useNavigate(); 
    useEffect(() => {
      inputRef.current.focus();
    }, [])
    

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
       
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate("/products")
        }
    }; 

  return (
    <Layout>
    <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input type='text'
        ref={inputRef}
        placeholder='Search a Product'
        aut
        onChange={(e)=>setKeyword(e.target.value)}
        />
        <input className='search' type='submit' value='search'/>

    </form>
    </Layout>
  )
}

export default Search
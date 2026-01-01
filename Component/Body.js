import {useState,useEffect} from 'react';
function Body()
{
        const [Profile,setProfile]=useState([]);
        const[numberOfProfile,setnumberOfProfile]=useState("");
       async function generateProfile(count)
        {
         const ran =Math.floor(Math.random()*10000);
        try 
        {
        const response = await fetch(`https://api.github.com/users?since=${ran}&per_page=${count}`);
        const data = await response.json();
         setProfile(data);
        } 
        catch (error) 
        {
        console.error("Error fetching GitHub users:", error.message); 
        }
        }
        useEffect(()=>
        {
            generateProfile(10);
        },[])

        return (
            <div className='but'>
                <input type='text' className="input" placeholder="Search Here" value={numberOfProfile} onChange={(e)=>setnumberOfProfile(e.target.value)}></input>
                <button onClick={()=>generateProfile(Number(numberOfProfile))}>Search Profile</button>
            <div className='profile'>
        {
            Profile.map((value)=>
            {
               return (<div key={value.id} className="cards">
                <img src={value.avatar_url}></img>
                <h2>{value.login}</h2>
                <a
  href={value.html_url} target="_blank" rel="noreferrer"style={{ fontSize: "30px" }}>Profile</a>
                 </div>)
            })
        }
            </div>
            </div>
        )
}
export default Body;
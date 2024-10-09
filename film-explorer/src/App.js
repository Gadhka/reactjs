import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Watched from "./watched";
import Rating from "./rating";
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const ApiKey = "7356de28"
export default function App() {
  
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [query, setQuery] = useState("");
  const [selectMove,setSelectMove] = useState("");
  
  
  useEffect(
    function(){
      const controlFetch = new AbortController();
      async function FetchMoveisData(){
        try {
        setLoading(el=>true)
        setError("");
        const resp = await fetch(`http://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`,{signal:controlFetch.signal});
        if (!resp.ok) throw new Error("something wen wrong please try again");
        const data  = await resp.json();
        if (data.Response==="False") throw new Error("moveis not found");
        setMovies(data.Search );
        setLoading(el=>false)}catch(err){
          setError(err.message);

        }finally{
          setLoading(e=>false);
        }
        
      } 
      if (query.length<3){
        setMovies([]);
        setError("Search Some Thing ");
        return;
      }


      FetchMoveisData();
      return function(){
        controlFetch.abort();
      }
  }
    
    ,[query]
  )
  

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          
          {isOpen1 && (

            <ul className="list list-movies">
              {isLoading&&!error&&<h2 style={{textAlign:"center",marginTop:"3rem",fontSize:"3rem"}}>loading..</h2>}
              {!isLoading&& !error && movies?.map((movie) => (
                <li key={movie.imdbID} onClick={()=>setSelectMove(m=>movie.imdbID)} className={movie.imdbID===selectMove? "active-move":""} >
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
              {error&&<h2 style={{textAlign:"center",marginTop:"3rem",fontSize:"3rem"}}>{error}</h2>}
            </ul>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && <>
            {!selectMove &&<Watched watched={watched} setWatched={setWatched}  />}
            {selectMove && <MoveDetailPage  setSelectMove={setSelectMove} selectMove={selectMove} setWatched={setWatched}  /> }
            
          </>}
        </div>
      </main>
    </>
  );
}

function MoveDetailPage({selectMove,setSelectMove,setWatched}){
  const [getmove,setGetMovie] = useState({});
  const [Loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  function HandlerBackBtn(){
    setSelectMove("");
  }
  useEffect(function(){
    async function FetchMove() {
     try{
      setLoading(true);
      const reqs = await fetch(`http://www.omdbapi.com/?apikey=${ApiKey}&i=${selectMove}`);

      if (!reqs.ok) throw new Error("check youre internet connection please");
      const data = await reqs.json();
      if (data.Response === "False") throw new Error("sorry we dont found that movei");
      setLoading(false);
      setGetMovie(data);
      
     } catch(err){
      setError(err.message);
      console.error(err.message);
     } finally{
      setLoading(false);
     }
      
      
    }
    FetchMove()
  },[selectMove])
  return (
    <div style={{width:"100%",padding:"16px"}}>
      {!error&&!Loading&&<DescriptionOfMyMove HandlerBackBtn={HandlerBackBtn} getmove={getmove} setWatched={setWatched} />}
      {Loading&&!error&&<h2>Loading...</h2>}
      {error&&<h2>{error}</h2>}
      
    </div>
  );
}
function DescriptionOfMyMove({getmove,HandlerBackBtn,setWatched}){
  const [rate,setGetMyRate] = useState()
  const updatedMoves = {...getmove,userRating:rate}
  function HandleAddSetWatche(moves){
    setWatched(all_moves=> 
      all_moves.map(move=>move.imdbID).includes(moves.imdbID)  ?
      all_moves.map(mymoves=>mymoves.imdbID===moves.imdbID?{...mymoves,userRating:rate}:mymoves): 
      [...all_moves,moves]
  );
    HandlerBackBtn();

  }
  useEffect(function(){
    if (!getmove.Title) return;
    document.title = `movies | ${getmove.Title}`;
    return function (){
      document.title = "movies application";
    }
  },[getmove.Title])
  return (
    <>
    {
    getmove &&
    <div>
      <button onClick={HandlerBackBtn} style={{padding:"0.5rem", borderRadius:"12px",fontSize:"17px",fontWeight:"700",position:"absolute",top:"0",left:"0",overflow:"hidden"}}>
          &larr;
        </button>
        <div>
          <div style={{display:"flex",gap:"16px"}}>
            <div>
            <img  src={getmove.Poster} alt="img of image" style={{maxHeight:"100px",minWidth:"40%",objectFit:"cover"}} />
            </div>
            <div >
              <h2 style={{fontSize:"24px",fontWeight:"700"}}>{getmove.Title}</h2>
              <p style={{fontWeight:"500"}}>
              {getmove.Released} - {getmove.Runtime}
              </p>
              <h3 style={{fontWeight:"600",fontSize:"14px",marginTop:"8px"}}>{getmove.Genre}</h3>
              <p style={{marginTop:"6px",fontSize:"13px"}}> <span>⭐️</span> {getmove.imdbRating} imdbRating</p>

            </div>
          </div>
          <div style={{marginTop:"5rem"}}>
            <Rating maxRating={10} setGetMyRate={setGetMyRate} />
            <div style={{marginBottom:"1rem"}}>
              <p style={{fontSize:"13px"}}><em>{getmove.Plot}</em></p>
              <p style={{marginTop:"6px",fontSize:"13px"}}>Statrring {getmove.Actors}</p>
              <p style={{marginTop:"6px",fontSize:"13px"}}> Directed By {getmove.Director}</p>
            </div>
            {rate&& 
            <button style={{width:"100%",padding:"4px 10px 4px 10px",borderRadius:"12px"}} onClick={()=>HandleAddSetWatche(updatedMoves)}> add wish List</button>
            }
          </div>
        

        </div>
      </div>
        }
        { !getmove && <h2>error please try again </h2> }
    
      </>
  );
}

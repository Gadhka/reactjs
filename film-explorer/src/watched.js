
const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function Watched({watched,setWatched}){
    
    return(
        <>
            <UserRating watched={watched}  />
            <WatchedSummary watched={watched} setWatched={setWatched} />
   
        
            
        </>
        

    );
}
function UserRating({watched}){
    const avgImdbRating = Math.round(average(watched.map((movie) => movie.imdbRating)));
    const avgUserRating =Math.round( average(watched.map((movie) => movie.userRating)));
    const avgRuntime = Math.round(average(watched.map((movie) => Number(movie.Runtime.split(" ").at(0)) )));
    return(
        <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{Number(avgImdbRating)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                  
                </div>
                
                
        </div>
    );
}
function WatchedSummary({watched,setWatched}){
    return (
        <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{Number(movie.imdbRating)}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.Runtime}</span>
                      </p>
                      <button className="btn-x" onClick={()=>setWatched(element=>element.filter((item)=>item.imdbID!==movie.imdbID))}>x</button>
                      
                    </div>
                  </li>
                ))}
            </ul>
    );
}
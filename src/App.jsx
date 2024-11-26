import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  let [watchlist, setWatchList] = useState([])

  let handleAddtoWatchList = (movieObj) =>{
    let newWatchList = [...watchlist, movieObj]
    localStorage.setItem('moviesApp', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList);
  }

  let handleRemoveFromWatchList = (movieObj) =>{
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id
    })
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchlist))
    setWatchList(filteredWatchlist)
  }

  useEffect(() => {
    let moviesFromLocalStorage= localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return 
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
          
                <Banner /> <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList  watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

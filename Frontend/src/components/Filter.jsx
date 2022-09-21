import "../css/Filter.css"
import {useState, useEffect} from "react";
function Filter(props) {

  const [showFilters, toggleFilters] = useState(false);
  const [date1, setFirstDate] = useState("");
  const [date2, setSecondDate] = useState("");
  useEffect(() => {
    
    let tempList = []
    let filteredList = []

      if(showFilters && props.searchList.length > 0){

        let first_date=Date.parse(date1)
        let second_date=Date.parse(date2)
    
        props.searchList.forEach((element) => {
          if(element.date!=undefined){
            let el_dat=Date.parse(element.date)
            if(el_dat >= first_date && el_dat <= second_date){
              tempList.push(element);
            }
          }
        });
      }else{
        tempList = props.searchList
      }

      // Filter by genre
      if(props.activeGenre !== "all"){
        filteredList = tempList.filter((item) => 
        item.genre.includes(props.activeGenre)
        );
      }else{
        filteredList = tempList;
      }

      let sortedFiltered = filteredList.sort()

      props.setFilterGenre(sortedFiltered);

  }, [date1, date2, showFilters, props.activeGenre]);

  return <>
  

    
  <nav className="Navbar"> 
  <button
      className="filters-btn"
      onClick={() => toggleFilters((showFilter) => !showFilters)}
    >
      DATE
  </button>

    <button className = {props.activeGenre === "all" ? "active" : ""} onClick={() => props.setActiveGenre("all")}>All</button>
    <button className = {props.activeGenre === "pop" ? "active" : ""} onClick={() => props.setActiveGenre("pop")}>Pop</button>
    <button className = {props.activeGenre === "hiphop" ? "active" : ""} onClick={() => props.setActiveGenre("hiphop")}>hiphop</button>
    <button className = {props.activeGenre === "rap" ? "active" : ""} onClick={() => props.setActiveGenre("rap")}>rap</button>
    <button className = {props.activeGenre === "rock" ? "active" : ""} onClick={() => props.setActiveGenre("rock")}>rock</button>
  </nav>
  <div className="filter-dates">
      {showFilters &&
      <>
      <div>
        <p>Between dates: </p>
        <input
          type="date"
          name="date1"
          value={date1}
          onChange={(e) => setFirstDate(e.target.value)}/>
        <input
          type="date"
          name="date2"
          value={date2}
          onChange={(e) => setSecondDate(e.target.value)}/>
      </div>

      </>}
    </div>
  </>
}
export default Filter
import "../css/Filter.css"
import {useState, useEffect} from "react";
function Filter(props) {

  const [showFilters, toggleFilters] = useState(false);
  const [date1, setFirstDate] = useState("");
  const [date2, setSecondDate] = useState("");
  const [filtered, setFilteredlList] = useState([]);

  useEffect(() => {
    
    let tempList = []
    let filteredList = []

      console.log("Looking at all genres");

      if(showFilters && props.searchList.length > 0){

        console.log("Filter by date is 'true' & search list is not empty")

        let first_date=Date.parse(date1)
        let second_date=Date.parse(date2)
    
        props.searchList.forEach((element) => {
          
          if(element.date!=undefined){
            let el_dat=Date.parse(element.date)
            if(el_dat >= first_date && el_dat <= second_date){
              console.log("adding an element to tempList");
              tempList.push(element);
            }
          }
        });
      }else{
        tempList = props.searchList
      }

      // Filter by genre
      if(props.activeGenre !== "all"){
        console.log("Filtering by genre" + props.activeGenre)
        filteredList = tempList.filter((item) => 
        item.genre.includes(props.activeGenre)
        );
      }else{
        console.log("Including all genres");
        filteredList = tempList;
      }

      
      let sortedFiltered = filteredList.sort()

      console.log("tempList: ")
      console.log(tempList)
      console.log("filteredList: ")
      console.log(filteredList)
      console.log("sortedFiltered: ")
      console.log(sortedFiltered)
      setFilteredlList(sortedFiltered)
      props.setFilterGenre(sortedFiltered);
      console.log("Updating search list ------------------------------------------------")


  }, [date1, date2, showFilters, props.activeGenre]);

  return <>
  
    
  <nav className="Navbar"> 
  <button
      className="filters-btn"
      onClick={() => toggleFilters((showFilter) => !showFilters)}
    >
      ADDITIONAL FILTERS
  </button>

    <button className = {props.activeGenre === "all" ? "active" : ""} onClick={() => props.setActiveGenre("all")}>All</button>
    <button className = {props.activeGenre === "pop" ? "active" : ""} onClick={() => props.setActiveGenre("pop")}>Pop</button>
    <button className = {props.activeGenre === "hiphop" ? "active" : ""} onClick={() => props.setActiveGenre("hiphop")}>hiphop</button>
    <button className = {props.activeGenre === "rap" ? "active" : ""} onClick={() => props.setActiveGenre("rap")}>rap</button>
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
        <p> - </p>
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
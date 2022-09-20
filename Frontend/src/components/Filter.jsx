import "../css/Filter.css"
import {useState, useEffect} from "react";
function Filter(props) {

  const [showFilters, toggleFilters] = useState(false);
  const [date1, setFirstDate] = useState("2022-01-01");
  const [date2, setSecondDate] = useState("2023-01-01");
  const [filtered, setFilteredlList] = useState([]);

  console.log(date1);
  console.log(date2);

  useEffect(() => {
    
    if(props.activeGenre === "all"){

      if(showFilters && props.searchList.length > 0){

        console.log("Entered All");
        let tempList = []
    
        props.searchList.forEach((element) => {
          console.log("adding an element to tempList");
          tempList.push(element)
        });
    
        props.setFilterGenre(tempList);
        return;
      }

      props.setFilterGenre(props.searchList);
      return;
    }
   

    if(showFilters && filtered.length > 0){

      console.log("Entered filtered");
      let tempList = []
  
      filtered.forEach((element) => {
        console.log("adding an element to tempList");
        console.log(tempList)
        
        if(element.date >= date1 && element.date <= date2){
          tempList.push(element);
          console.log(tempList)
        }
      });
      props.setFilterGenre(tempList);
      return;
    }
      let tempList = props.searchList.filter((item) => 
      item.genre.includes(props.activeGenre)
    );

    setFilteredlList(tempList)
    let sortedFiltered = filtered.sort()
    props.setFilterGenre(sortedFiltered);

  }, [props.searchList, showFilters, props.activeGenre]);

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
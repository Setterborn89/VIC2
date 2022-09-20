import "../css/Filter.css"
import {useState, useEffect} from "react";
function Filter(props) {

  const [showFilters, toggleFilters] = useState(false);
  const [date1, setFirstDate] = useState("");
  const [date2, setSecondDate] = useState("");
  const [filtered, setFilteredlList] = useState([]);

  console.log(date1);
  console.log(date2);

  useEffect(() => {
    
    if(props.activeGenre === "all"){

      if(showFilters && props.searchList.length > 0){

        console.log("Entered All");
        let tempList = []
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

        console.log(tempList)

        let sortedFiltered = tempList.sort()

        setFilteredlList(sortedFiltered)
        props.setFilterGenre(sortedFiltered);
        return;
      }

      props.setFilterGenre(props.searchList);
      return;
    }
    else
    {
      if(showFilters && filtered.length > 0){

        console.log("Entered filtered");
        let tempList = []

        let first_date=Date.parse(date1)
        let second_date=Date.parse(date2)
    
        filtered.forEach((element) => {
          
          if(element.date!=undefined){
            let el_dat=Date.parse(element.date)
            if(el_dat >= first_date && el_dat <= second_date){
              console.log("adding an element to tempList");
              tempList.push(element);
            }
          }
        });

        console.log(tempList)

        let sortedFiltered = tempList.sort()

        setFilteredlList(sortedFiltered)
        props.setFilterGenre(sortedFiltered);
        return;
      }

      console.log(props.activeGenre)
      let tempList = props.searchList.filter((item) => 
      item.genre.includes(props.activeGenre)
      );
      
      let sortedFiltered = tempList.sort()

      setFilteredlList(sortedFiltered)
      console.log(sortedFiltered)
      props.setFilterGenre(sortedFiltered);
    }

    

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
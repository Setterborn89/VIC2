import "../css/Filter.css"
import {useEffect} from "react";
function Filter(props) {
  useEffect(() => {
    
    if(props.activeGenre === "all"){
      props.setFilterGenre(props.searchList);
      return;
    }
   
    const filtered = props.searchList.filter((item) => 
   
    item.genre.includes(props.activeGenre)
    );
   console.log(filtered);
    props.setFilterGenre(filtered);

  }, [props.activeGenre])
  return <>
  <div>
   <button onClick={() => props.setActiveGenre("all")}>All</button>
   <button onClick={() => props.setActiveGenre("pop")}>Pop</button>
   <button onClick={() => props.setActiveGenre("hiphop")}>hiphop</button>
   <button onClick={() => props.setActiveGenre("rap")}>rap</button>
  </div>
    {/* <div className="navbar">
  <a href="#home">Date</a>
  <a href="#news">Date</a>
  <div className="dropdown">
    <button className="dropbtn">Genre 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
    <a href="#">All</a>
      <a href="#">Pop</a>
      <a href="#">Rap</a>
      <a href="#">Hiphop 3</a>
    </div>
  </div> 
</div> */}

  </>
}
export default Filter
import "../css/Filter.css"
function Filter(){

  return <>
    <div className="navbar">
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
</div>
  </>
}
export default Filter
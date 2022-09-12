import "../css/Filter.css"
function Filter(){

  return <>
    <div className="navbar">
  <a href="#home"></a>
  <a href="#news"></a>
  <div className="dropdown">
    <button className="dropbtn">Genre 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <a href="#">pop</a>
      <a href="#">rap</a>
      <a href="#">hiphop 3</a>
    </div>
  </div> 
</div>
  </>
}
export default Filter
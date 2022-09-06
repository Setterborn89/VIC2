import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";

function MyRouter() {
  return (
    <Router>
     <nav>
        <Link to="Home">Home</Link>
        <Link to="Stream Concerts">Stream Concerts</Link>
        <Link to="Live Concerts">Live Concerts</Link>
     </nav>
      <Routes>
        {/* <Route path="/Home" element={<Home />}></Route>
        <Route path="/Stream Concerts" element={<Concerts />} />
        <Route path="/Live Concerts" element={<Artists />} /> */}
        {/* <Route path="/" element={< />} /> */}
      </Routes>
    </Router>
  );
}

export default MyRouter;

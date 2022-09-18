function Slider(){
    return(
        <div className="slider-container">
            <div className="progress-bar-cover"></div>
            <div className="thumb"></div>
            <input type="range" step = '0.01' className="range"/>
        </div>
    )
}
export default Slider
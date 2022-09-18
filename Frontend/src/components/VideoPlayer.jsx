import "../css/videoPlayer.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function VideoPlayer() {

    const { url } = useParams()

    return<div id="mediaplayer">
        <video controls >
            <source src={"/data/video-stream/" + url} type="video/mp4"/>
        </video>
    </div>
}

export default VideoPlayer
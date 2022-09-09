function VideoPlayer(props) {
    const url = props.url

    return<div id="mediaplayer">
        <video controls >
            <source src={url} type="video/mp4"/>
        </video>
    </div>
}

export default VideoPlayer
import React from "react"
import trayData from "./trayData"
import "./style.scss"

const Tray = ({ setVideoId }) => {
  return (
    <div className="tray">
      <div className="tray__header">
        <h2 className="tray__title">Recommended Videos</h2>
      </div>
      <div className="tray__carousel">
        {trayData.map((item) => (
          <div key={item.videoId} className="tray__item" onClick={() => setVideoId(item.videoId)}>
            <img src={item?.thumbnail || "https://dummyimage.com/1920x1080/dddddd/999999&text=Viewlift"} alt={item?.title} className="tray__image" />
            <h3 className="tray__title">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tray

import React from "react";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const MyCourses = () => (
  <div>
    {"Courses Page"}
    <AudioPlayer
      autoPlay
      src="https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav"
      onPlay={(e) => console.log("onPlay")}
      // other props here
    />
    <LiteYouTubeEmbed
      id="L2vS_050c-M"
      title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
    />
  </div>
);

export default React.memo(MyCourses);

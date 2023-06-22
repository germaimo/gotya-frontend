import React from "react";
import AudioTracks from "../components/AudioTracks";
import MidiTracks from "../components/MidiTracks";

const Proyecto = ({audioTracks, midiTracks}) => {
  console.log(audioTracks.length > 0, midiTracks.length > 0);
  return (
    <div>
      {audioTracks.length > 0 && <AudioTracks audioTracks={audioTracks} /> }

      {midiTracks.length > 0 && <MidiTracks midiTracks={midiTracks} />}
    </div>
  );
};

export default Proyecto;

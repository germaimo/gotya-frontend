import React from "react";
import AudioTracks from "../components/AudioTracks";
import MidiTracks from "../components/MidiTracks";

const Proyecto = ({audioTracks, midiTracks}) => {
  return (
    <div>
      <AudioTracks audioTracks={audioTracks} />

      <MidiTracks midiTracks={midiTracks} />
    </div>
  );
};

export default Proyecto;

import React from "react";

const AudioTracks = ({ audioTracks }) => {
  return (
    <div>
      <h2>Pistas de audio:</h2>
      {audioTracks.map((track, index) => (
        <div key={index}>
          <p>{track}</p>
          <textarea
            id={`audio-${index}`}
            rows="4"
            cols="50"
            placeholder="Agregar texto aquí"
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default AudioTracks;
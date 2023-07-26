import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Proyecto = () => {
  const audioTracks = useSelector((state) => state.audioTracks);
  const midiTracks = useSelector((state) => state.midiTracks);
  const nombreProyecto = useSelector((state)=> state.nombreProyecto);

  return (
      <div>
        <Link to={{ pathname: "/" }}>Volver a Home</Link>
        <h1>Proyecto: {nombreProyecto}</h1>

        <div style={{display:"flex", width:"fit-content", margin:"0 auto", gap: "20px"}}>
          <div>
            <h2>Audio Tracks</h2>
            {audioTracks.length > 0 &&
              audioTracks.map((track, index) => (
                <div key={index}>
                  <p>{track}</p>
                  <textarea
                    id={`audio-${index}`}
                    rows="4"
                    cols="50"
                    placeholder="Agregar texto aquí"
                  />
                </div>
              ))}
          </div>

          <div>
            <h2>Midi Tracks</h2>
            {midiTracks.length > 0 &&
              midiTracks.map((track, index) => (
                <div key={index}>
                  <p>{track}</p>
                  <textarea
                    id={`midi-${index}`}
                    rows="4"
                    cols="50"
                    placeholder="Agregar texto aquí"
                  />
                </div>
              ))}
          </div>
        </div>

      </div>
  );
};

export default Proyecto;

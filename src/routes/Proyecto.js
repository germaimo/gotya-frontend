import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Proyecto = () => {
  const audioTracks = useSelector((state) => state.audioTracks);
  const midiTracks = useSelector((state) => state.midiTracks);
  const nombreProyecto = useSelector((state)=> state.nombreProyecto);

  //podria hacer que cuando se monta el componente pushearle los comentarios 

  //podra hacer que cuando se monta el textarea que se mande el id? existe esto?


  //la logica seria que cuando se hace un unBlur, se ejecuta el dispatch, y se guarda en el localstorage
  //


  return (
      <div>
        <Link to={{ pathname: "/" }}>Volver a Home</Link>
        <h1>Proyecto: {nombreProyecto}</h1>

        <div style={{display:"flex", width:"fit-content", margin:"0 auto", gap: "20px"}}>
          <div>
            <h2>Audio Tracks</h2>
            {audioTracks.length > 0 &&
              audioTracks.map((item,index) => (
                <div key={index}>
                  <p>{item.track}</p>
                  <textarea
                    id={`audio-${index}`}
                    rows="4"
                    cols="50"
                    placeholder="Agregar texto aquí"
                    defaultValue={item.text}
                  />
                </div>
              ))}
          </div>

          <div>
            <h2>Midi Tracks</h2>
            {midiTracks.length > 0 &&
              midiTracks.map((item,index) => (
                <div key={index}>
                  <p>{item.track}</p>
                  <textarea
                    id={`midi-${index}`}
                    rows="4"
                    cols="50"
                    placeholder="Agregar texto aquí"
                    defaultValue={item.text}
                  />
                </div>
              ))}
          </div>
        </div>

      </div>
  );
};

export default Proyecto;

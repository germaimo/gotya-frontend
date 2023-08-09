import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as typeActions from '../store/tipoAcciones';

const Proyecto = () => {
  const audioTracks = useSelector((state) => state.audioTracks);
  const midiTracks = useSelector((state) => state.midiTracks);
  const nombreProyecto = useSelector((state)=> state.nombreProyecto);

  const dispatch = useDispatch();

  const guardarComentario = (tipo, trackName, e) => {
    const text = e.target.value;

    if(tipo === "audio"){
      
      dispatch({
        type: typeActions.GUARDAR_COMENTARIO_AUDIO,
        payload: { audioTrackName: trackName, audioText: text}
      });

    }else{

      dispatch({
        type: typeActions.GUARDAR_COMENTARIO_MIDI ,
        payload: { midiTrackName: trackName, midiText: text}
      });

    }

  }

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
                    onBlur={(e) => guardarComentario("audio", item.track, e)}
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
                    onBlur={(e) => guardarComentario("midi", item.track, e)}
                  />
                </div>
              ))}
          </div>
        </div>

      </div>
  );
};

export default Proyecto;

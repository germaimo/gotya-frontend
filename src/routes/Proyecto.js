import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as typeActions from "../store/tipoAcciones";

const Proyecto = () => {
  const audioTracks = useSelector((state) => state.audioTracks);
  const midiTracks = useSelector((state) => state.midiTracks);
  const nombreProyecto = useSelector((state) => state.nombreProyecto);
  const [usuarios, setUsuarios] = useState([]);

  const dispatch = useDispatch();

  const guardarComentario = (tipo, trackName, e) => {
    const text = e.target.value;

    if (tipo === "audio") {
      dispatch({
        type: typeActions.GUARDAR_COMENTARIO_AUDIO,
        payload: { audioTrackName: trackName, audioText: text },
      });
    } else {
      dispatch({
        type: typeActions.GUARDAR_COMENTARIO_MIDI,
        payload: { midiTrackName: trackName, midiText: text },
      });
    }
  };

  useEffect(() => {
    // Simular usuarios que entran después de 5 segundos
    const userEntryTimeout = setTimeout(() => {
      setUsuarios(["LR", "TM"]); // Agregar usuarios simulados al array
    }, 5000);

    return () => clearTimeout(userEntryTimeout);
  }, []);

  useEffect(() => {
    console.log(usuarios);
  }, [usuarios]);

  return (
    <div>
      <nav>
        <Link to={{ pathname: "/" }}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_2314)">
              <rect width="60" height="60" fill="#A9A9A9" />
              <path d="M30 12L14 24V48H24V34H36V48H46V24L30 12Z" fill="black" />
            </g>
            <defs>
              <clipPath id="clip0_6_2314">
                <rect width="60" height="60" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        <ul>
          {usuarios.map((usuario, index) => (
            <li key={index}> <p className={`usuarioLoggeado small color-${index} `}> {usuario} </p> </li>
          ))}
          <li>
            <p className="usuarioLoggeado">GF</p>
          </li>
        </ul>
      </nav>

      <h1 className="nombre">
        <img src="../ableton-icon.png" alt="ableton icon" />
        <span> {nombreProyecto}.als </span>
      </h1>

      <div className="contenedorCanales">
        <div className="contenedorCanal">
          <h2>Audio Tracks</h2>
          {audioTracks.length > 0 &&
            audioTracks.map((item, index) => (
              <div key={index}>
                <div className="nombreTrackAudio">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      clipRule="evenodd"
                      viewBox="0 0 64 64"
                    >
                      <path fill="none" d="M-1024-192H256v800h-1280z"></path>
                      <path
                        fillRule="nonzero"
                        d="M8.002 43.851h47.822v5.992H8.002zM8.212 28.93h47.822v5.991H8.212zM8.212 14.008h47.822V20H8.212z"
                      ></path>
                    </svg>
                  </span>
                  <p>{item.track}</p>
                </div>
                <div className="containerTextarea">
                  <textarea
                    id={`audio-${index}`}
                    rows="4"
                    cols="50"
                    placeholder="Agregar texto aquí"
                    defaultValue={item.text}
                    onBlur={(e) => guardarComentario("audio", item.track, e)}
                  />
                  {index === 1 && <div className="circuloUsuarioLR hidden-item2">LR</div>}
                  <div className="circuloUsuario">GF</div>
                </div>
              </div>
            ))}
        </div>

        <div className="contenedorCanal">
          <h2>Midi Tracks</h2>
          {midiTracks.length > 0 &&
            midiTracks.map((item, index) => (
              <div key={index}>
                <div className="nombreTrackMidi">
                  <span>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_35_363)">
                        <path
                          d="M11.3334 7.08333V26.9167L26.9167 17L11.3334 7.08333Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_35_363">
                          <rect width="34" height="34" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <p>{item.track}</p>
                </div>
                <div className="containerTextarea">
                  <textarea
                    id={`midi-${index}`}
                    rows="4"
                    cols="50"
                    placeholder="Agregar texto aquí"
                    defaultValue={item.text}
                    onBlur={(e) => guardarComentario("midi", item.track, e)}
                  />
                  {index === 0 && <div className="circuloUsuarioTM hidden-item1">TM</div>}
                  <div className="circuloUsuario">GF</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
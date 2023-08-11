import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader";

const Projects = () => {
  //get projects from localStorage
  const projects = Object.keys(localStorage).map((key) => ({
    nombre: key,
    data: JSON.parse(localStorage.getItem(key)),
  }));

  return (
    <>
      {projects.map((project) => (
        <div className="card" key={project.nombre}>
          <div className="nombreProyecto">{project.nombre}</div>
          <div className="opciones">
            
            <div className="flex">
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_14_95)">
                    <path
                      d="M24 21.44C22.9867 21.44 22.08 21.84 21.3867 22.4667L11.88 16.9333C11.9467 16.6267 12 16.32 12 16C12 15.68 11.9467 15.3733 11.88 15.0667L21.28 9.58667C22 10.2533 22.9467 10.6667 24 10.6667C26.2133 10.6667 28 8.88001 28 6.66667C28 4.45334 26.2133 2.66667 24 2.66667C21.7867 2.66667 20 4.45334 20 6.66667C20 6.98667 20.0533 7.29334 20.12 7.60001L10.72 13.08C10 12.4133 9.05333 12 8 12C5.78667 12 4 13.7867 4 16C4 18.2133 5.78667 20 8 20C9.05333 20 10 19.5867 10.72 18.92L20.2133 24.4667C20.1467 24.7467 20.1067 25.04 20.1067 25.3333C20.1067 27.48 21.8533 29.2267 24 29.2267C26.1467 29.2267 27.8933 27.48 27.8933 25.3333C27.8933 23.1867 26.1467 21.44 24 21.44Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_14_95">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <p className="textoCompartir">Compartir</p>
            </div>

            <div className="flex">
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_14_100)">
                    <path
                      d="M8 25.3333C8 26.8 9.2 28 10.6667 28H21.3333C22.8 28 24 26.8 24 25.3333V9.33333H8V25.3333ZM25.3333 5.33333H20.6667L19.3333 4H12.6667L11.3333 5.33333H6.66667V8H25.3333V5.33333Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_14_100">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <p className="textoEliminar">Eliminar</p>
            </div>

          </div>
        </div>
      ))}
    </>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const audioResponse = await fetch("http://localhost:3001/audio-tracks");
      const audioData = await audioResponse.json();

      const midiResponse = await fetch("http://localhost:3001/midi-tracks");
      const midiData = await midiResponse.json();

      if (audioData.length === 0 && midiData.length === 0) {
        throw new Error("No hay datos");
      }

      //si hay audioData, guardo en el store
      if (audioData.length > 0) {
        dispatch({ type: "SET_AUDIO_TRACKS", payload: audioData });
      }

      //si hay midiData, guardo en el store
      if (midiData.length > 0) {
        dispatch({ type: "SET_MIDI_TRACKS", payload: midiData });
      }

      if (midiData.length > 0 && audioData.length > 0) {
        navigate("/Proyecto");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : <FileUploader handleSubmit={handleSubmit} />}

      <Projects />
    </>
  );
}
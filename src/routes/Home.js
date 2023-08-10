import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader";

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

      if(audioData.length === 0 && midiData.length === 0) {
        throw new Error("No hay datos");
      }

      //si hay audioData, guardo en el store
      if(audioData.length > 0) {
        dispatch({ type: "SET_AUDIO_TRACKS", payload: audioData });
      }

      //si hay midiData, guardo en el store
      if(midiData.length > 0) {
        dispatch({ type: "SET_MIDI_TRACKS", payload: midiData });
      }

      if(midiData.length > 0 && audioData.length > 0){
        navigate("/Proyecto");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const showProjects = () => {
    //get projects from localStorage
    const projects = Object.keys(localStorage);
    const items = { ...localStorage };
    let conunt = 0;
    Object.values(items).forEach(valor => {
      console.log(JSON.parse(valor));
      conunt++;
      console.log(conunt);
    });
    // Object.entries(items).forEach(([propiedad, valor]) => {
    //   console.log(`Propiedad: ${propiedad}, Valor: ${valor}`);
    // });
    
    /*if(projects.length > 0) {
      return (
        <div>
          <h2>Proyectos guardados</h2>
          <ul>
            {projects.map((project) => (
              <li key={project}>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_NOMBRE_PROYECTO", payload: project });
                    navigate("/Proyecto");
                  }}
                >
                  {project}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    } */
  }

  useEffect(()=>
  {
    showProjects();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FileUploader
          handleSubmit={handleSubmit}
        />
      )}
      
    </>
  );
}
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader";
import Projects from "../components/Projects";
import * as typeActions from '../store/tipoAcciones';

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
        dispatch({ type: typeActions.SET_AUDIO_TRACKS, payload:{storage: false, audioData: audioData} });
      }

      //si hay midiData, guardo en el store
      if (midiData.length > 0) {
        dispatch({ type: typeActions.SET_MIDI_TRACKS, payload: {storage: false, midiData: midiData} });
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
      {loading ? <Loader /> : 
      <>
      <FileUploader handleSubmit={handleSubmit} />
      <Projects />
      </>
      }
    </>
  );
}
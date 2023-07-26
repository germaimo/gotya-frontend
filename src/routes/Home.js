import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const audioTracks = useSelector(state => state.audioTracks);
  const midiTracks = useSelector(state => state.midiTracks);
  
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
      
      let hayAudio = audioTracks.length > 0;
      let hayMidi = midiTracks.length > 0;

      if (hayAudio && hayMidi) {
        setRedirect(true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    if(redirect){
      setRedirect(false);
      navigate("/Proyecto");
    }

  }, [redirect, navigate]);

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
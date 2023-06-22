import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader"
//import Proyecto from "./Proyecto";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);
  const [midiTracks, setMidiTracks] = useState([]);

  const handleSubmit = async (selectedFile) => {
    console.log('selected file', selectedFile);
    console.log('que es es?', selectedFile === true )
    
    if (!selectedFile) return;
    setLoading(true);
    try {
      await fetchData();
      setLoading(false);     
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const audioResponse = await fetch("http://localhost:3001/audio-tracks");
      const audioData = await audioResponse.json();
      
      const midiResponse = await fetch("http://localhost:3001/midi-tracks");
      const midiData = await midiResponse.json();
      
      setAudioTracks(audioData);
      setMidiTracks(midiData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( ()=>{ 
    
    console.log(audioTracks.length)
    console.log(midiTracks.length)

    let hayAudio = audioTracks.length > 0;
    let hayMidi = midiTracks.length > 0;

    if(hayAudio && hayMidi){
      navigate('/Proyecto');
    }    

    
  }, [midiTracks, audioTracks, navigate])

  return (
    <>
      <FileUploader
        handleSubmit={handleSubmit}
        setAudioTracks={setAudioTracks}
        setMidiTracks={setMidiTracks}
      />

      {loading && <Loader />}

      {/* <Proyecto audioTracks={audioTracks} midiTracks={midiTracks} /> */}

    </>
  );
}

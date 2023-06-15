import { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Loader from "../components/Loader"
import Proyecto from "./Proyecto";

export default function Home() {
  //const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);
  const [midiTracks, setMidiTracks] = useState([]);

  const handleSubmit = async (selectedFile) => {
    console.log('selected file', selectedFile);
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
      setAudioTracks(audioData);

      const midiResponse = await fetch("http://localhost:3001/midi-tracks");
      const midiData = await midiResponse.json();
      setMidiTracks(midiData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( ()=>{ console.log(loading)}, [loading])

  return (
    <>
      <FileUploader
        handleSubmit={handleSubmit}
        setAudioTracks={setAudioTracks}
        setMidiTracks={setMidiTracks}
      />

      {loading ? (
        <Loader />
      ) : (
        (midiTracks.length > 0 || audioTracks.length > 0) && (
          <Proyecto midiTracks={midiTracks} audioTracks={audioTracks} />
        )
      )}
    </>
  );
}

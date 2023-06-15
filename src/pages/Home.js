import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FileUploader from "./FileUploader";
import Loader from "./Loader";

export default function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);
  const [midiTracks, setMidiTracks] = useState([]);

  const handleSubmit = async () => {
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
      const audioResponse = await fetch("http://localhost:3000/audio-tracks");
      const audioData = await audioResponse.json();
      setAudioTracks(audioData);

      const midiResponse = await fetch("http://localhost:3000/midi-tracks");
      const midiData = await midiResponse.json();
      setMidiTracks(midiData);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loading && (midiTracks.length > 0 || audioTracks.length > 0)) {
      history.push("/proyecto");
    }
  }, [loading, audioTracks.length, midiTracks.length, history]);

  return (
    <>
      <FileUploader
        handleSubmit={handleSubmit}
        setAudioTracks={setAudioTracks}
        setMidiTracks={setMidiTracks}
      />

      {loading && <Loader />}
    </>
  );
}

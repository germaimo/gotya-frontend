import { useEffect, useState } from "react";

export default function Home() {

const [loading, setLoading] = useState(true);
const [audioTracks, setAudioTracks] = useState([]);
const [midiTracks, setMidiTracks] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const audioResponse = await fetch('http://localhost:3000/audio-tracks');
      const audioData = await audioResponse.json();
      setAudioTracks(audioData);

      const midiResponse = await fetch('http://localhost:3000/midi-tracks');
      const midiData = await midiResponse.json();
      setMidiTracks(midiData);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

return (
  <div>
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <>
        <h2>Pistas de audio:</h2>
        {audioTracks.map((track, index) => (
          <div key={index}>
            <p>{track}</p>
            <textarea rows="4" cols="50" placeholder="Agregar texto aquí"></textarea>
          </div>
        ))}

        <h2>Pistas MIDI:</h2>
        {midiTracks.map((track, index) => (
          <div key={index}>
            <p>{track}</p>
            <textarea rows="4" cols="50" placeholder="Agregar texto aquí"></textarea>
          </div>
        ))}
      </>
    )}
  </div>
);

}

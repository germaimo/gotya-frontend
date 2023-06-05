import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [loading, setLoading] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);
  const [midiTracks, setMidiTracks] = useState([]);

  const removeFile = () => {
    setSelectedFile("");
    setSelectedFileName("");
  };

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
    selectedFile?.name !== undefined && setSelectedFileName(selectedFile.name);
  }, [selectedFile]);

  return (
    <div>
      {audioTracks.length === 0 ? (
        <div>
          {selectedFile ? (
            <div>
              <p>{selectedFileName}</p>
              <button onClick={removeFile}>Eliminar archivo seleccionado</button>
              <br />
              <button onClick={handleSubmit} type="submit">
                Subir
              </button>
            </div>
          ) : (
            <>
              <input
                id="1"
                type="file"
                value=""
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </>
          )}
          <br />
        </div>
      ) : (
        <div>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <h2>Pistas de audio:</h2>
              {audioTracks.map((track, index) => (
                <div key={index}>
                  <p>{track}</p>
                  <textarea id={`audio-${index}`} rows="4" cols="50" placeholder="Agregar texto aquí"></textarea>
                </div>
              ))}

              <h2>Pistas MIDI:</h2>
              {midiTracks.map((track, index) => (
                <div key={index}>
                  <p>{track}</p>
                  <textarea id={`midi-${index}`} rows="4" cols="50" placeholder="Agregar texto aquí"></textarea>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
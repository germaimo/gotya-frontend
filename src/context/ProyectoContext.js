import { useState, createContext } from "react";

const ProyectoContext = createContext();

const ProyectoProvider = ({ children }) => {
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [audioTracks, setAudioTracks] = useState([]);
    const [midiTracks, setMidiTracks] = useState([]);
    
    return (
        <ProyectoContext.Provider
        value={{
            nombreProyecto,
            setNombreProyecto,
            audioTracks,
            setAudioTracks,
            midiTracks,
            setMidiTracks,
        }}
        >
        {children}
        </ProyectoContext.Provider>
    );
    }

export { ProyectoContext, ProyectoProvider };
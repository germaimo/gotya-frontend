import * as typeActions from './tipoAcciones';
import Storage from '../utils/storage'; // Asegúrate de que la ruta sea correcta según la ubicación de tu archivo storage.js


const initialState = {
    nombreProyecto: 'Sin nombre',
    midiTracks: [],
    audioTracks: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {

let getText = (trackName) => {
    let textTrack = Storage.get(trackName);
    return textTrack;
}

switch (action.type) {
    case typeActions.SET_NOMBRE_PROYECTO:
        Storage.put(action.payload, {audioTracks: [], midiTracks:[]});

        return {
            ...state,
            nombreProyecto: action.payload
        }
    case typeActions.FETCH_DATA_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    case typeActions.SET_AUDIO_TRACKS:
        console.log("set audio tracks", action.payload)
        
        let arrayAudioTracks = action.payload.map( (track) => ({ track: track, text: getText(track) }) );
        return {
            ...state,
            audioTracks: arrayAudioTracks
        }
    case typeActions.SET_MIDI_TRACKS:
        
    console.log("set midi tracks", action.payload)

        let arrayMidiTracks = action.payload.map( (track) => ({ track: track, text: "hola midi" }) )

        return {
            ...state,
            midiTracks: arrayMidiTracks
        }
    default:
        return state;
    }    
}

export default reducer;
import * as typeActions from './tipoAcciones';

const initialState = {
    nombreProyecto: 'Sin nombre',
    midiTracks: [],
    audioTracks: [],
    loading: false,
    error: null
}
//aux 

// aca llamaria al localStorage para traerme el comentario, entiendo que esta
// funcion la podria hacer por fuera de este archivo
//esta funcion no funciona, no se si esta bien tener esto en el reducer.
//tendria que basarme en supercontenidos


const reducer = (state = initialState, action) => {

    //el trackName seria el key en el localStorage
    // el value seria el comentario del canal

    let getText = (trackName) => {
        let texto = 'soy get text y el trackname seria:' + trackName ;
        return texto;
    }

switch (action.type) {
    case typeActions.SET_NOMBRE_PROYECTO:
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
        
        let arrayAudioTracks = action.payload.map( (track) => ({ track: track, text: getText(track) }) );
        return {
            ...state,
            audioTracks: arrayAudioTracks
        }
    case typeActions.SET_MIDI_TRACKS:
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
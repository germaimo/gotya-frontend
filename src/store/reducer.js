import * as typeActions from './tipoAcciones';

const initialState = {
    nombreProyecto: 'Sin nombre',
    midiTracks: [],
    audioTracks: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {

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
        return {
            ...state,
            audioTracks: action.payload
        }
    case typeActions.SET_MIDI_TRACKS:
        return {
            ...state,
            midiTracks: action.payload
        }
    default:
        return state;
    }    
}

export default reducer;
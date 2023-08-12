import * as typeActions from "./tipoAcciones";
import Storage from "../utils/storage";

const initialState = {
  nombreProyecto: "Sin nombre",
  midiTracks: [],
  audioTracks: [],
  loading: false,
  error: null,
};

const singleProyectReducer = (state = initialState, action) => {
  let getText = (tipo, trackName) => {
    //validar si el proyecto existe en localStorage, sino devuelvo vacio

    if (Storage.get(state.nombreProyecto) === null) return "";

    // sino devuelvo el texto correspndiente
    let proyecto = Storage.get(state.nombreProyecto);
    let tracks = proyecto[tipo + "Tracks"];
    let track = tracks.filter((track) => track.track === trackName)[0];
    //validar si existe la propiedad "text" en track, sino devuelvo vacio

    if (track?.text === undefined) return "";

    return track.text;
  };

  switch (action.type) {
    case typeActions.SET_NOMBRE_PROYECTO:
      if (Storage.get(action.payload) === null) {
        Storage.put(action.payload, { audioTracks: [], midiTracks: [] });
      }

      return {
        ...state,
        nombreProyecto: action.payload,
      };
    case typeActions.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case typeActions.SET_AUDIO_TRACKS:
      let arrayAudioTracks = [];

      if (action.payload.storage) {
        arrayAudioTracks = action.payload.audioTracks;
      } else {
        arrayAudioTracks = action.payload.map((track) => ({
          track: track,
          text: getText("audio", track),
        }));
      }

      return {
        ...state,
        audioTracks: arrayAudioTracks,
      };
    case typeActions.SET_MIDI_TRACKS:
      let arrayMidiTracks = [];

      if (action.payload.storage) {
        arrayMidiTracks = action.payload.midiTracks;
      } else {
        arrayMidiTracks = action.payload.map((track) => ({
          track: track,
          text: getText("midi", track),
        }));
      }

      return {
        ...state,
        midiTracks: arrayMidiTracks,
      };
    case typeActions.GUARDAR_COMENTARIO_AUDIO:
      const { audioTrackName, audioText } = action.payload;

      let audioTracksCopy = state.audioTracks.map((track) => ({ ...track }));

      const audioTrackIndex = audioTracksCopy.findIndex(
        (track) => track.track === audioTrackName
      );
      if (audioTrackIndex !== -1) {
        // Modifico el texto del track encontrado
        audioTracksCopy[audioTrackIndex].text = audioText;

        Storage.put(state.nombreProyecto, {
          audioTracks: audioTracksCopy,
          midiTracks: [...state.midiTracks],
        });

        return {
          ...state,
          audioTracks: audioTracksCopy,
        };
      } else {
        // Manejar el caso en que no se encuentra el track
        console.error(`No se encontró el track ${audioTrackName}`);
        return state; // Devolver el estado sin cambios
      };
    case typeActions.GUARDAR_COMENTARIO_MIDI:
      const { midiTrackName, midiText } = action.payload;

      let midiTracksCopy = state.midiTracks.map((track) => ({ ...track }));

      const trackIndex = midiTracksCopy.findIndex(
        (track) => track.track === midiTrackName
      );
      if (trackIndex !== -1) {
        // Modifico el texto del track encontrado
        midiTracksCopy[trackIndex].text = midiText;

        Storage.put(state.nombreProyecto, {
          audioTracks: [...state.audioTracks],
          midiTracks: midiTracksCopy,
        });

        return {
          ...state,
          midiTracks: midiTracksCopy,
        };
      } else {
        // Manejar el caso en que no se encuentra el track
        console.error(`No se encontró el track ${midiTrackName}`);
        return state; // Devolver el estado sin cambios
      };
    default:
      return state;
  }
};

export default singleProyectReducer;
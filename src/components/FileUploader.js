import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";

const FileUploader = ({ handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const dispatch = useDispatch();

  const removeFile = () => {
    setSelectedFile("");
    setSelectedFileName("");
  };

  const changeNombreProyecto = (e) =>{
    dispatch({ type: "SET_NOMBRE_PROYECTO", payload: e });
  }

  useEffect(() => {
    selectedFile?.name !== undefined && setSelectedFileName(selectedFile.name);
  }, [selectedFile]);

  return (
    <div>
      {selectedFile ? (
        <div>
          <p>{selectedFileName}</p>
          <button onClick={removeFile}>Eliminar archivo seleccionado</button>
          <br />
          <br />
          <input type="text" onBlur={(e) => changeNombreProyecto(e.target.value)} placeholder="Nombre del proyecto"/>
          <br />
          <br />
          <button
            onClick={() => {
              handleSubmit(selectedFile);
            }}
            type="submit"
          >
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
  );
};

export default FileUploader;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FileUploader = ({ handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const inputRef = React.createRef();
  const dispatch = useDispatch();

  const removeFile = () => {
    setSelectedFile("");
    setSelectedFileName("");
  };

  const changeNombreProyecto = (e) => {
    dispatch({ type: "SET_NOMBRE_PROYECTO", payload: e });
  };

  const selectFile = (event) => {
    event.persist();
    inputRef.current.click();
  };

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
          <input
            type="text"
            onBlur={(e) => changeNombreProyecto(e.target.value)}
            placeholder="Nombre del proyecto"
          />
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
            id="botonArchivo"
            type="file"
            value=""
            ref={inputRef}
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <div className="botonNuevoProyecto" onClick={selectFile}>
            {" "}
            <span className="iconoMas">
              <svg
                width="59"
                height="59"
                viewBox="0 0 59 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_646)">
                  <path
                    d="M46.7083 31.9584H31.9583V46.7084H27.0417V31.9584H12.2917V27.0417H27.0417V12.2917H31.9583V27.0417H46.7083V31.9584Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_646">
                    <rect width="59" height="59" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>{" "}
            <p className="nuevoProyecto">Nuevo Proyecto</p>{" "}
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default FileUploader;
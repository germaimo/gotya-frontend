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
          <div className="containerArchSelec"> 
            <p>{selectedFileName}</p>
            <span onClick={removeFile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                fill="#000"
                version="1.1"
                viewBox="0 0 485 485"
                xmlSpace="preserve"
              >
                <path d="M67.224 0H417.759V71.81H67.224z"></path>
                <path d="M417.776 92.829H67.237V485h350.537V92.829h.002zM165.402 431.447H137.04V146.383h28.362v285.064zm91.287 0h-28.363V146.383h28.363v285.064zm91.281 0h-28.361V146.383h28.361v285.064z"></path>
              </svg>
            </span>
          </div>

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

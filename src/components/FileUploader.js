import { useEffect, useState } from "react";

const FileUploader = ({ handleSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const removeFile = () => {
    setSelectedFile("");
    setSelectedFileName("");
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

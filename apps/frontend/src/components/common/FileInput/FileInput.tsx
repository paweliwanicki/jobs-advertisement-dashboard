import { ChangeEvent, useCallback, useState } from 'react';
import classes from './FileInput.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';

type FileInputProps = {
  id?: string;
  label?: string;
  acceptTypes: string;
  setSelectedFile?: (files: File) => void;
};

const FileInput = ({
  id,
  label,
  acceptTypes,
  setSelectedFile,
}: FileInputProps) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
      setSelectedFile && setSelectedFile(files[0]);
    }
  };

  const clearSelectedFile = useCallback(() => {
    setFile(undefined);
  }, [file]);

  return (
    <div className={classes.fileInputBox}>
      {file && (
        <div className={classes.fileInfoBox}>
          <span>{file.name}</span>
          <SvgIcon
            id="icon-close-dark"
            width={20}
            height={20}
            onClick={clearSelectedFile}
          />
        </div>
      )}
      <label className={classes.inputLabel} htmlFor={id}>
        <div className={classes.labelText}>{label}</div>
        <div className={classes.inputBox}>
          <p>Click to upload file</p>
          <input type="file" onChange={handleFileChange} accept={acceptTypes} />
        </div>
      </label>
    </div>
  );
};

export default FileInput;

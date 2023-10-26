import { ChangeEvent, useCallback, useState } from 'react';
import classes from './FileInput.module.scss';
import SvgIcon from '../SvgIcon/SvgIcon';

type FileInputProps = {
  id?: string;
  label?: string;
  acceptTypes: string;
  setSelectedFile?: (file?: File) => void;
};

const FileInput = ({
  id,
  label,
  acceptTypes,
  setSelectedFile,
}: FileInputProps) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        setFile(files[0]);
        setSelectedFile && setSelectedFile(files[0]);
      }
    },
    [file]
  );

  const clearSelectedFile = useCallback(() => {
    setFile(undefined);
    setSelectedFile && setSelectedFile(undefined);
  }, [file]);

  return (
    <div className={classes.fileInputBox}>
      {file && (
        <div className={classes.fileInfoBox}>
          <span>{file.name}</span>
          <SvgIcon
            id="icon-close-dark"
            width={26}
            height={26}
            onClick={clearSelectedFile}
          />
        </div>
      )}
      <label className={classes.inputLabel} htmlFor={id}>
        <div className={classes.labelText}>{label}</div>
        <div className={classes.inputBox}>
          <p>Click to upload file</p>
          <input
            type="file"
            onChange={handleFileChange}
            accept={acceptTypes}
            name="file"
          />
        </div>
      </label>
    </div>
  );
};

export default FileInput;

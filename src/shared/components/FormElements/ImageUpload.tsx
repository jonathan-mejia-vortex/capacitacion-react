import React, {
  MutableRefObject,
  Ref,
  RefObject,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Button from "./Button";

import "./ImageUpload.css";

type Props = {
  errorText?: ReactNode;
  onInput: any;
  center: boolean;
  id: string | undefined;
};

const ImageUpload = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef: RefObject<HTMLInputElement> | null =
    useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!file){
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsValid = true;
    } else {
      fileIsValid = false;
    }
    setIsValid(fileIsValid);
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload center ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

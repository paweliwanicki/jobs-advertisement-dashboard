import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import classes from "./OfferEditor.module.scss";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMceEditor } from "tinymce";
import Input from "../common/Input/Input";
import { useTheme } from "../../hooks/useTheme";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../common/LoadingSpinner/LoadingSpinner";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import type { Option } from "react-google-places-autocomplete/build/types";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useOfferEditor } from "../../hooks/useOfferEditor";
import ValidationIcon from "../common/ValidationIcon/ValidationIcon";
import SnackBar from "../common/SnackBar/SnackBar";

const WORK_TIME_OPTIONS = [
  { value: "1/4 time", label: "1/4 time" },
  { value: "1/3 time", label: "1/3 time" },
  { value: "1/2 time", label: "1/2 time" },
  { value: "Full time", label: "Full time" },
] as const;

const OfferEditor = () => {
  const editorRef = useRef<TinyMceEditor>();

  const { theme } = useTheme();
  const {
    errors,
    isValidated,
    isFetching,
    responseError,
    responseMessage,
    clearValidationAndError,
    addOffer,
    validateOfferEditor,
  } = useOfferEditor();

  const {
    titleError,
    workTimeError,
    locationError,
    descriptionError,
    companyError,
  } = errors;

  const {
    titleIsValidated,
    companyIsValidated,
    workTimeIsValidated,
    locationIsValidated,
    descriptionIsValidated,
  } = isValidated;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<SingleValue<Option>>();
  const [workTime, setWorkTime] = useState<SingleValue<Option>>();
  const [initialEditorValue, setInitialEditorValue] = useState<string>("");
  const [editorKey, setEditorKey] = useState<number>(0);

  const [offerSnackBarIsShowing, setOfferSnackBarIsShowing] =
    useState<boolean>(true);

  const handleTitleOnChange = useCallback(
    (title: string) => {
      titleIsValidated && clearValidationAndError("TITLE");
      setTitle(title);
    },
    [titleIsValidated, clearValidationAndError]
  );

  const handleCompanyOnChange = useCallback(
    (company: string) => {
      companyIsValidated && clearValidationAndError("COMPANY");
      setCompany(company);
    },
    [companyIsValidated, clearValidationAndError]
  );

  const handleLocationOnChange = useCallback(
    (location: SingleValue<Option>) => {
      locationIsValidated && clearValidationAndError("LOCATION");
      setLocation(location);
    },
    [locationIsValidated, clearValidationAndError]
  );

  const handleWorkTimeOnChange = useCallback(
    (workTime: SingleValue<Option>) => {
      workTimeIsValidated && clearValidationAndError("WORKTIME");
      setWorkTime(workTime);
    },
    [workTimeIsValidated, clearValidationAndError]
  );

  const handleDescriptionOnChange = useCallback(
    (description: string) => {
      descriptionIsValidated && clearValidationAndError("DESCRIPTION");
      setDescription(description);
    },
    [descriptionIsValidated, clearValidationAndError]
  );

  const handleOnInitTinyMCE = useCallback(
    (event: any, editor: TinyMceEditor) => {
      setIsLoading(false);
      return (editorRef.current = editor);
    },
    []
  );

  const handleChangeTinyMCEStyles = useCallback(() => {
    setInitialEditorValue(description);
    setEditorKey((key) => key + 1); // force rerender
  }, [description]);

  const handleSaveOffer = useCallback(async () => {
    const isValid = validateOfferEditor(
      title,
      company,
      location?.label ?? "",
      workTime?.value ?? "",
      description
    );

    if (isValid) {
      const results = addOffer({
        title,
        company,
        description,
        location: location?.label ?? "",
        workTime: workTime?.value,
      });
      console.log(results);
      setOfferSnackBarIsShowing(true);
    }
  }, [description, company, location, workTime, title]);

  useEffect(() => {
    handleChangeTinyMCEStyles();
  }, [theme]);

  return (
    <div className={classes.offerEditorContainer}>
      <h2>Add new offer</h2>
      {(isLoading || isFetching) && <LoadingSpinner />}

      <div className={classes.inputsBox}>
        <Input
          id="title"
          onChange={handleTitleOnChange}
          label="Title"
          size="small"
          classNames={classes.inputBox}
          placeholder="Work role"
          errorText={titleError}
          hasError={!!titleError}
          isValidated={isValidated.titleIsValidated}
        />

        <Input
          id="company"
          onChange={handleCompanyOnChange}
          label="Company"
          size="small"
          classNames={classes.inputBox}
          placeholder="Company"
          errorText={companyError}
          hasError={!!companyError}
          isValidated={isValidated.companyIsValidated}
        />
        <label htmlFor="location-select" className={classes.locationLabel}>
          {isValidated.locationIsValidated && (
            <ValidationIcon
              id="location-select"
              hasError={!!locationError}
              errorText={locationError}
              classNames={classes.validationIcon}
            />
          )}
          Location
          <GooglePlacesAutocomplete
            apiKey="AIzaSyBa7WIrBOkKT7YRiTJFzhFMYZfCTc_6iRY"
            minLengthAutocomplete={3}
            selectProps={{
              value: location,
              onChange: handleLocationOnChange,
              className: `${classes.locationSelect} ${
                locationIsValidated &&
                (locationError ? classes.error : classes.valid)
              }`,
              id: "location-select",
              placeholder: "Work location",
              noOptionsMessage: () => "Please type location...",
            }}
          />
        </label>
        <label htmlFor="worktime-select" className={classes.workTimeLabel}>
          {isValidated.workTimeIsValidated && (
            <ValidationIcon
              id="wortkime-select"
              hasError={!!workTimeError}
              errorText={workTimeError}
              classNames={classes.validationIcon}
            />
          )}
          Working time
          <CreatableSelect
            id="worktime-select"
            isClearable
            options={WORK_TIME_OPTIONS}
            className={`${classes.workTimeSelect} ${
              workTimeIsValidated &&
              (workTimeError ? classes.error : classes.valid)
            }`}
            placeholder="Working time"
            onChange={handleWorkTimeOnChange}
          />
        </label>
      </div>
      <label htmlFor="offer-description" className={classes.tinymceLabel}>
        Description
        <div
          className={`${classes.tinymceEditorBox} ${
            descriptionIsValidated &&
            (errors.descriptionError ? classes.error : classes.valid)
          }`}
        >
          {isValidated.descriptionIsValidated && (
            <ValidationIcon
              id="wortkime-select"
              hasError={!!descriptionError}
              errorText={descriptionError}
              classNames={classes.validationIcon}
            />
          )}
          <Editor
            key={`editor-${editorKey}`}
            id="offer-description"
            apiKey="hobfut19zde8hcqzn78dkiv360ipccmckyz7o1cgshf3llrr"
            onInit={handleOnInitTinyMCE}
            initialValue={initialEditorValue}
            onEditorChange={handleDescriptionOnChange}
            init={{
              height: 500,
              menubar: true,
              plugins:
                "preview code searchreplace autolink directionality visualblocks visualchars fullscreen image link media  codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists",
              toolbar:
                "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | code",
              image_advtab: true,
              skin: theme === "dark" ? "oxide-dark" : "oxide",
              content_css: theme === "dark" ? "dark" : "",
            }}
          />
        </div>
      </label>
      <div className={classes.actionsBox}>
        <Link to="/dashboard">
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Button
          variant="primary"
          onClick={handleSaveOffer}
          disabled={isFetching}
        >
          Save
        </Button>
      </div>
      <SnackBar
        variant={responseError ? "error" : "success"}
        isShowing={offerSnackBarIsShowing}
        id="offer-status"
      >
        {responseMessage}
      </SnackBar>
    </div>
  );
};

export default OfferEditor;

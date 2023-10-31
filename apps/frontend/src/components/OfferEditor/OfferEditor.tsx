import classes from './OfferEditor.module.scss';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CreatableSelect from 'react-select/creatable';
import ValidationIcon from '../common/ValidationIcon/ValidationIcon';
import { Editor } from '@tinymce/tinymce-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SingleValue } from 'react-select';
import { useTheme } from '../../hooks/useTheme';
import { useOfferEditor } from '../../hooks/useOfferEditor';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../common/LoadingSpinner/LoadingSpinner';
import type { Option } from 'react-google-places-autocomplete/build/types';
import type { Editor as TinyMceEditor } from 'tinymce';
import { useDictionaries } from '../../hooks/useDictionaries';
import { Company } from '../../types/Company';
import UploadFilesBox from '../common/UploadFilesBox/UploadFilesBox';

const CONTRACT_OPTIONS = [
  { value: '1/4 time', label: '1/4 time' },
  { value: '1/3 time', label: '1/3 time' },
  { value: '1/2 time', label: '1/2 time' },
  { value: 'Full time', label: 'Full time' },
] as const;

const OfferEditor = () => {
  const editorRef = useRef<TinyMceEditor>();

  const { companies, companySelectOptions, createCompany } = useDictionaries();

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
    contractError,
    locationError,
    descriptionError,
    companyError,
  } = errors;

  const {
    titleIsValidated,
    companyIsValidated,
    contractIsValidated,
    locationIsValidated,
    descriptionIsValidated,
  } = isValidated;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<SingleValue<Option>>();
  const [companyLogo, setCompanyLogo] = useState<File>();
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<SingleValue<Option>>();
  const [contract, setContract] = useState<SingleValue<Option>>();
  const [initialEditorValue, setInitialEditorValue] = useState<string>('');
  const [editorElementKey, setEditorElementKey] = useState<number>(0);

  const handleTitleOnChange = useCallback(
    (title: string) => {
      titleIsValidated && clearValidationAndError('TITLE');
      setTitle(title);
    },
    [titleIsValidated, clearValidationAndError]
  );

  const handleCompanyOnChange = useCallback(
    (company: SingleValue<Option>) => {
      companyIsValidated && clearValidationAndError('COMPANY');
      setCompany(company);
    },
    [companyIsValidated, clearValidationAndError]
  );

  const handleLocationOnChange = useCallback(
    (location: SingleValue<Option>) => {
      locationIsValidated && clearValidationAndError('LOCATION');
      setLocation(location);
    },
    [locationIsValidated, clearValidationAndError]
  );

  const handleContractOnChange = useCallback(
    (contract: SingleValue<Option>) => {
      contractIsValidated && clearValidationAndError('CONTRACT');
      setContract(contract);
    },
    [contractIsValidated, clearValidationAndError]
  );

  const handleDescriptionOnChange = useCallback(
    (description: string) => {
      descriptionIsValidated && clearValidationAndError('DESCRIPTION');
      setDescription(description);
    },
    [descriptionIsValidated, clearValidationAndError]
  );

  const handleCompanyLogoOnChange = useCallback(
    (file?: File) => {
      setCompanyLogo(file);
    },
    [companyLogo]
  );

  const handleOnInitTinyMCE = useCallback(
    (_event: any, editor: TinyMceEditor) => {
      setIsLoading(false);
      return (editorRef.current = editor);
    },
    []
  );

  const handleChangeTinyMCEStyles = useCallback(() => {
    setInitialEditorValue(description);
    setEditorElementKey((key) => key + 1); // force tinymce rerender
  }, [description]);

  const handleCreateNewCompany = useCallback(
    async (name: string) => {
      const newCompany: Company = {
        name: name,
      };
      await createCompany(newCompany);
    },
    [companies, companySelectOptions, createCompany]
  );

  const handleSaveOffer = useCallback(
    async (e: any) => {
      e.preventDefault();
      const isValid = validateOfferEditor(
        title,
        company?.value ?? '',
        location?.label ?? '',
        contract?.value ?? '',
        description
      );

      if (isValid) {
        await addOffer({
          title,
          description,
          companyLogo,
          companyId: company?.value ?? '',
          location: location?.label ?? '',
          contract: contract?.value,
        });
      }
    },
    [
      description,
      company,
      location,
      contract,
      title,
      responseMessage,
      responseError,
      companyLogo,
    ]
  );

  useEffect(() => {
    handleChangeTinyMCEStyles();
  }, [theme]);

  return (
    <div className={classes.offerEditorContainer}>
      <h2>Add new offer</h2>
      {(isLoading || isFetching) && (
        <LoadingSpinner
          message={isLoading ? 'Initialization text editor' : ''}
        />
      )}
      <form onSubmit={handleSaveOffer}>
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
          <label
            htmlFor="react-select-location-input"
            className={classes.locationLabel}
          >
            {locationIsValidated && (
              <ValidationIcon
                id="location-select"
                hasError={!!locationError}
                errorText={locationError}
                classNames={classes.validationIcon}
              />
            )}
            <p>Location</p>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyBa7WIrBOkKT7YRiTJFzhFMYZfCTc_6iRY"
              minLengthAutocomplete={3}
              selectProps={{
                value: location,
                id: 'location-select',
                instanceId: 'location',
                placeholder: 'Work location',
                className: `${classes.locationSelect} ${
                  locationIsValidated &&
                  (locationError ? classes.error : classes.valid)
                }`,
                isClearable: true,
                noOptionsMessage: () => 'Please type location...',
                onChange: handleLocationOnChange,
              }}
            />
          </label>
          <label
            htmlFor="react-select-contract-input"
            className={classes.contractLabel}
          >
            {contractIsValidated && (
              <ValidationIcon
                id="wortkime-select"
                hasError={!!contractError}
                errorText={contractError}
                classNames={classes.validationIcon}
              />
            )}
            <p>Contract</p>
            <CreatableSelect
              id="contract-select"
              instanceId="contract"
              options={CONTRACT_OPTIONS}
              className={`${classes.contractSelect} ${
                contractIsValidated &&
                (contractError ? classes.error : classes.valid)
              }`}
              placeholder="Contract"
              onChange={handleContractOnChange}
              isClearable
            />
          </label>
          <label
            htmlFor="react-select-company-input"
            className={classes.companyLabel}
          >
            <p>Company</p>
            {companyIsValidated && (
              <ValidationIcon
                id="company-select"
                hasError={!!companyError}
                errorText={companyError}
                classNames={classes.validationIcon}
              />
            )}
            <CreatableSelect
              id="company-select"
              onChange={handleCompanyOnChange}
              onCreateOption={handleCreateNewCompany}
              placeholder="Company"
              instanceId="company"
              options={companySelectOptions}
              className={`${classes.companySelect} ${
                companyIsValidated &&
                (companyError ? classes.error : classes.valid)
              }`}
              isClearable
            />
          </label>

          <UploadFilesBox
            image={companyLogo ?? undefined}
            acceptTypes="image/png, image/gif, image/jpeg"
            onSelect={handleCompanyLogoOnChange}
            placeholder="Click here to upload Company logo"
          />
        </div>

        <label htmlFor="offer-description" className={classes.tinymceLabel}>
          Description
          <div
            className={`${classes.tinymceEditorBox} ${
              descriptionIsValidated &&
              (errors.descriptionError ? classes.error : classes.valid)
            }`}
          >
            {descriptionIsValidated && (
              <ValidationIcon
                id="wortkime-select"
                hasError={!!descriptionError}
                errorText={descriptionError}
                classNames={classes.validationIcon}
              />
            )}
            <Editor
              key={`editor-${editorElementKey}`}
              id="offer-description"
              apiKey="hobfut19zde8hcqzn78dkiv360ipccmckyz7o1cgshf3llrr"
              onInit={handleOnInitTinyMCE}
              initialValue={initialEditorValue}
              onEditorChange={handleDescriptionOnChange}
              init={{
                height: 500,
                menubar: true,
                plugins:
                  'preview code searchreplace autolink directionality visualblocks visualchars fullscreen image link media  codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists',
                toolbar:
                  'formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | code',
                image_advtab: true,
                skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                content_css: theme === 'dark' ? 'dark' : '',
              }}
            />
          </div>
        </label>
        <div className={classes.actionsBox}>
          <Link to="/dashboard">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="primary" disabled={isFetching} type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OfferEditor;

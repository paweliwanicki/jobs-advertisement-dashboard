import { useCallback, useMemo, useState } from "react";
import { HttpMethod } from "../enums/HttpMethods";
import { ResponseParams, useApi } from "./useApi";

const OFFER_STATUS_MESSAGES: Record<number, string> = {
  201: "Offer has been successfuly!",
  404: "Unknown error has occured :(",
} as const;

type OfferEditorInput =
  | "TITLE"
  | "LOCATION"
  | "COMPANY"
  | "WORKTIME"
  | "DESCRIPTION";

export type Offer = {
  title: string;
  company: string;
  location: string;
  workTime: string;
  description: string;
};

type UseOfferEditor = {
  errors: {
    titleError: string | undefined;
    companyError: string | undefined;
    workTimeError: string | undefined;
    locationError: string | undefined;
    descriptionError: string | undefined;
  };
  isValidated: {
    titleIsValidated: boolean;
    companyIsValidated: boolean;
    workTimeIsValidated: boolean;
    locationIsValidated: boolean;
    descriptionIsValidated: boolean;
  };
  isFetching: boolean;
  responseError: boolean;
  responseMessage: string | undefined;
  clearValidationAndError: (input: OfferEditorInput) => void;
  validateOfferEditor: (
    title: string,
    company: string,
    location: string,
    workTime: string,
    description: string
  ) => boolean;
  addOffer: (offer: Offer) => Promise<ResponseParams>;
};

type InputError = "EMPTY";

const INPUT_ERRORS_MESSAGES: Record<InputError, string> = {
  EMPTY: "Can not be empty!",
} as const;

export const useOfferEditor = (): UseOfferEditor => {
  const { fetch, isFetching } = useApi();

  const [titleError, setTitleError] = useState<string | undefined>();
  const [companyError, setCompanyError] = useState<string | undefined>();
  const [workTimeError, setWorkTimeError] = useState<string | undefined>();
  const [locationError, setLocationError] = useState<string | undefined>();
  const [descriptionError, setDescriptionError] = useState<
    string | undefined
  >();

  const [titleIsValidated, setTitleIsValidated] = useState<boolean>(false);
  const [companyIsValidated, setCompanyIsValidated] = useState<boolean>(false);
  const [workTimeIsValidated, setWorkTimeIsValidated] =
    useState<boolean>(false);
  const [locationIsValidated, setLocationIsValidated] =
    useState<boolean>(false);
  const [descriptionIsValidated, setDescriptionIsValidated] =
    useState<boolean>(false);

  const [responseError, setResponseError] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>();

  const validateOfferEditor = (
    title: string,
    company: string,
    location: string,
    workTime: string,
    description: string
  ) => {
    let isValid = true;
    if (title === "") {
      setTitleError(INPUT_ERRORS_MESSAGES.EMPTY);
      isValid = false;
    }

    if (company === "") {
      setCompanyError(INPUT_ERRORS_MESSAGES.EMPTY);
      isValid = false;
    }

    if (location === "") {
      setLocationError(INPUT_ERRORS_MESSAGES.EMPTY);
      isValid = false;
    }
    if (workTime === "") {
      setWorkTimeError(INPUT_ERRORS_MESSAGES.EMPTY);
      isValid = false;
    }

    if (description === "") {
      setDescriptionError(INPUT_ERRORS_MESSAGES.EMPTY);
      isValid = false;
    }

    setTitleIsValidated(true);
    setCompanyIsValidated(true);
    setLocationIsValidated(true);
    setDescriptionIsValidated(true);
    setWorkTimeIsValidated(true);

    return isValid;
  };

  const addOffer = useCallback(async (offer: Offer) => {
    const [, response] = await fetch<Offer>(HttpMethod.POST, {
      path: "/api/offers",
      payload: JSON.stringify(offer),
    });

    if (response) {
      setResponseMessage(
        OFFER_STATUS_MESSAGES[response.statusCode] ?? "Unknown status"
      );
      setResponseError(response.statusCode !== 201);
    }

    return response;
  }, []);

  const validationCleaners: Record<OfferEditorInput | "ALL", () => void> =
    useMemo(() => {
      return {
        TITLE: () => {
          setTitleError(undefined);
          setTitleIsValidated(false);
        },
        COMPANY: () => {
          setCompanyError(undefined);
          setCompanyIsValidated(false);
        },
        WORKTIME: () => {
          setWorkTimeError(undefined);
          setWorkTimeIsValidated(false);
        },
        LOCATION: () => {
          setLocationError(undefined);
          setLocationIsValidated(false);
        },
        DESCRIPTION: () => {
          setDescriptionError(undefined);
          setDescriptionIsValidated(false);
        },
        ALL: () => {
          clearValidation();
          clearErrors();
        },
      };
    }, []);

  const clearErrors = useCallback(() => {
    setTitleError(undefined);
    setCompanyError(undefined);
    setWorkTimeError(undefined);
    setLocationError(undefined);
    setDescriptionError(undefined);
  }, []);

  const clearValidation = useCallback(() => {
    setTitleIsValidated(false);
    setCompanyIsValidated(false);
    setWorkTimeIsValidated(false);
    setLocationIsValidated(false);
    setDescriptionIsValidated(false);
  }, []);

  const clearValidationAndError = useCallback((input?: OfferEditorInput) => {
    validationCleaners[input ?? "ALL"]();
  }, []);

  return {
    errors: {
      titleError,
      companyError,
      workTimeError,
      locationError,
      descriptionError,
    },
    isValidated: {
      titleIsValidated,
      companyIsValidated,
      locationIsValidated,
      workTimeIsValidated,
      descriptionIsValidated,
    },
    isFetching,
    responseError,
    responseMessage,
    addOffer,
    validateOfferEditor,
    clearValidationAndError,
  };
};

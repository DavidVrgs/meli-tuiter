import {
  SignUpErrorCode,
  type LoginPayload,
  type SignUpPayload,
} from "../../../shared/interfaces/auth";
import { useAuth, useTranslation } from "../../../shared";
import type { ValidationErrors } from "final-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../../shared/utils/validations";

export default function useSignUp() {
  const { singUp, loading, isAuthenticated } = useAuth();
  const { t: translate } = useTranslation("signup");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (payload: SignUpPayload) => {
    const res = await singUp({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    if (res.code === SignUpErrorCode.DUPLICATE_ENTRY) {
      return setError(translate("form.errors.duplicate_entry_email"));
    }

    if (res.code === SignUpErrorCode.UNKNOWN_ERROR) {
      return setError(translate("form.errors.unknow_error"));
    }
  };

  const onValidation = ({ email }: LoginPayload): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (email && !isValidEmail(email)) {
      errors.email = translate("form.errors.invalid_email");
    }

    return errors;
  };

  return {
    error,
    loading,
    onSubmit,
    onValidation,
  };
}

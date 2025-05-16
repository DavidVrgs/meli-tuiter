import type { LoginPayload } from "../../../shared/interfaces/auth";
import { useAuth, useTranslation } from "../../../shared";
import type { ValidationErrors } from "final-form";
import { useEffect, useState } from "react";
import { ApiCode } from "../../../shared/interfaces/api";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../../shared/utils/validations";

export default function useLogin() {
  const { login, loading, isAuthenticated } = useAuth();
  const { t: translate } = useTranslation("auth.login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (payload: LoginPayload) => {
    const res = await login({
      email: payload.email,
      password: payload.password,
    });

    if (res.status !== ApiCode.SUCCESS) {
      setError(translate("form.errors.invalid_credentials"));
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

import type { User, UserPayload } from "../../../shared/interfaces/auth";
import type { ValidationErrors } from "final-form";
import { isValidHttpsUrl } from "../../../shared/utils/validations";
import { useAuth, useTranslation } from "../../../shared";
import { updateUserProfile } from "../api/profile.api";
import { useMutation } from "../../../shared/hooks/useMutation";
import { useNotification } from "../../../shared/contexts/notification/NotificationContext";

export default function useProfile() {
  const { t: translate } = useTranslation("profile");
  const { user, updateUser } = useAuth();
  const { createNotification } = useNotification();

  const {
    mutate: fetchUpdateUserProfile,
    isPending: loadingUpdateUserProfile,
  } = useMutation({
    mutationFn: updateUserProfile,
    options: {
      onSuccess: (data: User) => {
        updateUser(data);
        createNotification({
          message: translate("notifications.profile_updated"),
          type: "success",
        });
      },
    },
  });

  const onValidation = ({ avatar_url }: UserPayload): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (avatar_url && !isValidHttpsUrl(avatar_url)) {
      errors.avatar_url = translate("form.errors.invalid_profile_picture_url");
    }

    return errors;
  };

  const onUpdateUser = (payload: UserPayload) => {
    const { name, avatar_url, password } = payload;
    fetchUpdateUserProfile({
      name,
      avatar_url,
      ...(password && { password }),
    });
  };

  return {
    user,
    loadingUpdateUserProfile,
    onValidation,
    onUpdateUser,
  };
}

import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState, type JSX } from "react";
import { useTranslation } from "../../../../shared";
import useCreatePost from "../../hooks/useCreatePost.hook";

export interface PostCreateFormProp {
  createDraft: (message: string) => void;
  customMessage?: string;
}

export function PostCreateForm({
  createDraft,
  customMessage,
}: Readonly<PostCreateFormProp>): JSX.Element {
  const { t: translate } = useTranslation("");
  const [message, setMessage] = useState(customMessage ?? "");
  const [error, setError] = useState("");
  const { fetchCreatePost, loading } = useCreatePost();

  useEffect(() => {
    if (customMessage) {
      setMessage(customMessage);
    }
  }, [customMessage]);

  const handleChangePost = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleCreatePost = () => {
    if (!message) return setError(translate("form.required"));
    fetchCreatePost(message);
  };

  const handleCreateDraft = () => {
    setError("");
    if (!message) return setError(translate("form.required"));
    setMessage("");
    createDraft(message);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: "25px" }}>
      <TextField
        multiline
        rows={4}
        fullWidth
        value={message}
        onChange={handleChangePost}
        error={!!error}
        helperText={!!error && error}
        placeholder={translate("post.create.placeholders.what_on_your_mind")}
      />
      <Button
        variant="contained"
        onClick={handleCreatePost}
        loading={loading}
        disabled={loading}
      >
        {translate("post.create.actions.publish")}
      </Button>
      <Button variant="outlined" onClick={handleCreateDraft}>
        {translate("post.create.actions.save_draft")}
      </Button>
    </Grid>
  );
}

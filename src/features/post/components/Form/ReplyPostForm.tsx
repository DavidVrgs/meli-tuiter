import { Button, Grid, TextField } from "@mui/material";
import { useState, type JSX } from "react";
import { useTranslation } from "../../../../shared";

import { PaperCard } from "../../../../shared/components";

export interface ReplyPostFormProp {
  createReply: (message: string) => void;
  loading: boolean;
}

export function ReplyPostForm({
  loading,
  createReply,
}: Readonly<ReplyPostFormProp>): JSX.Element {
  const { t: translate } = useTranslation("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangeReply = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleCreateReply = () => {
    if (!message) return setError(translate("form.required"));
    setMessage("");
    createReply(message);
  };

  return (
    <PaperCard title={translate("post.replies.input.your_reply")}>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={handleChangeReply}
          error={!!error}
          helperText={!!error && error}
          placeholder={translate("post.replies.placeholders.write_your_reply")}
        />
        <Button
          variant="contained"
          onClick={handleCreateReply}
          loading={loading}
          disabled={loading}
        >
          {translate("post.replies.actions.post_reply")}
        </Button>
      </Grid>
    </PaperCard>
  );
}

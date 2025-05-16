import { Grid, Paper, Typography } from "@mui/material";
import styles from "../../Post.styles";
import { useTranslation } from "../../../../shared";
import type { JSX } from "react";

export interface DraftPostsFormProp {
  draftPosts: string[];
  onLoadDraft: (index: number) => void;
}

export function DraftPostsForm({
  draftPosts,
  onLoadDraft,
}: Readonly<DraftPostsFormProp>): JSX.Element {
  const { t: translate } = useTranslation("post.create");

  return (
    <Grid container spacing={2} sx={styles.draftContainer} direction="column">
      <Typography variant="h4">{translate("draft.your_draft")}</Typography>
      {draftPosts.map((draft, index) => (
        <Paper
          key={`draft-post-${draft}`}
          sx={styles.draftPaper}
          onClick={() => onLoadDraft(index)}
        >
          <Typography variant="body1">{draft}</Typography>
          <Typography variant="body2" color="textDisabled">
            {translate("draft.messages.click_to_load")}
          </Typography>
        </Paper>
      ))}
    </Grid>
  );
}

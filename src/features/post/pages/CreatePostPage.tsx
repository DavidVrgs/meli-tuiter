import type { JSX } from "react";
import { Divider, Paper } from "@mui/material";
import { useTranslation } from "../../../shared";
import { PostCreateForm } from "../components/Form/PostCreateForm";
import useDraftPost from "../hooks/useDraftPost.hook";
import { DraftPostsForm } from "../components/Form/DraftPostsForm";
import { PageContainer } from "../../../shared/components";

function CreatePostPage(): JSX.Element {
  const { t: translate } = useTranslation("post.create");
  const {
    draftPosts,
    draftLoaded,
    handleDraftLoaded,
    createDraft,
    removeDraft,
  } = useDraftPost();

  const onLoadDraft = (index: number) => {
    removeDraft(index);
    handleDraftLoaded(draftPosts[index]);
  };

  return (
    <PageContainer title={translate("title")} subtitle={translate("subtitle")}>
      <Paper sx={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
        <PostCreateForm createDraft={createDraft} customMessage={draftLoaded} />
        <Divider />
        <DraftPostsForm draftPosts={draftPosts} onLoadDraft={onLoadDraft} />
      </Paper>
    </PageContainer>
  );
}

export default CreatePostPage;

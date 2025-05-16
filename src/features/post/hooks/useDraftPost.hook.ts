import { useEffect, useState } from "react";
import { secureParseJson } from "../../../shared/utils/secureParseJson";
import {
  deleteItemOfArrayInStorage,
  saveInStorage,
} from "../../../shared/utils/localStorage";

export default function useDraftPost() {
  const [draftPosts, setDraftPosts] = useState<string[]>([]);
  const [draftLoaded, setDraftLoaded] = useState<string | undefined>();

  useEffect(() => {
    const draftPost = localStorage.getItem("draft_post");
    setDraftPosts(secureParseJson(draftPost) ?? []);
  }, []);

  const createDraft = (message: string) => {
    saveInStorage("draft_post", [...draftPosts, message]);
    setDraftPosts((prev) => [...prev, message]);
  };

  const removeDraft = (index: number) => {
    const newDrafts = deleteItemOfArrayInStorage(
      "draft_post",
      index,
      draftPosts
    );
    setDraftPosts(newDrafts);
  };

  const handleDraftLoaded = (draft: string) => {
    setDraftLoaded(draft);
  };

  return {
    draftPosts,
    draftLoaded,
    createDraft,
    removeDraft,
    handleDraftLoaded,
  };
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { secureParseJson } from "../../../shared/utils/secureParseJson";
import type { Post } from "../../../shared/interfaces/post";
import { useQuery } from "../../../shared/hooks/useQuery";
import { createReply, getPostReplies } from "../api/post.api";
import { useMutation } from "../../../shared/hooks/useMutation";
import { useNotification } from "../../../shared/contexts/notification/NotificationContext";
import { useTranslation } from "../../../shared";

export default function usePostReplies() {
  const params = useParams();
  const postId = Number(params?.id);
  const [post, setPost] = useState<Post | undefined>();
  const { createNotification } = useNotification();
  const { t: translate } = useTranslation("post.replies");

  /*   const { data: post } = useQuery({
    queryKey: ["getPostById"],
    queryFn: () => getPostById(Number(postId)),
    skip: isNaN(postId) || !postId,
  });
	     ¡¡IMPORTANTE!! EL endpoint que obtiene un post por ID no está funcionando, 
				Hice una alternativa con localStorage
 */

  useEffect(() => {
    const posts = secureParseJson<Post[]>(localStorage.getItem("posts"));
    const foundPost = posts?.find((post) => post.id === postId);
    setPost(foundPost);
  }, [postId]);

  const {
    data: replies,
    refetch,
    isPending: loadingReplies,
  } = useQuery({
    queryKey: ["getPostReplies"],
    queryFn: () => getPostReplies(Number(postId)),
  });

  const { mutate: fetchCreateReply, isPending: creatingReply } = useMutation({
    mutationFn: createReply,
    options: {
      onSuccess: () => {
        refetch();
        createNotification({
          message: translate("notifications.reply_created"),
          type: "success",
        });
      },
    },
  });

  const handleCreateReply = (message: string) => {
    fetchCreateReply({
      message,
      postId,
    });
  };

  return {
    handleCreateReply,
    refetch,
    loadingReplies,
    creatingReply,
    post,
    replies: replies ?? [],
  };
}

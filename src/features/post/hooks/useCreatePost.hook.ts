import { useNavigate } from "react-router-dom";
import { useMutation } from "../../../shared/hooks/useMutation";
import { createPost } from "../api/post.api";

export default function useCreatePost() {
  const navigate = useNavigate();

  const { mutate: fetchCreatePost, isPending } = useMutation({
    mutationFn: createPost,
    options: {
      onSuccess: () => {
        navigate("/feed");
      },
    },
  });

  return {
    fetchCreatePost,
    loading: isPending,
  };
}

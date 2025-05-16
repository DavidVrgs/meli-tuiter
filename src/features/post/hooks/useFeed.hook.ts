import { useEffect } from "react";
import { useQuery } from "../../../shared/hooks/useQuery";

import { getFeed } from "../api/post.api";

export default function useFeed() {
  const { data, refetch } = useQuery({
    queryKey: ["feeds"],
    queryFn: getFeed,
  });

  useEffect(() => {
    //Se guarda en localStorage para usar una alternativa a la falla del endpoint para obtener un Post (Tuit) por ID
    window.localStorage.setItem("posts", JSON.stringify(data));
  }, [data]);

  return {
    data: data ?? [],
    refetch,
  };
}

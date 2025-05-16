import { useCallback, useEffect, useMemo, useState } from "react";
import { secureParseJson } from "../utils/secureParseJson";
import type { FavoriteUser } from "../interfaces/user";
import {
  deleteItemOfArrayInStorage,
  saveInStorage,
} from "../utils/localStorage";
import type { Post } from "../interfaces/post";
import { useAuth } from "../contexts";
import { useMutation } from "./useMutation";
import {
  addFavoritePost,
  removeFavoritePost,
} from "../../features/post/api/post.api";

interface FavoriteProp {
  refetch?: () => void;
}

export default function useFavorite({ refetch }: FavoriteProp) {
  const [favoriteUsers, setFavoriteUsers] = useState<FavoriteUser[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const favoriteUsersItem = localStorage.getItem("favorite_users");
    setFavoriteUsers(secureParseJson(favoriteUsersItem) ?? []);
  }, []);

  const { mutate: addFavorite } = useMutation({
    mutationFn: addFavoritePost,
    options: {
      onSuccess: () => refetch?.(),
    },
  });
  const { mutate: removeFavorite } = useMutation({
    mutationFn: removeFavoritePost,
    options: {
      onSuccess: () => refetch?.(),
    },
  });

  const onFavoriteClick = (post: Post) => {
    if (post.liked) removeFavorite(post.id);
    else addFavorite(post.id);
  };

  const onFollowUserClick = (user: FavoriteUser) => {
    const userFollowedIndex = favoriteUsers.findIndex(
      (favoriteUser) => user.author === favoriteUser.author
    );

    if (userFollowedIndex < 0) {
      saveInStorage("favorite_users", [...favoriteUsers, user]);
      setFavoriteUsers([...favoriteUsers, user]);
    } else {
      removeFavoriteUser(userFollowedIndex);
    }
  };

  const removeFavoriteUser = (index: number) => {
    const newFavoriteUsers = deleteItemOfArrayInStorage(
      "favorite_users",
      index,
      favoriteUsers
    );
    setFavoriteUsers(newFavoriteUsers);
  };

  const hiddeFavoriteUserAction = useCallback(
    (post: Post) => user?.name === post.author,
    [user]
  );

  const favoriteUsersObject = useMemo(
    () =>
      favoriteUsers.reduce<{
        [key: string]: FavoriteUser;
      }>((prev, curr) => {
        if (!prev[`${curr.avatar_url}-${curr.author}`])
          prev[`${curr.avatar_url}-${curr.author}`] = curr;

        return prev;
      }, {}),
    [favoriteUsers]
  );

  const isFavoriteUser = useCallback(
    (user: Post) => !!favoriteUsersObject[`${user.avatar_url}-${user.author}`],
    [favoriteUsersObject]
  );

  return {
    favoriteUsers,
    onFavoriteClick,
    hiddeFavoriteUserAction,
    isFavoriteUser,
    onFollowUserClick,
    removeFavoriteUser,
  };
}

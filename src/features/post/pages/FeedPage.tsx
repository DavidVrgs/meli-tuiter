import type { JSX } from "react";
import { Box, Pagination } from "@mui/material";
import { useTranslation } from "../../../shared";
import useFeed from "../hooks/useFeed.hook";
import { PageContainer } from "../../../shared/components";
import { usePagination } from "../../../shared/hooks/usePagination";
import { PostCardList } from "../components/PostCardList";
import { PAGINATION_COUNT } from "../../../shared/constant/pagination";

export default function FeedPage(): JSX.Element {
  const { t: translate } = useTranslation("post.feed");
  const { handlePage, page, rowsPerPage } = usePagination({});
  const { data, refetch, loading } = useFeed({ page });

  return (
    <PageContainer title={translate("title")}>
      <PostCardList posts={data} refetch={refetch} loading={loading} />

      <Box marginY={3}>
        <Pagination
          variant="outlined"
          page={page}
          onChange={handlePage}
          count={
            data.length < rowsPerPage ? rowsPerPage * page : PAGINATION_COUNT
          }
          showFirstButton={false}
          showLastButton={false}
          siblingCount={0}
          boundaryCount={0}
        />
      </Box>
    </PageContainer>
  );
}

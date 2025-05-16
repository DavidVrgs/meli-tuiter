import { Paper, Typography } from "@mui/material";
import type { JSX, ReactNode } from "react";

export interface PaperCardProp {
  title?: string;
  children: ReactNode;
}

export function PaperCard({
  children,
  title,
}: Readonly<PaperCardProp>): JSX.Element {
  return (
    <Paper
      style={{
        padding: "25px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {title && (
        <Typography variant="h3" sx={{ marginBottom: "10px" }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}

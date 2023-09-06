import Color from "@/utils/color";
import { Chip, Tooltip } from "@mui/material";

export const ToolTipChip = ({
  title,
  label,
  color,
  isDesc,
}: {
  title: string;
  label: string;
  color?: string;
  isDesc: boolean;
}) => (
  <Tooltip title={title} arrow disableHoverListener={!isDesc}>
    <Chip
      label={label}
      sx={{
        marginTop: 1,
        borderRadius: 1,
        bgcolor: color ?? Color.grey[300],
        marginRight: 1,
        fontWeight: "bold",
        color: Color.primary.main,
        border: `1px solid ${Color.grey[400]}`,
      }}
    />
  </Tooltip>
);

import Color from "@/utils/color";
import { Stack, Typography } from "@mui/material";

export const LogoText = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={0.5}>
      {icon}
      <Typography
        variant="caption"
        fontWeight="bold"
        color={Color.text.main}
        fontSize="14px"
      >
        {text}
      </Typography>
    </Stack>
  );
};

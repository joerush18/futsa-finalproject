import Color from "@/utils/color";
import { Box } from "@mui/material";

interface IconBoxProps {
  icon: React.ReactNode;
  color: string;
}

const IconBox = ({ icon, color }: IconBoxProps) => {
  return (
    <Box p="14px" bgcolor={color} color={Color.white.main} borderRadius={3}>
      {icon}
    </Box>
  );
};

export default IconBox;

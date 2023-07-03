import Color from "@/utils/color";
import { Box, Typography } from "@mui/material";

const ImageUpload = () => {
  return (
    <Box
      sx={{
        padding: 5,
        border: "1px dashed #ccc",
        width: "max-content",
        "&:hover": {
          cursor: "pointer",
        },
        borderRadius: 4,
        backgroundColor: Color.background.default,
        mt: 2,
      }}
    >
      <input type="file" hidden required />
      <Typography>Upload Avatar</Typography>
    </Box>
  );
};

export default ImageUpload;

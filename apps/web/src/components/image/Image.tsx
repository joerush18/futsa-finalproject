import { Box } from "@mui/material";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: string;
  height?: string;
}

const Image = ({ src, width, height }: ImageProps) => {
  return (
    <Box
      sx={{
        width: width ?? "100%",
        height: height ?? "300px",
        zIndex: 0,
      }}
    >
      <img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
        alt="futsal"
      />
    </Box>
  );
};

export default Image;

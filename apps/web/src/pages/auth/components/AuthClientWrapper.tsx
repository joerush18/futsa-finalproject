import Image from "@/components/image/Image";
import Color from "@/utils/color";
import { Box, Typography } from "@mui/material";

interface AuthClientWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle: string;
}

const AuthClientWrapper = ({
  title,
  subtitle,
  children,
}: AuthClientWrapperProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box>
        <Image
          height="400px"
          width="full"
          src="/images/home_futsa.png"
          alt="img-home"
        />
      </Box>
      <Box
        sx={{
          width: "470px",
          border: `1px solid ${Color.grey[300]}`,
          py: 2,
          px: 6,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            margin: "auto",
          }}
        >
          <Image
            height="80px"
            width="80px"
            src="/images/logo.png"
            alt="img-home"
          />
        </Box>
        <Typography variant="h3" lineHeight={0} marginY={2}>
          {title}
        </Typography>
        <Typography marginBottom={2}>{subtitle}</Typography>
        {children}
      </Box>
    </Box>
  );
};
export default AuthClientWrapper;

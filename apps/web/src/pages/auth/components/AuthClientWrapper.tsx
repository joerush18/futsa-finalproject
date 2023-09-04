
import Image from "@/components/image/Image";
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        bgcolor="white"
        sx={{
          height: "100%",
          width: "100%",
          paddingTop : "10%",
          paddingLeft : "50px"
        }}
      >
        <Image height="500px" width="full" src="/images/home_futsa.png" alt="img-home"/>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
          padding: 16,
        }}
      >
        <Box
          sx={{
            width: "350px",
          }}
        >
          <Image height="100px" width="100px" src="/images/logo.png" alt="img-home"/>
          <Typography variant="h3" >{title}</Typography>
          <Typography marginBottom={2}>{subtitle}</Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default AuthClientWrapper;

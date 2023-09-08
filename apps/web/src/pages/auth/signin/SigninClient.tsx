import { FormInputText } from "@/components/ui/InputBox";
import { Button, Stack, Typography } from "@mui/material";
import { ISignUpCredentials } from "core/src/types/users.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "core/src/validations/validations";
import Color from "@/utils/color";
import AuthClientWrapper from "../components/AuthClientWrapper";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginEmail } from "core/src/db/hooks/useAuth";
import { toast } from "react-hot-toast";

type FormInputs = Pick<ISignUpCredentials, "email" | "password">;

const SigninClient = () => {
  const defaultValues: FormInputs = {
    email: "",
    password: "",
  };

  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: defaultValues,
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: loginEmailPassword, isLoading } = useLoginEmail();
  const navigate = useNavigate();

  const onSignInHandler = async (values: FormInputs) => {
    loginEmailPassword(values, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error: unknown) => {
        const e = error as Error;
        toast.error(e?.message?.split(".")[0]);
      },
    });
  };

  return (
    <AuthClientWrapper
      title="Welcome back"
      subtitle="Please enter your credentials to continue."
    >
      <form onSubmit={handleSubmit(onSignInHandler)}>
        <FormInputText
          name={"email"}
          control={control}
          label={"Email"}
          type="email"
        />
        <FormInputText
          name={"password"}
          control={control}
          label={"Password"}
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
      </form>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mt={2}
      >
        <Typography>Not a member ? </Typography>
        <NavLink to="/signup">
          <Typography
            color={Color.primary.main}
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Signup now
          </Typography>
        </NavLink>
      </Stack>
    </AuthClientWrapper>
  );
};

export default SigninClient;

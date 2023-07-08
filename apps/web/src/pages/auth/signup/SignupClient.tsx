"use client";

import { FormInputText } from "@/components/ui/InputBox";
import { Button, Stack, Typography } from "@mui/material";
import { ISignUpCredentials, ROLES } from "core/src/types/users.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "core/src/validations/validations";
import Color from "@/utils/color";
import AuthClientWrapper from "../components/AuthClientWrapper";
import { useSignupEmail } from "core/src/db/hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

const SignupClient = () => {
  const navigate = useNavigate();
  const { mutate: signUpWithEmail, isLoading } = useSignupEmail();

  type FormInputs = Partial<ISignUpCredentials>;
  const defaultValues: FormInputs = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
  };

  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: defaultValues,
    resolver: zodResolver(SignUpSchema),
  });

  const onSignUpHandler = (values: FormInputs) => {
    if (!values) {
      return;
    }
    const _futsal: FormInputs = {
      role: "futsal" as ROLES.FUTSAL,
      ...values,
    };
    signUpWithEmail(_futsal as ISignUpCredentials);
    navigate("/");
  };

  return (
    <AuthClientWrapper
      title="Join us today"
      subtitle="Please enter your credentials to become a member"
    >
      <form onSubmit={handleSubmit(onSignUpHandler)}>
        <FormInputText
          name={"fullName"}
          control={control}
          label={"Futsal Name"}
        />
        <FormInputText
          name={"phoneNumber"}
          control={control}
          label={"Phone Number"}
        />
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
        <FormInputText
          name={"confirmPassword"}
          control={control}
          label={"Confirm Password"}
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mt={2}
      >
        <Typography>Already a member ? </Typography>
        <NavLink to="/signin">
          <Typography
            color={Color.primary.main}
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Signin now
          </Typography>
        </NavLink>
      </Stack>
    </AuthClientWrapper>
  );
};
export default SignupClient;

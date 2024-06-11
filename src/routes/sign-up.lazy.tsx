import {
  CardHeader,
  TextField,
  Link as MatLink,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import abstract1 from "@/assets/abstract1.jpg";
import { login, signUp } from "@/services/pocketbase";
import { FieldApi, useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import * as v from "valibot";
import { ClientResponseError } from "pocketbase";
import { Helmet } from "react-helmet";

export const Route = createLazyFileRoute("/sign-up")({
  component: SignUp,
});

type FieldProps = {
  field: FieldApi<any, any, any, any>;
  type?: string;
  error: string | undefined;
};

function Field({ field, type, error }: FieldProps) {
  return (
    <TextField
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) =>
        field.handleChange((e.target as HTMLTextAreaElement).value)
      }
      error={field.state.meta.errors.length >= 1 || error != undefined}
      helperText={field.state.meta.errors[0] || error}
      label={field.name}
      type={type ?? "text"}
      variant="outlined"
      margin="normal"
    />
  );
}

function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    undefined as
      | { [key: string]: { code: string; message: string } }
      | undefined,
  );
  const navigate = useNavigate({ from: "/sign-up" });

  const form = useForm({
    validatorAdapter: valibotValidator,
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      signUp(value.username, value.email, value.password)
        .then(() => {
          login(value.email, value.password).then(() => {
            navigate({
              to: "/feed",
            });
          });
        })
        .catch((e: ClientResponseError) => {
          setError(e.data.data);
          setLoading(false);
        });
    },
  });

  return (
    <>
      <Helmet>
        <title>Sign up / Y</title>
      </Helmet>
      <form
        className="h-full flex justify-center items-center flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardHeader title="Sign up" />
        <form.Field
          name="username"
          validators={{
            onBlur: v.string([
              v.minLength(4, "Must be at least 4 characters"),
              v.excludes(" ", "Cannot contain spaces"),
            ]),
          }}
        >
          {(field) => (
            <Field field={field} type="text" error={error?.username?.message} />
          )}
        </form.Field>
        <form.Field
          name="email"
          validators={{
            onBlur: v.string([v.email("Must be a valid email")]),
          }}
        >
          {(field) => (
            <Field field={field} type="email" error={error?.email?.message} />
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{
            onBlur: v.string([v.minLength(8, "Must be at least 8 characters")]),
          }}
        >
          {(field) => (
            <Field
              field={field}
              type="password"
              error={error?.password?.message}
            />
          )}
        </form.Field>
        <div className="w-full flex justify-center items-center">
          <LoadingButton loading={loading} variant="contained" type="submit">
            Sign up
          </LoadingButton>
        </div>
        <hr className="border-1 border-grey-950 my-4" />
        <p>
          Already have an account?{" "}
          <MatLink component={Link} to="/login">
            Login
          </MatLink>
        </p>
        <Typography variant="caption" className="text-slate-400">
          Dont worry. I took the time to encrypt passwords!
        </Typography>
      </form>
    </>
  );
}

function SignUp() {
  return (
    <Grid container className="h-screen">
      <Grid xs={0} md={8}>
        <img src={abstract1} className="w-full h-screen object-cover" />
      </Grid>
      <Grid xs={12} md={4}>
        <Form />
      </Grid>
    </Grid>
  );
}

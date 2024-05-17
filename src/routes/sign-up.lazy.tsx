import { CardHeader, TextField, Link as MatLink, Alert, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import { HTMLInputTypeAttribute, useState } from "react";
import abstract1 from "@/assets/abstract1.jpg";
import { signUp } from "@/services/pocketbase";
import { FieldApi, useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import * as v from "valibot";
import { ClientResponseError } from "pocketbase";

export const Route = createLazyFileRoute("/sign-up")({
  component: SignUp,
});

type FieldProps = {
  field: FieldApi<any, any, any, any>;
  type?: HTMLInputTypeAttribute;
};

function Field({ field, type }: FieldProps) {
  return (
    <TextField
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      error={field.state.meta.errors.length >= 1}
      helperText={field.state.meta.errors[0]}
      label={field.name}
      type={type ?? "text"}
      variant="outlined"
      margin="normal"
    />
  );
}

function Form() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined as string | undefined);
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
          navigate({
            to: "/feed",
          });
        })
        .catch((e: ClientResponseError) => {
          const err =
            e.data.data.username ?? e.data.data.email ?? e.data.data.password;
          setError(err.message);
          setLoading(false);
        });
    },
  });

  return (
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
          onBlur: v.string([v.minLength(4, "Must be at least 4 characters")]),
        }}
        children={(field) => <Field field={field} type="text" />}
      />
      <form.Field
        name="email"
        validators={{
          onBlur: v.string([v.email("Must be a valid email")]),
        }}
        children={(field) => <Field field={field} type="email" />}
      />
      <form.Field
        name="password"
        validators={{
          onBlur: v.string([v.minLength(8, "Must be at least 8 characters")]),
        }}
        children={(field) => <Field field={field} type="password" />}
      />
      {error == undefined ? (
        <></>
      ) : (
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      )}
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
			<Typography variant="caption" className="text-slate-400">Dont worry. I took the time to encrypt passwords!</Typography>
    </form>
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

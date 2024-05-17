import { CardHeader, TextField, Link as MatLink, Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import LoadingButton from "@mui/lab/LoadingButton";
import { HTMLInputTypeAttribute, useState } from "react";
import abstract1 from "@/assets/abstract1.jpg";
import { login } from "@/services/pocketbase";
import { FieldApi, useForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import * as v from "valibot";
import { ClientResponseError } from "pocketbase";

export const Route = createLazyFileRoute("/login")({
  component: Login,
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
  const navigate = useNavigate({ from: "/login" });

  const form = useForm({
    validatorAdapter: valibotValidator,
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      setLoading(true);
      setError(undefined);
      login(value.email, value.password)
        .then(() => {
          navigate({
            to: "/feed",
          });
        })
        .catch((e: ClientResponseError) => {
          setError(e.data.message);
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
      <CardHeader title="Login" />
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
      <div className="w-full flex justify-center items-center">
        <LoadingButton loading={loading} variant="contained" type="submit">
          Login
        </LoadingButton>
      </div>
      <hr className="border-1 border-grey-950 my-4" />
      {error == undefined ? (
        <></>
      ) : (
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      )}
      <p>
        Dont have an account?{" "}
        <MatLink component={Link} to="/sign-up">
          Sign up
        </MatLink>
      </p>
    </form>
  );
}

function Login() {
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

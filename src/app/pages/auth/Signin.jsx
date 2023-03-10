import { useContext } from "react";

import { URI } from "@constants/api";
import { ThemeContext } from "@context/ThemeContext";
import { UserContext } from "@context/UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./Auth.css";

export default function Signin() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    await axios.post(URI + "auth/login", data).then(({ data }) => {
      if (data.error) {
        alert(data.error);
      } else {
        setUser({
          id: data.id,
          isLoggedIn: true,
          username: data.username,
        });
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    });
  };

  return (
    <main className="form-signin w-100 m-auto auth__main">
      <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="h3 text-center">
          <FormattedMessage id="app.auth.sign-in" />
        </div>
        <label className="mt-3 mb-1">
          <FormattedMessage id="app.auth.sign-in.username" />
        </label>
        <input
          {...register("username", { required: true, maxLength: 20 })}
          className="form-control"
        ></input>

        <label className="mt-3 mb-1">
          <FormattedMessage id="app.auth.sign-in.password" />
        </label>
        <input
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
          className="form-control"
        ></input>
        <button className="w-100 btn btn-primary my-3" type="submit">
          <FormattedMessage id="app.auth.sign-in.btn" />
        </button>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
      </form>
    </main>
  );
}

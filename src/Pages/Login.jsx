import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SkyBackground from "../Components/SkyBackground";
import { useAuth } from "../Context/AuthContext";

function Login() {

  const { login, loginGoogle } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {

    e.preventDefault();

    setError("");

    try {

      await login(email, password);

      navigate("/", {
        replace: true
      });

    } catch (error) {

      console.error(error);

      setError(
        "Correo o contraseña incorrectos."
      );

    }

  }

  async function google() {

    setError("");

    try {

      await loginGoogle();

      navigate("/", {
        replace: true
      });

    } catch (error) {

      console.error(error);

      setError(
        error.code || "No se pudo iniciar sesión con Google."
      );

    }

  }

  return (

    <SkyBackground>

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-6
        "
      >

        <section
          className="
            w-full
            max-w-md
            rounded-3xl
            bg-white/10
            backdrop-blur-3xl
            p-8
            shadow-2xl
            border
            border-white/10
          "
        >

          <h1
            className="
              text-4xl
              font-bold
              text-white
              text-center
              mb-2
            "
          >
            Bienvenida a Ilargi
          </h1>

          <p
            className="
              text-center
              text-white/70
              mb-8
            "
          >
            Inicia sesión para continuar
          </p>

          <form
            onSubmit={submit}
            className="space-y-4"
          >

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                rounded-2xl
                bg-white/20
                px-4
                py-3
                text-white
                placeholder:text-white/60
                outline-none
              "
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                rounded-2xl
                bg-white/20
                px-4
                py-3
                text-white
                placeholder:text-white/60
                outline-none
              "
            />

            {

              error && (

                <p className="text-red-300 text-sm">

                  {error}

                </p>

              )

            }

            <button
              type="submit"
              className="
                w-full
                py-3
                rounded-2xl
                bg-white/20
                hover:bg-white/30
                transition
                text-white
                font-semibold
              "
            >
              Entrar
            </button>

          </form>

          <button
            onClick={google}
            className="
              w-full
              mt-4
              py-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              transition
              text-white
              font-semibold
            "
          >
            Continuar con Google
          </button>

          <button
            onClick={() => navigate("/register")}
            className="
              w-full
              mt-6
              text-white/70
              hover:text-white
              transition
            "
          >
            Crear cuenta
          </button>

        </section>

      </main>

    </SkyBackground>

  );

}

export default Login;
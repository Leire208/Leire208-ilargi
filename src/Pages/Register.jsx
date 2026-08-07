import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SkyBackground from "../Components/SkyBackground";
import { useAuth } from "../Context/AuthContext";

function Register() {

  const { register, loginGoogle } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {

    e.preventDefault();

    setError("");

    try {

      await register(
        email,
        password
      );

      navigate("/", {
        replace: true
      });

    } catch (err) {

      console.error(err);

      if (err.code === "auth/email-already-in-use") {

        setError(
          "Este correo ya tiene una cuenta."
        );

      } else if (err.code === "auth/weak-password") {

        setError(
          "La contraseña debe tener al menos 6 caracteres."
        );

      } else {

        setError(
          "No se pudo crear la cuenta."
        );

      }

    }

  }

  async function google() {

    setError("");

    try {

      await loginGoogle();

      navigate("/", {
        replace: true
      });

    } catch (err) {

      console.error(err);

      setError(
        "No se pudo iniciar sesión con Google."
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
            Crear cuenta
          </h1>

          <p
            className="
              text-center
              text-white/70
              mb-8
            "
          >
            Bienvenida a Ilargi
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

            {error && (
              <p className="text-red-300 text-sm">
                {error}
              </p>
            )}

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
              Crear cuenta
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
            onClick={() => navigate("/login")}
            className="
              w-full
              mt-6
              text-white/70
              hover:text-white
              transition
            "
          >
            Ya tengo cuenta
          </button>

        </section>

      </main>

    </SkyBackground>

  );

}

export default Register;
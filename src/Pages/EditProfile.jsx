import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SkyBackground from "../Components/SkyBackground";

import { useUser } from "../Context/UserContext";
import { useTheme } from "../Context/ThemeContext";


function EditProfile() {


  const navigate = useNavigate();

  const { user, updateUser } = useUser();

  const { styles } = useTheme();



  const [form, setForm] = useState({

    name: user?.name || "",

    career: user?.career || "",

    university: user?.university || ""

  });



  function change(e) {


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  }



  function save() {


    updateUser(form);

    navigate("/profile");


  }



  return (

    <SkyBackground>


      <main

        className="
          min-h-screen
          max-w-xl
          mx-auto
          px-6
          pt-8
          pb-36
        "

      >


        <section

          className={`
            rounded-3xl
            p-6
            shadow-xl
            ${styles.card}
          `}

        >


          <h1 className="text-3xl font-bold text-white mb-8">

            Editar perfil

          </h1>



          <Input

            label="Nombre"

            name="name"

            value={form.name}

            onChange={change}

          />



          <Input

            label="Carrera"

            name="career"

            value={form.career}

            onChange={change}

          />



          <Input

            label="Universidad"

            name="university"

            value={form.university}

            onChange={change}

          />



          <button

            onClick={save}

            className="
              w-full
              mt-6
              py-4
              rounded-2xl
              bg-white/20
              text-white
              font-semibold
            "

          >

            Guardar

          </button>



        </section>


      </main>


    </SkyBackground>

  );

}



function Input({

  label,

  ...props

}) {


  return (

    <div className="mb-4">


      <p className="text-white/70 mb-2">

        {label}

      </p>



      <input

        {...props}

        className="
          w-full
          rounded-2xl
          bg-white/20
          border
          border-white/20
          px-4
          py-3
          text-white
          outline-none
        "

      />


    </div>

  );

}



export default EditProfile;
import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SkyBackground from "../SkyBackground";

import { useUser } from "../../Context/UserContext";
import { useTheme } from "../../Context/ThemeContext";


function EditProfile() {


  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const { styles } = useTheme();



  const [form, setForm] = useState({

    name: user.name || "",

    career: user.career || "",

    university: user.university || "",

    photo: user.photo || ""

  });





  function handleChange(e){


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  }





  function changePhoto(e){


    const file = e.target.files[0];


    if(!file) return;



    const reader = new FileReader();



    reader.onload = () => {


      setForm({

        ...form,

        photo: reader.result

      });


    };



    reader.readAsDataURL(file);


  }






  function save(){


    setUser({

      ...user,

      ...form

    });



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
          pb-20
        "

      >




        <button

          onClick={() => navigate(-1)}

          className="
            flex
            items-center
            gap-2
            text-white
            mb-8
          "

        >

          <ArrowLeft size={22}/>

          Volver


        </button>





        <section

          className={`
            rounded-3xl
            p-6
            shadow-xl
            ${styles.card}
          `}

        >




          <h1

            className="
              text-3xl
              font-bold
              text-white
              mb-8
            "

          >

            Editar perfil

          </h1>






          <div

            className="
              flex
              justify-center
              mb-8
            "

          >


            <label

              className="
                relative
                w-28
                h-28
                rounded-full
                bg-white/20
                border
                border-white/30
                flex
                items-center
                justify-center
                overflow-hidden
                cursor-pointer
              "

            >


              {

                form.photo ? (


                  <img

                    src={form.photo}

                    className="
                      w-full
                      h-full
                      object-cover
                    "

                  />


                ) : (


                  <Camera

                    size={40}

                    className="text-white"

                  />


                )


              }





              <input

                type="file"

                accept="image/*"

                onChange={changePhoto}

                className="hidden"

              />



            </label>



          </div>







          <Input

            label="Nombre"

            name="name"

            value={form.name}

            onChange={handleChange}

          />





          <Input

            label="Carrera"

            name="career"

            value={form.career}

            onChange={handleChange}

          />






          <Input

            label="Universidad"

            name="university"

            value={form.university}

            onChange={handleChange}

          />







          <button

            onClick={save}

            className="
              mt-6
              w-full
              py-4
              rounded-2xl
              bg-white/20
              text-white
              font-semibold
            "

          >

            Guardar cambios


          </button>





        </section>




      </main>


    </SkyBackground>

  );

}







function Input({

  label,

  name,

  value,

  onChange

}){


  return (

    <div className="mb-5">


      <p className="
        text-white/70
        text-sm
        mb-2
      ">

        {label}


      </p>




      <input

        name={name}

        value={value}

        onChange={onChange}

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
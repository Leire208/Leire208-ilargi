import { useState } from "react";
import { Plus } from "lucide-react";

import SkyBackground from "../Components/SkyBackground";

import AddSubjectModal from "../Components/Subjects/AddSubjectModal";

import { useSubjects } from "../Context/SubjectContext";
import { useTheme } from "../Context/ThemeContext";



function Subjects() {


  const [showModal, setShowModal] = useState(false);


  const { subjects } = useSubjects();

  const { styles } = useTheme();



  return (

    <SkyBackground>


      <main

        className="
          min-h-screen
          max-w-4xl
          mx-auto
          px-6
          pt-8
          pb-36
        "

      >



        <div className="flex justify-between items-center mb-8">


          <h1 className="text-3xl font-bold text-white">

            Asignaturas

          </h1>



          <button


            onClick={()=>setShowModal(true)}


            className="
              w-12
              h-12
              rounded-full
              bg-white/20
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/30
              transition
            "


          >

            <Plus/>

          </button>



        </div>







        <section


          className={`

            rounded-3xl

            p-6

            shadow-xl

            ${styles.card}

          `}


        >



          {

            subjects.length === 0 && (


              <p className="text-white/70">


                No tienes asignaturas todavía.


              </p>


            )


          }





          <div className="space-y-4">



            {

              subjects.map(subject=>(


                <div


                  key={subject.id}


                  className="
                    rounded-2xl
                    bg-white/10
                    p-4
                    flex
                    items-center
                    gap-4
                  "


                >




                  <div


                    className="
                      w-6
                      h-6
                      rounded-full
                    "


                    style={{

                      background:subject.color

                    }}


                  />





                  <div className="flex-1">


                    <h2 className="text-white font-semibold">


                      {subject.name}


                    </h2>





                    {

                      subject.teacher && (


                        <p className="text-white/60 text-sm">


                          {subject.teacher}


                        </p>


                      )


                    }





                    {

                      subject.credits && (


                        <p className="text-white/50 text-sm">


                          {subject.credits} créditos


                        </p>


                      )


                    }



                  </div>



                </div>


              ))


            }



          </div>



        </section>






      </main>




      <AddSubjectModal


        open={showModal}


        close={()=>setShowModal(false)}


      />



    </SkyBackground>


  );

}



export default Subjects;
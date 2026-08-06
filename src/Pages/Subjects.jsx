import { useState } from "react";
import { Plus, Trash2, BookOpen } from "lucide-react";

import SkyBackground from "../Components/SkyBackground";

import AddSubjectModal from "../Components/Subjects/AddSubjectModal";

import { useSubjects } from "../Context/SubjectContext";
import { useTheme } from "../Context/ThemeContext";
import { useLanguage } from "../Context/LanguageContext";



function Subjects(){



  const { subjects, removeSubject } = useSubjects();


  const { styles } = useTheme();


  const { texts } = useLanguage();





  const [open,setOpen] = useState(false);








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


            {texts.subjects}


          </h1>







          <button


            onClick={()=>setOpen(true)}


            className="
              w-12
              h-12
              rounded-full
              bg-white/20
              text-white
              flex
              items-center
              justify-center
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


              <p className="text-white/60">


                {texts.noSubjects}


              </p>


            )


          }







          <div className="space-y-4">






            {


              subjects.map(subject=>(



                <div


                  key={subject.id}


                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-white/10
                    p-4
                  "


                >





                  <div className="flex items-center gap-4">



                    <div


                      className="
                        w-10
                        h-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                      "


                      style={{


                        background:subject.color


                      }}


                    >


                      <BookOpen className="text-white"/>


                    </div>






                    <h2 className="text-white font-semibold">


                      {subject.name}


                    </h2>





                  </div>







                  <button


                    onClick={()=>removeSubject(subject.id)}


                    className="
                      p-3
                      rounded-xl
                      bg-red-500/20
                      text-red-200
                    "


                  >


                    <Trash2 size={18}/>


                  </button>





                </div>



              ))



            }






          </div>






        </section>







      </main>






      <AddSubjectModal


        open={open}


        close={()=>setOpen(false)}


      />





    </SkyBackground>



  );


}



export default Subjects;
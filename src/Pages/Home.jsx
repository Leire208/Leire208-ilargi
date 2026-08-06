import SkyBackground from "../Components/SkyBackground";

import NextEventCard from "../Components/Home/NextEventCard";

import { useUser } from "../Context/UserContext";
import { useTheme } from "../Context/ThemeContext";
import { useLanguage } from "../Context/LanguageContext";
import { useEvents } from "../Context/EventContext";
import { useTasks } from "../Context/TaskContext";


function Home() {


  const { user } = useUser();

  const { styles } = useTheme();

  const { texts } = useLanguage();

  const { events } = useEvents();

  const { tasks } = useTasks();





  const pendingTasks = tasks.filter(

    task => !task.completed

  );





  const nextEvent = events

    .sort(

      (a,b)=>

        new Date(a.date)-new Date(b.date)

    )[0];







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



        <section


          className={`

            rounded-3xl

            p-6

            mb-6

            shadow-xl

            ${styles.card}

          `}


        >



          <h1 className="text-3xl font-bold text-white">


            {texts.homeGreeting}, {user.name} 👋


          </h1>




          <p className="text-white/70 mt-2">


            {texts.homeSubtitle}


          </p>




        </section>








        <div className="space-y-6">






          <NextEventCard

            event={nextEvent}

          />









          <section


            className={`

              rounded-3xl

              p-6

              shadow-xl

              ${styles.card}

            `}


          >



            <h2 className="text-xl font-bold text-white mb-4">


              Tareas pendientes


            </h2>






            {


              pendingTasks.length === 0 && (


                <p className="text-white/60">


                  No tienes tareas pendientes 🎉


                </p>


              )


            }






            {


              pendingTasks.slice(0,5).map(task=>(


                <div


                  key={task.id}


                  className="
                    bg-white/10
                    rounded-2xl
                    p-4
                    mb-3
                  "


                >



                  <h3 className="text-white font-semibold">


                    {task.title}


                  </h3>



                  {


                    task.subject && (


                      <p className="text-white/60 text-sm">


                        {task.subject}


                      </p>


                    )


                  }



                </div>


              ))


            }




          </section>








        </div>





      </main>





    </SkyBackground>


  );


}



export default Home;
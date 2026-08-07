import {
  BookOpen,
  CheckCircle2,
  Flame
} from "lucide-react";

import { useSubjects } from "../../Context/SubjectContext";
import { useTasks } from "../../Context/TaskContext";
import { useTheme } from "../../Context/ThemeContext";
import { useLanguage } from "../../Context/LanguageContext";



function StatsCard() {


  const { subjects } = useSubjects();


  const { tasks } = useTasks();


  const { styles } = useTheme();


  const { texts } = useLanguage();





  const completedTasks = tasks.filter(

    task => task.completed

  ).length;







  return (



    <section


      className={`

        rounded-3xl

        p-6

        shadow-xl

        ${styles.card}

      `}


    >






      <h2 className="text-xl font-semibold text-white mb-6">


        {texts.stats || "Estadísticas"}


      </h2>








      <div className="space-y-5">





        <Row


          icon={<BookOpen size={20}/>}


          label={texts.subjects || "Asignaturas"}


          value={subjects.length}


        />







        <Row


          icon={<CheckCircle2 size={20}/>}


          label={texts.completedTasks || "Tareas completadas"}


          value={completedTasks}


        />








        <Row


          icon={<Flame size={20}/>}


          label={texts.streak || "Racha"}


          value={"0 días"}


        />





      </div>






    </section>



  );


}







function Row({

  icon,

  label,

  value

}) {


  return (



    <div className="flex justify-between items-center">



      <div className="flex gap-3 items-center text-white">


        {icon}


        <span>

          {label}

        </span>


      </div>






      <span className="text-white font-semibold">


        {value}


      </span>





    </div>



  );


}






export default StatsCard;
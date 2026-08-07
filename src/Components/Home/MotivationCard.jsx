import { Sparkles } from "lucide-react";

import { useUser } from "../../Context/UserContext";
import { useTheme } from "../../Context/ThemeContext";
import { useLanguage } from "../../Context/LanguageContext";

import motivationalPhrases from "../../Data/motivationalPhrases";



function MotivationCard(){


  const { user } = useUser();

  const { styles } = useTheme();

  const { language } = useLanguage();





  if(!user.settings?.motivation){

    return null;

  }







  const phrases = motivationalPhrases[language] || motivationalPhrases.es;





  const day = new Date().getDate();

  const phrase = phrases[day % phrases.length];







  return (



    <section


      className={`

        rounded-3xl

        p-6

        shadow-xl

        ${styles.card}

      `}


    >





      <div className="flex items-center gap-3 mb-4">


        <Sparkles className="text-white"/>


        <h2 className="text-xl font-bold text-white">


          Motivación


        </h2>


      </div>







      <p className="text-white text-lg">


        {phrase}


      </p>






    </section>


  );


}



export default MotivationCard;
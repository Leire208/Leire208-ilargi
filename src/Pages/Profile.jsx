import SkyBackground from "../Components/SkyBackground";

import ProfileHeader from "../Components/Profile/ProfileHeader";
import StatsCard from "../Components/Profile/StatsCard";
import SettingsCard from "../Components/Profile/SettingsCard";

import { Sparkles, Info } from "lucide-react";

import { useLanguage } from "../Context/LanguageContext";
import { useTheme } from "../Context/ThemeContext";

import motivationalPhrases from "../Data/motivationalPhrases";



function Profile() {


  const { texts, language } = useLanguage();

  const { styles } = useTheme();





  const phrases = motivationalPhrases[language]

    || motivationalPhrases.es;





  const phrase =

    phrases[

      Math.floor(

        Math.random() *

        phrases.length

      )

    ];







  return (



    <SkyBackground>



      <main

        className="
          max-w-xl
          mx-auto
          px-6
          pt-8
          pb-36
          min-h-screen
        "

      >





        <ProfileHeader />





        <div className="mt-8">


          <StatsCard />


        </div>









        <section


          className={`

            mt-8

            rounded-3xl

            p-6

            shadow-xl

            ${styles.card}

          `}


        >



          <div className="flex items-center gap-3 mb-4">


            <Sparkles className="text-white"/>


            <h2 className="text-xl font-semibold text-white">


              {texts.motivation}


            </h2>


          </div>





          <p className="text-white/80 leading-relaxed">


            {phrase}


          </p>





        </section>









        <section


          className={`

            mt-8

            rounded-3xl

            p-6

            shadow-xl

            ${styles.card}

          `}


        >



          <div className="flex items-center gap-3 mb-4">


            <Info className="text-white"/>


            <h2 className="text-xl font-semibold text-white">


              {texts.information}


            </h2>


          </div>





          <p className="text-white font-semibold">


            {texts.appName}


          </p>





          <p className="text-white/60 mt-1">


            {texts.version}


          </p>





        </section>









        <div className="mt-8">


          <SettingsCard />


        </div>





      </main>



    </SkyBackground>



  );

}



export default Profile;
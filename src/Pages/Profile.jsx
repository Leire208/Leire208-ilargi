import SkyBackground from "../Components/SkyBackground";

import ProfileHeader from "../Components/Profile/ProfileHeader";
import StatsCard from "../Components/Profile/StatsCard";
import SettingsCard from "../Components/Profile/SettingsCard";

import { Info, LogOut } from "lucide-react";

import { useLanguage } from "../Context/LanguageContext";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";



function Profile() {


  const { texts } = useLanguage();

  const { styles } = useTheme();

  const { logout } = useAuth();




  const handleLogout = async () => {

    try {

      await logout();

    } catch (error) {

      console.error("Error al cerrar sesión:", error);

    }

  };




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








        {/* CERRAR SESIÓN */}


        <button


          onClick={handleLogout}


          className="

            w-full

            mt-8

            rounded-3xl

            p-5

            flex

            items-center

            justify-center

            gap-3

            bg-white/10

            backdrop-blur-xl

            border

            border-white/10

            text-white

            font-semibold

            shadow-xl

            transition-all

            duration-300

            hover:bg-red-500/20

            hover:border-red-400/20

            active:scale-[0.98]

          "


        >


          <LogOut size={20} />


          <span>Cerrar sesión</span>


        </button>





      </main>


    </SkyBackground>


  );


}



export default Profile;
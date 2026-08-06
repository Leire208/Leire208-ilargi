import {
  Globe,
  Palette,
  Bell,
  UserRoundPen,
  Info
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../Context/LanguageContext";
import { useTheme } from "../../Context/ThemeContext";



function SettingsCard() {


  const navigate = useNavigate();

  const { language, setLanguage, texts } = useLanguage();

  const { styles } = useTheme();





  const languages = [

    {
      id: "es",
      name: "🇪🇸 Español"
    },

    {
      id: "eu",
      name: "🇪🇺 Euskera"
    },

    {
      id: "en",
      name: "🇬🇧 English"
    },

    {
      id: "fr",
      name: "🇫🇷 Français"
    },

    {
      id: "it",
      name: "🇮🇹 Italiano"
    }

  ];







  return (



    <section


      className={`

        rounded-3xl

        p-6

        shadow-xl

        ${styles.card}

      `}


    >





      <div className="flex items-center gap-3 mb-6">


        <Globe className="text-white"/>


        <h2 className="text-xl font-semibold text-white">


          {texts.language}


        </h2>


      </div>








      <div className="space-y-3 mb-8">



        {

          languages.map(item => (



            <button


              key={item.id}


              onClick={()=>setLanguage(item.id)}


              className={`

                w-full

                text-left

                px-5

                py-3

                rounded-2xl

                text-white

                transition

                ${

                  language === item.id

                  ? "bg-white/30"

                  : "bg-white/10 hover:bg-white/20"

                }

              `}


            >


              {item.name}


            </button>



          ))



        }



      </div>








      <div className="space-y-3">





        <button


          onClick={()=>navigate("/profile/edit")}


          className="
            w-full
            flex
            items-center
            gap-3
            p-4
            rounded-2xl
            bg-white/10
            text-white
          "


        >


          <UserRoundPen size={20}/>


          {texts.editProfile}


        </button>







        <button


          className="
            w-full
            flex
            items-center
            gap-3
            p-4
            rounded-2xl
            bg-white/10
            text-white
          "


        >


          <Palette size={20}/>


          {texts.theme}


        </button>








        <button


          className="
            w-full
            flex
            items-center
            gap-3
            p-4
            rounded-2xl
            bg-white/10
            text-white
          "


        >


          <Bell size={20}/>


          {texts.notifications}


        </button>







        <button


          className="
            w-full
            flex
            items-center
            gap-3
            p-4
            rounded-2xl
            bg-white/10
            text-white
          "


        >


          <Info size={20}/>


          {texts.information}


        </button>





      </div>





    </section>



  );


}



export default SettingsCard;
import { useState } from "react";

import {
  Globe,
  Palette,
  Bell,
  UserRoundPen,
  Info,
  Image,
  ChevronRight,
  MessageCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../Context/LanguageContext";
import { useTheme } from "../../Context/ThemeContext";
import { useUser } from "../../Context/UserContext";

import Switch from "./Switch";
import LanguageModal from "./LanguageModal";
import ThemeModal from "./ThemeModal";


function SettingsCard() {


  const navigate = useNavigate();


  const { language, texts } = useLanguage();


  const { styles, mode } = useTheme();


  const {

    user,

    updateSettings

  } = useUser();




  const [languageOpen,setLanguageOpen] = useState(false);

  const [themeOpen,setThemeOpen] = useState(false);






  const currentLanguage = {

    es:"Español",

    eu:"Euskara",

    en:"English",

    fr:"Français",

    it:"Italiano"

  }[language];






  const currentTheme = {

    auto:"Automático",

    day:"Día",

    sunset:"Atardecer",

    night:"Noche"

  }[mode];









  function Row({

    icon,

    title,

    value,

    onClick

  }) {


    return (

      <button


        onClick={onClick}


        className="
          w-full
          flex
          items-center
          justify-between
          p-4
          rounded-2xl
          bg-white/10
          hover:bg-white/20
          transition
          text-white
        "


      >


        <div className="flex items-center gap-4">


          {icon}


          <span>

            {title}

          </span>


        </div>





        <div className="flex items-center gap-2 text-white/60">


          {

            value && (

              <span>

                {value}

              </span>

            )

          }


          <ChevronRight size={18}/>


        </div>



      </button>

    );


  }









  function SwitchRow({

    icon,

    title,

    checked,

    onChange

  }) {


    return (

      <div


        className="
          w-full
          flex
          items-center
          justify-between
          p-4
          rounded-2xl
          bg-white/10
        "


      >


        <div className="flex items-center gap-4 text-white">


          {icon}


          <span>

            {title}

          </span>


        </div>





        <Switch


          checked={checked}


          onChange={onChange}


        />


      </div>

    );

  }









  return (

    <>


      <section


        className={`

          rounded-3xl

          p-6

          shadow-xl

          ${styles.card}

        `}


      >




        <h2 className="text-2xl font-bold text-white mb-6">

          Ajustes

        </h2>








        <div className="space-y-3">


          <Row


            icon={<UserRoundPen size={20}/>}


            title={texts.editProfile}


            onClick={()=>navigate("/profile/edit")}


          />





          <Row


            icon={<Image size={20}/>}


            title="Foto de perfil"


            onClick={()=>{}}


          />



        </div>







        <div className="my-6 border-t border-white/10"/>







        <div className="space-y-3">



          <Row


            icon={<Globe size={20}/>}


            title={texts.language}


            value={currentLanguage}


            onClick={()=>setLanguageOpen(true)}


          />








          <Row


            icon={<Palette size={20}/>}


            title={texts.theme}


            value={currentTheme}


            onClick={()=>setThemeOpen(true)}


          />








          <SwitchRow


            icon={<MessageCircle size={20}/>}


            title="Frases motivadoras"


            checked={user.settings.motivation}


            onChange={(value)=>


              updateSettings({

                motivation:value

              })


            }


          />








          <SwitchRow


            icon={<Bell size={20}/>}


            title={texts.notifications}


            checked={user.settings.notifications}


            onChange={(value)=>


              updateSettings({

                notifications:value

              })


            }


          />



        </div>







        <div className="my-6 border-t border-white/10"/>







        <Row


          icon={<Info size={20}/>}


          title={texts.information}


          onClick={()=>{}}


        />





      </section>







      <LanguageModal


        open={languageOpen}


        close={()=>setLanguageOpen(false)}


      />







      <ThemeModal


        open={themeOpen}


        close={()=>setThemeOpen(false)}


      />



    </>

  );


}


export default SettingsCard;
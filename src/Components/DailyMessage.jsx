import { Sparkles } from "lucide-react";

import { useSettings } from "../Context/SettingsContext";
import { useLanguage } from "../Context/LanguageContext";


function DailyMessage() {


  const { settings } = useSettings();

  const { texts } = useLanguage();



  if (!settings.showMessages) {

    return null;

  }



  return (

    <div className="
      mt-6
      rounded-3xl
      bg-white/15
      backdrop-blur-xl
      border
      border-white/20
      p-6
      text-white
      shadow-xl
    ">


      <div className="
        flex
        items-center
        gap-3
      ">


        <div className="
          rounded-2xl
          bg-white/20
          p-3
        ">

          <Sparkles size={24}/>

        </div>


        <div>

          <p className="
            text-sm
            text-white/70
          ">

            {texts.message}

          </p>


          <h2 className="
            mt-2
            text-lg
            font-medium
          ">

            {texts.motivation}

          </h2>


        </div>


      </div>


    </div>

  );

}


export default DailyMessage;
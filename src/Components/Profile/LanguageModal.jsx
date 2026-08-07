import SettingsModal from "./SettingsModal";

import { useLanguage } from "../../Context/LanguageContext";


function LanguageModal({

  open,

  close

}) {


  const {

    language,

    setLanguage

  } = useLanguage();



  const languages = [


    {
      id:"es",
      name:"🇪🇸 Español"
    },


    {
      id:"eu",
      name:"🇪🇺 Euskara"
    },


    {
      id:"en",
      name:"🇬🇧 English"
    },


    {
      id:"fr",
      name:"🇫🇷 Français"
    },


    {
      id:"it",
      name:"🇮🇹 Italiano"
    }


  ];



  return (


    <SettingsModal


      open={open}


      close={close}


      title="Idioma"


    >



      <div className="space-y-3">


        {

          languages.map(item=>(


            <button


              key={item.id}


              onClick={()=>{


                setLanguage(item.id);

                close();


              }}


              className={`

                w-full

                p-4

                rounded-2xl

                text-left

                text-white

                transition

                ${

                  language === item.id

                  ? "bg-white/30"

                  : "bg-white/10"

                }

              `}


            >


              {item.name}


            </button>


          ))

        }


      </div>



    </SettingsModal>


  );


}


export default LanguageModal;
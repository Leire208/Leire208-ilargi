import SettingsModal from "./SettingsModal";

import { useTheme } from "../../Context/ThemeContext";


function ThemeModal({

  open,

  close

}) {


  const {

    theme,

    setTheme

  } = useTheme();



  const themes = [

    {
      id:"auto",
      name:" Automático"
    },

    {
      id:"day",
      name:" Día"
    },

    {
      id:"sunset",
      name:" Atardecer"
    },

    {
      id:"night",
      name:" Noche"
    }

  ];



  return (


    <SettingsModal


      open={open}


      close={close}


      title="Tema"


    >



      <div className="space-y-3">


        {

          themes.map(item=>(


            <button


              key={item.id}


              onClick={()=>{


                setTheme(item.id);

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

                  theme === item.id

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


export default ThemeModal;
import { useUser } from "../Context/UserContext";
import { useLanguage } from "../Context/LanguageContext";


function Header() {

  const { user } = useUser();

  const { texts } = useLanguage();


  const hour = new Date().getHours();


  let greeting = texts.greetingMorning;


  if (hour >= 14 && hour < 21) {

    greeting = texts.greetingAfternoon;

  }


  if (hour >= 21 || hour < 6) {

    greeting = texts.greetingNight;

  }



  return (

    <div className="
      text-white
      pt-8
    ">


      <p className="
        text-sm
        opacity-80
      ">

        {new Date().toLocaleDateString(
          "es-ES",
          {
            weekday: "long",
            day: "numeric",
            month: "long"
          }
        )}

      </p>



      <h1 className="
        text-4xl
        font-semibold
        mt-3
      ">

        {greeting}, {user.name}

      </h1>



      <p className="
        mt-2
        text-white/70
      ">

        {texts.yourDay}

      </p>


    </div>

  );

}


export default Header;
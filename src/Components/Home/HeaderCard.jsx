import { useUser } from "../../Context/UserContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useTheme } from "../../Context/ThemeContext";

function HeaderCard() {

  const { user } = useUser();
  const { texts } = useLanguage();
  const { theme } = useTheme();

  const hour = new Date().getHours();

  let greeting = texts.greetingMorning;
  let icon = "☀️";

  if (hour >= 14 && hour < 21) {
    greeting = texts.greetingAfternoon;
    icon = "🌇";
  }

  if (hour >= 21 || hour < 6) {
    greeting = texts.greetingNight;
    icon = "🌙";
  }

  return (
    <header className="text-white pt-4">

      <p className="text-3xl">
        {icon}
      </p>

      <p className="text-sm text-white/80 mt-2">
        {new Date().toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long"
        })}
      </p>

      <h1 className="text-4xl font-bold mt-3">
        {greeting},
      </h1>

      <h2 className="text-4xl font-light">
        {user.name}
      </h2>

      <p className="mt-4 text-white/80">
        {texts.yourDay}
      </p>

    </header>
  );

}

export default HeaderCard;
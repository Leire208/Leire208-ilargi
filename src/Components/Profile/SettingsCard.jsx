import {
  Globe,
  Palette,
  Bell,
  UserRoundPen,
  Info
} from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";
import { useTheme } from "../../Context/ThemeContext";

function SettingsCard() {

  const { language } = useLanguage();
  const { theme, styles } = useTheme();

  const languageName =
    language === "eu"
      ? "Euskara"
      : "Español";

  const themeName = {

    day: "Día",
    sunset: "Atardecer",
    night: "Noche"

  }[theme];

  return (

    <section
      className={`
        rounded-3xl
        overflow-hidden
        shadow-xl
        ${styles.card}
      `}
    >

      <Setting
        icon={<Globe size={20} />}
        title="Idioma"
        value={languageName}
      />

      <Divider />

      <Setting
        icon={<Palette size={20} />}
        title="Tema"
        value={themeName}
      />

      <Divider />

      <Setting
        icon={<Bell size={20} />}
        title="Notificaciones"
        value="Próximamente"
      />

      <Divider />

      <Setting
        icon={<UserRoundPen size={20} />}
        title="Editar perfil"
        value=""
      />

      <Divider />

      <Setting
        icon={<Info size={20} />}
        title="Acerca de Ilargi"
        value="v1.0"
      />

    </section>

  );

}

function Divider() {

  return <div className="h-px bg-white/15" />;

}

function Setting({ icon, title, value }) {

  return (

    <button
      className="
        w-full
        px-5
        py-4
        flex
        items-center
        justify-between
        hover:bg-white/5
        transition
      "
    >

      <div className="flex items-center gap-3 text-white">

        {icon}

        <span>{title}</span>

      </div>

      <span className="text-white/70 text-sm">

        {value}

      </span>

    </button>

  );

}

export default SettingsCard;
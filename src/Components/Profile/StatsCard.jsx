import {
  BookOpen,
  CheckCircle2,
  Flame
} from "lucide-react";

import { useClasses } from "../../Context/ClassContext";
import { useTheme } from "../../Context/ThemeContext";

function StatsCard() {

  const { classes } = useClasses();
  const { styles } = useTheme();

  return (

    <section
      className={`
        rounded-3xl
        p-6
        shadow-xl
        ${styles.card}
      `}
    >

      <h2 className="text-xl font-semibold text-white mb-6">

        Estadísticas

      </h2>

      <div className="space-y-5">

        <Row
          icon={<BookOpen size={20}/>}
          label="Clases"
          value={classes.length}
        />

        <Row
          icon={<CheckCircle2 size={20}/>}
          label="Tareas"
          value="0"
        />

        <Row
          icon={<Flame size={20}/>}
          label="Racha"
          value="0 días"
        />

      </div>

    </section>

  );

}

function Row({ icon, label, value }) {

  return (

    <div className="flex justify-between items-center">

      <div className="flex gap-3 items-center text-white">

        {icon}

        <span>{label}</span>

      </div>

      <span className="text-white font-semibold">

        {value}

      </span>

    </div>

  );

}

export default StatsCard;
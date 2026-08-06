import { useTheme } from "../../Context/ThemeContext";

function QuoteCard() {

  const { styles } = useTheme();

  const quotes = [

    "Cada pequeño paso cuenta.",

    "Hoy es un buen día para aprender algo nuevo.",

    "La constancia supera al talento."

  ];

  const day = new Date().getDate();

  const quote = quotes[day % quotes.length];

  return (

    <section
      className={`
        rounded-3xl
        p-6
        text-center
        shadow-xl
        ${styles.card}
      `}
    >

      <p className="text-2xl mb-3">

        💙

      </p>

      <p className="italic text-white">

        {quote}

      </p>

    </section>

  );

}

export default QuoteCard;
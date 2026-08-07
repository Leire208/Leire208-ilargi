function Switch({

  checked,

  onChange

}) {

  return (

    <button

      type="button"

      onClick={() => onChange(!checked)}

      className={`
        relative
        w-14
        h-8
        rounded-full
        transition-all
        duration-300
        ${
          checked
            ? "bg-green-500"
            : "bg-white/20"
        }
      `}

    >

      <span

        className={`
          absolute
          top-1
          left-1
          w-6
          h-6
          rounded-full
          bg-white
          transition-all
          duration-300
          ${
            checked
              ? "translate-x-6"
              : ""
          }
        `}

      />

    </button>

  );

}

export default Switch;
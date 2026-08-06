import colors from "../../Data/colors";

function ColorPicker({

  value,

  onChange

}) {

  return (

    <div className="mt-6">

      <p className="text-white/70 mb-3">

        Color

      </p>

      <div className="grid grid-cols-5 gap-3">

        {

          colors.map(color => (

            <button

              key={color}

              onClick={() => onChange(color)}

              className={`
                w-10
                h-10
                rounded-full
                border-4
                transition
                ${value === color
                  ? "border-white scale-110"
                  : "border-transparent"}
              `}

              style={{

                background: color

              }}

            />

          ))

        }

      </div>

    </div>

  );

}

export default ColorPicker;
import { X, Trash2 } from "lucide-react";

import { useSchedule } from "../../Context/ScheduleContext";
import { useTheme } from "../../Context/ThemeContext";


function EditClassModal({

open,

close,

item

}) {


const { removeClass } = useSchedule();

const { styles } = useTheme();



if(!open || !item) return null;





async function remove(){


await removeClass(item.id);


close();


}





return (


<div


className="
fixed
inset-0
z-[130]
bg-black/40
backdrop-blur-sm
flex
items-center
justify-center
px-6
"


onClick={close}


>



<section


onClick={(e)=>e.stopPropagation()}


className={`

w-full

max-w-md

rounded-3xl

p-6

shadow-2xl

${styles.card}

`}


>





<div className="flex justify-between items-center mb-6">


<h2 className="text-2xl font-bold text-white">


{item.subjectName}


</h2>




<button onClick={close}>


<X className="text-white"/>


</button>


</div>







<div className="space-y-3 text-white/80">


<p>


Día: {item.day}


</p>



<p>


Hora: {item.start}


</p>



{

item.room && (

<p>

Aula: {item.room}

</p>

)

}



</div>









<button


onClick={remove}


className="
mt-6
w-full
py-4
rounded-2xl
bg-red-500/20
text-red-200
font-semibold
flex
items-center
justify-center
gap-2
hover:bg-red-500/30
transition
"


>


<Trash2 size={18}/>


Eliminar clase


</button>





</section>



</div>


);

}



export default EditClassModal;
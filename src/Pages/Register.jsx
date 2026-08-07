import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import SkyBackground from "../Components/SkyBackground";


function Register(){


const { register } = useAuth();

const navigate = useNavigate();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");





async function submit(e){


e.preventDefault();

setError("");



try{


await register(

email,

password

);



navigate("/");


}catch(err){


console.log(err);


if(err.code === "auth/email-already-in-use"){


setError(

"Este correo ya tiene una cuenta"

);


}else if(err.code === "auth/weak-password"){


setError(

"La contraseña debe tener al menos 6 caracteres"

);


}else{


setError(

"No se pudo crear la cuenta"

);


}


}



}






return (


<SkyBackground>


<main className="
min-h-screen
flex
items-center
justify-center
px-6
">


<section className="
w-full
max-w-md
rounded-3xl
p-8
bg-white/10
backdrop-blur-xl
shadow-xl
">


<h1 className="
text-3xl
font-bold
text-white
mb-8
">


Crear cuenta


</h1>







<form

onSubmit={submit}

className="space-y-4"

>



<input


type="email"


placeholder="Correo electrónico"


value={email}


onChange={(e)=>setEmail(e.target.value)}


className="
w-full
rounded-2xl
bg-white/20
px-4
py-3
text-white
"


/>







<input


type="password"


placeholder="Contraseña"


value={password}


onChange={(e)=>setPassword(e.target.value)}


className="
w-full
rounded-2xl
bg-white/20
px-4
py-3
text-white
"


/>









{

error && (


<p className="text-red-200">


{error}


</p>


)

}







<button


className="
w-full
py-4
rounded-2xl
bg-white/20
text-white
font-semibold
"


>


Crear cuenta


</button>





</form>








<button


onClick={()=>navigate("/login")}


className="
mt-6
text-white/70
"


>


Ya tengo cuenta


</button>





</section>


</main>


</SkyBackground>


);


}



export default Register;
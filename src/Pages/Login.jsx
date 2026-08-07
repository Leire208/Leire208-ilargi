import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import SkyBackground from "../Components/SkyBackground";


function Login(){


const { login, loginGoogle } = useAuth();

const navigate = useNavigate();



const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");





async function submit(e){

e.preventDefault();

setError("");



try{


await login(email,password);


navigate("/");


}catch(err){


setError(

"Correo o contraseña incorrectos"

);


}



}








async function google(){


try{


await loginGoogle();


navigate("/");


}catch(err){


setError(

"No se pudo iniciar sesión con Google"

);


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

Bienvenida a Ilargi

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

Entrar

</button>




</form>






<button

onClick={google}

className="
w-full
mt-4
py-4
rounded-2xl
bg-white/10
text-white
"

>

Continuar con Google

</button>






<button

onClick={()=>navigate("/register")}

className="
mt-6
text-white/70
"

>

Crear cuenta

</button>





</section>


</main>


</SkyBackground>

);


}


export default Login;
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click',() => {
    if(pagina<1000){
        pagina+=1;
        cargarPeli();
    }
} )
btnAnterior.addEventListener('click',() => {
    if(pagina>1){
        pagina-=1;
        cargarPeli();
    }
} )
const cargarPeli= async()=>{
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d7c631d6c21a48dfb2488cdc5a74a355&page=1`);
        console.log(respuesta);
        if(respuesta.status === 200){
            const data = await respuesta.json();
            let peliculas='';
            data.results.forEach(pelicula =>{
                peliculas+=`
                <div class="pelicula">
                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="poster"/>
                <h3>${pelicula.title}</h3>
                <h3>${pelicula.release_date}</h3>
                <h3>${pelicula.popularity}</h3>
                </div>
                `
            });
            document.getElementById('contenedor').innerHTML = peliculas;
        }
        else if (respuesta.status==401){
            console.log('key incorrecta')
        }else{
            console.log('error al cargar los datos');
        }

    } catch (error) {
        console.log(error);
    }

}
cargarPeli(1);

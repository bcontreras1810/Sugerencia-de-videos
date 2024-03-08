// Patrón de Módulo mediante IIFE
let Reproduccion = (function () {
    // Función privada que reciba el url y id de la etiqueta infame para mostrar el video en el documento HTML
    function insertarVideo(url, id) {
        //toma todos los id en una constante
        let iframe = document.getElementById(id);
        //toma el atributo src y deja la propiedad url
        iframe.setAttribute('src', url);
    }
    // Función publica que llama a la función privada para insertar los elementos recibidos
    return {        
        reproducir: function (url, id) {
            insertarVideo(url, id);
        }
    };
})();

// Clase padre Multimedia
class Multimedia {
    //metodo constructor que recibe la url
    constructor(url) {
        // Atributo protegido utilizando closures
        let _url = url;

         // Método getter para obtener el atributo de la URL protegida
         this.getUrl = function () {
            return _url;
        };

        // Método para establecer un mensaje de cambio en la URL del video
        this.setInicio = function () {
            return "Este método es para realizar un cambio en la URL del video";
        };    
    }
}

// Clase hija Reproductor
class Reproductor extends Multimedia {
    //lo que voy a recibir de la clase padre
    constructor(url, id) {
        //lo confirmo
        super(url);
        //trabajo sobre la propiedad id y le doy el atributo id
        this.id = id;
    }

    // Método para reproducir multimedia
    playMultimedia() {
        //la classe repoduccion hace el llamado a la funcion publica de la IIFE, enviando los atributos de la url y de id
        Reproductor.reproducir(this.getUrl(), this.id);
    }

    // Método para establecer un tiempo de inicio en la URL del video
    setInicio(tiempo) {
        //llamo a la constante url hago la interpolacion del atributo de la url protegida y agrego el ?start=${tiempo} para que cualquiera de los videos que implemente el metodo inicie en el tiempo pasado como argumento al metodo al ser invocado
        let url = `${this.getUrl()}?start=${tiempo}`;
        let iframe = document.getElementById(this.id);
        iframe.setAttribute('src', url);
    }
}

// Instanciar la clase hija para música, películas y series
let musica = new Reproductor("https://www.youtube.com/embed/ELiBpKQws84?si=aQdPKf5TKx5V_Yuk", "musica");
let pelicula = new Reproductor("https://www.youtube.com/embed/kxyyKU8rgaU?si=PaXnsn_FWhHUUyvD", "peliculas");
let serie = new Reproductor("https://www.youtube.com/embed/aQvmRkxqceA?si=t7x7AJnWpfoLNITT", "series");

// Invocar al método "playMultimedia" para cada instancia, mostrando asi los videos en el documento html
musica.playMultimedia();
pelicula.playMultimedia();
serie.playMultimedia();

// Utilizar el método "setInicio" para modificar el tiempo de inicio en alguna de las instancias creadas
musica.setInicio();
pelicula.setInicio(200);
serie.setInicio();
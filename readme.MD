Intrucciones de uso:

la api se inicializa con el comando: npm run dev;

la Api cuenta con 6 Endpoints:

"url/register": se tiene que enviar un en el body del mensaje, los parametros:

  {
      "email": "prueba@pr.p",
      "firstName": "franco",
      "lastName": "lepratti",
      "password":  "12345"
  }
  
  el mail tiene que ser valido, al igual que mandar una contrasenia con mas de 5 digitos.
  
  si no se relaiza un registro no se podra acceder a la mayoria de las funciones.

"url/login": se envia en el body, tras haberte registrado, el mail y la contrasenia:

  {
      "email": "franco2@pr.p",
      "password":  "12345"
  }
  
  si son correctos, te retornara con token con el que podras acceder al resto de funcionalidades,
  poniendolo en el header en un atributo de nombre authorization.

"url/getMovies": si mandas el token correcto, te traera todas las peliculas, 
  ademas puedes pasar una palabra clave para que la busqueda sea por esa palabra de la siguiente forma:
  
  "url/getMovies?keyword=<palabra clave>"
  
  hacer cualquiera de los dos pedidos traera una lista de Movies ordenadas de mayor a menor.

"url/setFavorite": si mandas el token y en el body mandas una de las peliculas en el formato en que la resiviste, esta se aniadira a tu lista de favoritos
  
  {
      "adult": false,
      "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
      "genre_ids": [
          16,
          10751,
          12,
          14,
          35
      ],
      "id": 502356,
      "original_language": "en",
      "original_title": "The Super Mario Bros. Movie",
      "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
      "popularity": 436.023,
      "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      "release_date": "2023-04-05",
      "title": "The Super Mario Bros. Movie",
      "video": false,
      "vote_average": 7.745,
      "vote_count": 7288,
      "suggestionScore": 89
  }

"url/getFavorite": si envias tu token correctamente traera una lista de todas las peliculas que agregaste a favoritos.

"url/logout": si envias un token valido te lo inavilita.









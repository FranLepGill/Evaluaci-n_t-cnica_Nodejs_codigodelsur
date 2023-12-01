# Evaluacion_tecnica_Nodejs_codigodelsur

## Intrucciones de uso:

### Inicialización 🔧 
```
npm run dev
```

## Endpoints

### register
```
"url/register" 
```
_se tiene que enviar un en el body del mensaje, los parametros:_
```
  {
      "email": "prueba@pr.p",
      "firstName": "franco",
      "lastName": "lepratti",
      "password":  "12345"
  }
```
  
  * el mail tiene que ser valido, 
  * la contrasenia tini que tener mas 5 digitos.
  * si no se relaiza un registro no se podra acceder a la mayoria de las funciones.

### login
```
"url/login"
```
_Se envia en el body, tras haberte registrado, el mail y la contrasenia:_
```
  {
      "email": "franco2@pr.p",
      "password":  "12345"
  }
```
  _si son correctos, te retornara con token con el que podras acceder al resto de funcionalidades,
  poniendolo en el header en un atributo de nombre authorization._

### movies
```
"url/movies" 
```
_si mandas el token correcto, te traera todas las peliculas, 
  ademas puedes pasar una palabra clave para que la busqueda sea por esa palabra de la siguiente forma:_
  ```
  "url/getMovies?keyword=<palabra clave>"
  ```
  _hacer cualquiera de los dos pedidos traera una lista de Movies ordenadas de mayor a menor._

### Set Favoritos
  ```
"url/setFavorite"
  ```
_Si mandas el token y en el body mandas una de las peliculas en el formato en que la resiviste, esta se aniadira a tu lista de favoritos_
  ```
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
  ```
### Get Favorite
```
"url/getFavorite" 
```
_Si envias tu token correctamente traera una lista de todas las peliculas que agregaste a favoritos._

### logout
```
"url/logout" 
```
_si envias un token valido te lo inavilita._

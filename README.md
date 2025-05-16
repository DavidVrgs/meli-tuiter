# MeLi Tuiter

### Contenido
 1. Arquitectura
 2. Seguridad.
 3. Incidencias.
 4. Patrones de diseño y principios SOLID.
 5. Manejo de errores.
 6. Caché.
 7. Internacionalización
 8. Pruebas unitarias
 9. Oportunidades de mejora.
 10. Ejecutar proyecto
     
### 1. Arquitectura
Para facilitar la escabilidad y el mantenimiento, el proyecto fue realizado siguiendo una arquitectura feature-based para la estructura del mismo. Esta arquitectura define que cada carpeta debe contener el código específico de esa función, manteniendo los elementos separados. De esta manera ayuda a mejorar la colaboración, legibilidad y la escabilidad.

Este sería un ejemplo claro de como se vería:

    /src
      /features
        /auth
          /api
          /components
          /hooks
          /pages
        /posts
        /users
      /shared
        /components
        /hooks
        /utils
        /services


### 2. Seguridad
Dado que el API usa un token, la idea era no exponerlo publicamente en el cliente. Teniendo esto en cuenta, creé un backend que funciona como Proxy, este almacena el token en una variable de entorno y cada petición recibida realiza la petición a la Api dada por MeLi y retorna su valor.
Esta Api puede verse en la raíz del proyecto en el folder `server`. 

En vista de que el que proyecto busca evaluar mis capacidades como desarrollador Frontend, el backend está en un unico archivo sin ninguna arquitectura definida. 

### 3.  Incidencias.
Durante el desarrollo del proyecto ocurrieron dos incidencias con la API. 
La primera de esta fue con el uso del endpoint `GET /api/v1/me/tuits/${tuid_id}` Este endpoint no está funcionando correctamente y siempre devuelve un error de `Authorization`. Como alternativa se almacenaron los posts localmente y al ingresar a un post (tuit) especifico se busca directamente del Local Storage. Ambas partes están comentadas en el código y se deja entender cómo se haría si el endpoint estuviera funcionando correctamente. 

![image](https://github.com/user-attachments/assets/611a12ac-b4ca-43dc-bd4d-e77e92c68193)
![image](https://github.com/user-attachments/assets/a8701298-a612-4d70-804f-d6e78f3fb29c)

La segunda incidencia es con el endpoint que actualiza al usuario, especificamente al actualizar la contraseña de este. 
`PUT /api/v1/me/profile`. Al actualizar la contraseña no se está encriptando, por ende, al realizar un login con esta nueva contraseña, el servidor busca desencriptarla (proceso normal) pero al no estar encriptada sino que es un texto normal, devuelve un error. Aprovechando que realicé el backend para hacer el Proxy, al recibir esta petición, encripto la contraseña y se la envío ya encriptada a la API de MeLi, garantizando así su funcionamiento. 

![image](https://github.com/user-attachments/assets/7c758d61-e940-4316-b2da-9264dfb0a509)

### 4. Patrones de diseño y principios SOLID.
Para este proyecto seguí dos principios SOLID

 1. S - Single Responsibility Principle: Cada componente, hook o función tienen una sola responsabilidad. Por ejemplo el componente `PostCard` solo se encarga de renderizar un post. 
 2. D - Dependency Inversion Principle: En cada parte del proyecto se intenta que la aplicación no esté acoplada. Un ejemplo claro de esto es la lógica de red, todos los llamados a la API son servicios

	 ![image](https://github.com/user-attachments/assets/60fb25fb-bba8-407c-a5ca-ae8a92b44545)
	
	A su vez cada servicio no depende directamente de ninguna librería externa, sino que se realizan "Wrappers" de estas,  como es el caso de `httpClient`

    ![image](https://github.com/user-attachments/assets/71ab7172-ed8d-4918-b66f-98d7f5dbc3b3)

Por otra parte, se utilizó el patrón de diseño `container/presentational`. Esta es una practica que separa la lógica y obtención de datos (container) de la presentación visual del componente (Presentational). 

### 5. Manejo de errores. 
En la aplicación realicé dos manejadores de errores: Un Error Boundary para evitar caídas de la página y un manejador de errores para las peticiones a la API. 

Para el ErrorBoundary hice uso de la librería `react-error-boundary`. Esta librería entrega un Componente llamado `ErrorBoundary` con el que se envuelve toda la aplicación. Recibe un `props` llamada `FallbackComponent` que es el componente que se renderizará en el caso de que ocurra un error. 

![image](https://github.com/user-attachments/assets/abd69d34-6bc2-4aa0-a6ee-e01a8b65dddf)

Por otra parte, la mayoría de peticiones realizadas pasan a través de una librería llamada `TanStack Query` esta permite cosas como caching, invalidación de queries, retry automaticos y **manejo de errores**. Tal como mencioné en el punto anterior, no se depende de ninguna librería externa sino de abstracciones o Wrappers, en el caso de `TanStack` se realizó un custom hook para manejarlo, allí se maneja todos los errores que puedan ocurrir, mostrando al usuario una Notificación en caso de que uno ocurra. 

![image](https://github.com/user-attachments/assets/49587f1a-b4c3-4d2e-b116-0c38b3077473)

No obstante, a su vez, se está haciendo uso de Axios quien tiene interceptadores para controlar errores no manejados. 

![image](https://github.com/user-attachments/assets/c4d1f310-bc87-4d17-9403-32e08a196456)

### 6. Cache
En el punto anteriores mencioné a `TanStack Query`, como dije, esta librería maneja caching automatico, a su vez, tiene una propiedad llamada `staleTime` que es el tiempo (en milisegundos)  durante el cual los datos se consideran “frescos”  y no se vuelven a pedir automáticamente. `0` (por defecto): Los datos se consideran inmediatamente obsoletos. Si vuelves a montar el componente, se vuelve a hacer la petición. `1000 * 60` (1 minuto):  Durante 1 minuto, no volverá a llamar a la API  incluso si entras de nuevo a la misma página. 
Teniendo en cuenta que los posts se puede realizar por otras partes en cada momento, los feed, replies no están cacheados y con staleTime. Únicamente estaría cacheados un post especifico (porque este no se puede modificar) y el perfil del usuario con `staleTime`. 

### 7. Internacionalización
La Aplicación permite manejar multiples idiomas (español e ingles de momento), para este proposito hice uso de la librería `node-polyglot`. 

Siguiendo la arquitectura `feature-based` definida cada traducción debe ser manejada en una archivo dentro de cada `feature`. 

El idioma tomará el que está configurado por defecto en el navegador. 

![image](https://github.com/user-attachments/assets/aa06b611-e9ae-4e5a-9e2f-176aab3126c0)

### 8. Pruebas unitarias. 
El proyecto fue creado con VITE React. Teniendo esto en cuenta, hice uso de `Vitest` que es una alternativa más rápida y nativa para Vite. 
Las pruebas unitarias se centraron en probar los componentes dentro de cada `feature` como es el caso por ejemplo del componente `FavoriteUsers` que busca renderizar un listado de usuarios favoritos. Un ejemplo claro de cómo es una prueba a este componente sería: 

![image](https://github.com/user-attachments/assets/5ffaabf9-a99b-4097-8fd9-a17ae1bc7440)

### 9. Oportunidades de mejora
Existen dos oportunidades de mejora que observé mientras realizaba la aplicación. 

Una de ellas es la paginacion. Actualmente, la paginación está implementada de manera local en el frontend, lo que implica que se cargan todos los datos desde el backend y luego se segmentan en páginas en el cliente. Si bien esta solución puede ser suficiente para conjuntos de datos pequeños, no es escalable ni eficiente cuando la cantidad de registros crece significativamente.
 
 **Propuesta de mejora: paginación en el backend**  
Una mejor estrategia sería implementar la paginación del lado del servidor, utilizando parámetros como `limit`  y `offset` (o `page`  y `perPage`) en las solicitudes. Esto permitiría que el backend solo retorne los datos necesarios para la página actual, mejorando el rendimiento y la experiencia de usuario.

La segunda oportunidad de mejoras que vi, es manejar codigos de errores customizados, por ejemplo, si el backend devuelve un error dentro del payload llegue una propiedad como `{ "ErrorCode": "INVALID_CREDENTIALS"}` de esta manera es posible ser mapeado en el frontend facilmente. 

### 10. Ejecutar proyecto
Para ejecutar el proyecto es necesario crear el archivo `.env` y agregar la variable: `VITE_API_URL=https://meli-tuiter-proxy.onrender.com/api`
finalmente, ejecutar el proyecto con `yarn dev` 



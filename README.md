# iot_sensores
Links:
- http://34.123.113.210:80
- http://34.171.176.106:8080/


Primeramente notar que existen cuatro carpetas:
- iot_db: carpeta que contendrá el docker compose de mysql + adminer (administrador de base de datos).
- iot_backend: carpeta que contendrá el código fuente de api en .net core 8
- iot_frontend: carpeta que contendrá el código fuente de frontend angular 17
- iot_esp8266: carpeta que contendrá el código fuente del esp8266

Para arrancar el proyecto se suguiere seguir la siguiente arquitectura:
![arquitectura](https://github.com/luiszamoranom/iot_sensores/assets/64230455/ab8746eb-0c44-4dca-8703-19118b0ffea6)


Desplegar 4 contenedores, en el siguiente orden:
1. Desplegar la base de datos en una VM independiente, accesible desde internet, arrancar docker compose, se puede modificar las variables de entorno
2. Desplegar el backend en una VM independiente, accesible desde internet. Modificar appsettings.json con las credenciales  e ip de la base de datos a la cual se conectará. Es importante que la BD permita conexiones desde el backend. Correr docker compose.
3. Desplegar el frontend en una VM independiente, accesible desde internet. Modificar los servicios, especificamente la ip de conexión con la api. Es importante que el backend permita conexiones desde el frontend, cuidado con el CORS. Correr docker compose.
4. Modificar las credenciales de wifi del código del ESP8266 y, adicionalmente, modificar la ipo de conexión con la api. Es importante que el backend permita conexiones y operaciones POST desde cualquier lugar (ya que nuestro sensor puede estar conectado a cualquier red wifi). Cargar código en el ESP8266 y ejecutar.

Luego de ello, podrás visualizar los cambios en el frontend.









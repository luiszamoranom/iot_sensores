
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

//pines
#include "DHT.h"
#define DHTPIN 4 // pin digital 2 en ESP8266
#define DHTTYPE DHT22
DHT dht (DHTPIN, DHTTYPE);
int humedad,temperatura; 



const char* ssid = "";// Credenciales de Wi-Fi
const char* password = "";

WiFiClient wifiClient;

int valor; //Se guardara el valor medido por el fotorreceptor (Se enviara con mi metodo post)

int pinFotorreceptor = A0; //Variable que almacena el pin a conectar el fotorreceptor


void setup() {
  delay(5000);
  Serial.begin(9600);
  dht.begin();// Se inicializa el sensor DHT para su uso


  WiFi.begin(ssid, password);// Se hace la conexion wi-fi

  Serial.print("Conectando...");
  while (WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.print("Conectado con éxito, mi IP es:");
  Serial.print(WiFi.localIP());
  
  //pinMode(pinFotorreceptor,INPUT);
}

void loop() {
  temperatura=dht.readTemperature();// se lee la temperatura del dth
  humedad=dht.readHumidity();// se lee la humedad del dth

  if (isnan(humedad)  || isnan(temperatura)){ // Se verifican que los valores sean NaN (Not a Number), ya que el sensor arroja valores de este tipo (float) como respuesta y asi sabemos si funciona correctamente.
    Serial.println("DHT reding fail");
    return;
  }

  Serial.print("Humedad: ");
  Serial.print(humedad);
  Serial.println("%");
  
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println("°C");


  valor = analogRead(pinFotorreceptor);//Se leen los valores del fotorreceptor
  Serial.print("El valor del fotorreceptor es:");
  Serial.println(valor); //(Entre mas alto, menos luminosidad hay y visebersa )
  
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

    HTTPClient http;
    // Format the data as a JSON object
    String datos_a_enviar = "{\"valor\":" + String(valor) + "}"; 

    http.begin(wifiClient,"");        //Indicamos el destino
    http.addHeader("Content-Type", "application/json"); // Change the content type to application/json

    int codigo_respuesta = http.POST(datos_a_enviar);   //Enviamos el post pasándole, los datos que queremos enviar. (esta función nos devuelve un código que guardamos en un int)



    datos_a_enviar = "{\"valor\":" + String(temperatura) + "}"; 
    http.begin(wifiClient,"");        //Indicamos el destino
    http.addHeader("Content-Type", "application/json"); // Change the content type to application/json

    codigo_respuesta = http.POST(datos_a_enviar);

    datos_a_enviar = "{\"valor\":" + String(humedad) + "}"; 
    http.begin(wifiClient,"");        //Indicamos el destino
    http.addHeader("Content-Type", "application/json"); // Change the content type to application/json

    codigo_respuesta = http.POST(datos_a_enviar);


    if(codigo_respuesta>0){
      Serial.println("Código HTTP ► " + String(codigo_respuesta));   //Print return code

      if(codigo_respuesta == 200){
        String cuerpo_respuesta = http.getString();// Se imprime la respuesta del servidor
        Serial.println("El servidor respondió ▼ ");
        Serial.println(cuerpo_respuesta);
      }

    }else{
     Serial.print("Error enviando POST, código: ");
     Serial.println(codigo_respuesta);
    }

    http.end(); //libero recursos

}else{
     Serial.println("Error en la conexión WIFI");
}

   delay(2000);


}
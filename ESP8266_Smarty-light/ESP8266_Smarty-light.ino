/*English below
Programmation du ESP8266 pour utilisation avec le projet Smarty-light - http://smarty-light.com
Merci énormément au développeurs des librairies suivantes: 
        -Links2004 pour la librairie Arduino WebSockets (https://github.com/Links2004/arduinoWebSockets)
        -timum-viw pour la librairie Arduino Socket.io-client (https://github.com/timum-viw/socket.io-client)

----------------------------------------------------------
ESP8266 programming to use with the Smarty-Light open source project - http://smarty-light.com
Huge thanks to the developpers of those librarys:
        -Links2004 for the library "Arduino WebSockets"" (https://github.com/Links2004/arduinoWebSockets)
        -timum-viw for the Arduino library "Socket.io-client"" (https://github.com/timum-viw/socket.io-client)


*/

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <SocketIoClient.h>

//Pour utiliser le port Serial
#define USE_SERIAL Serial

//Déclaration d'adaptateur WiFi
ESP8266WiFiMulti WiFiMulti;
//Variables Wifi 
const char* ssid     = "======Changez pour votre nom de réseau Wifi======";
const char* password = "======Changez pour votre mot de passe Wifi======";

//Déclaration du client Socket.IO
SocketIoClient webSocket;
//Variables Socket.IO
const char* host = "192.168.1.100";// Remplacez par votre valeur
const int port = 3000; //Remplacez par le port du Serveur API. 3000 est la valeur par défaut.

int redPin = 14;
int greenPin = 4;
int bluePin = 5;
int redValue, greenValue, blueValue;

void event(const char * payload, size_t length) {
  String string(payload);
  int commaIndex = string.indexOf(',');
  //  On cherche la prochaine virgule après la première
  int secondCommaIndex = string.indexOf(',', commaIndex + 1);

  redValue = string.substring(0, commaIndex).toInt();
  greenValue = string.substring(commaIndex+1, secondCommaIndex).toInt();
  blueValue = string.substring(secondCommaIndex+1).toInt();
  USE_SERIAL.printf("got message: %s\n", payload);
  USE_SERIAL.printf("red =  %d\n", redValue);
  USE_SERIAL.printf("green =  %d\n", greenValue);
  USE_SERIAL.printf("blue =  %d\n", blueValue);
}


void setup() {
    USE_SERIAL.begin(115200);
    USE_SERIAL.setDebugOutput(true);
    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();
      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);

      }
    WiFiMulti.addAP(ssid, password);
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }
    webSocket.on("Data", event);

    //On se connect au webSocket
    webSocket.begin(host, port);

    //Initialisation des pins pour la LED
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);
}



void loop() {
    //Loop requise pour le webSocket
    webSocket.loop();

    analogWrite(redPin, redValue);
    analogWrite(greenPin, greenValue);
    analogWrite(bluePin, blueValue);
}

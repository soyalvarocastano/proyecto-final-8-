# 🚀 Proyecto Final - Backend Dockerizado

Este repositorio contiene la imagen de Docker para el backend del **Proyecto Final** desarrollado por **Cristian Correa**.  
La imagen está lista para ser usada en entornos de desarrollo o despliegue. Asegúrate de seguir los pasos a continuación para descargar, correr y personalizar la imagen.

🔗 **Docker Hub Repository:**  
[https://hub.docker.com/repository/docker/devalvarocastano/proyecto_final/general](https://hub.docker.com/repository/docker/devalvarocastano/proyecto_final/general)

---

## 🔧 Cómo usar la imagen Docker

### 1. Descargar la imagen desde Docker Hub

Si aún no tienes la imagen en tu máquina local, puedes descargarla con el siguiente comando:

```bash
docker pull devalvarocastano/proyecto_final:1.0.0
```

Si has realizado cambios y deseas subir la nueva versión de la imagen, primero debes etiquetarla correctamente:

```bash
docker tag proyecto_final:1.0.0 devalvarocastano/proyecto_final:tagname
```

Luego, puedes subirla a Docker Hub con el siguiente comando:

```bash
docker push devalvarocastano/proyecto_final:tagname
```

Para ejecutar la imagen de Docker, simplemente corre el siguiente comando, el cual expondrá el servicio en el puerto 3000 de tu máquina local:

```bash
docker run -p 3000:3000 devalvarocastano/proyecto_final:1.0.0
```

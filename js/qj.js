if (!document.querySelector('#panolens canvas')) {const panoramaViewer = (element, image) => {let el = document.querySelector(element);let panorama = new PANOLENS.ImagePanorama(image);let viewer = new PANOLENS.Viewer({container: el,cameraFov: 100,autoRotate: true,autoRotateSpeed: 0.5,utoRotateActivationDuration: 5});viewer.add(panorama);};const image = imgqj;const element = "#panolens";panoramaViewer(element, image);}
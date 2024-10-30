
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
var Animations = {

    spin: function () {
        coin.rotation.y += 0.1;
    },
    flip: function () {
        coin.rotation.y += Math.PI / 180; // Поворот как флип
    },
    wobble: function () {
        coin.rotation.y += Math.sin(Date.now() * 0.01) * 0.1;
    },
    pulse: function () {
        coin.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.9;
    },
    shake: function () {
        coin.position.x += (Math.random() - 0.5) * 0.02;
        coin.position.y += (Math.random() - 0.5) * 0.02;
    },
    tilt: function () {
        coin.rotation.x += 0.01;
        coin.rotation.y += 0.01;
    },
    flirt: function () {
        coin.position.x += Math.sin(Date.now() * 0.01) * 0.01;
        coin.position.z += Math.cos(Date.now() * 0.001) * 0.01;
    },
    drift: function () {
        coin.position.x += Math.sin(Date.now() * 0.001) * 0.01;
        coin.position.z += Math.cos(Date.now() * 0.001) * 0.01;
    },
    bounce: function () {
        coin.position.y = Math.abs(Math.sin(Date.now() * 0.005)) * 0.1;
    },
    wave: function () {
        coin.position.y += Math.sin(Date.now() * 0.01) * 0.01; // Волнообразное движение
        coin.position.x += Math.cos(Date.now() * 0.01) * 0.01;
    },
    rotateX: function (type) {
        if (type) coin.rotation.x += 0.01; else coin.rotation.x -= 0.01;
    },
    rotateZ: function (type) {
        if (type) coin.rotation.z += 0.01; else coin.rotation.z -= 0.01;
    },
    // rotateXY: function (type) {
    //     if (type) {
    //         coin.rotation.x += 0.01;
    //         coin.rotation.y += 0.01;
    //     } else {
    //         coin.rotation.x -= 0.01;
    //         coin.rotation.y -= 0.01;
    //     }
    // },
  
    scale: function () {
        if (scaleType) {
            if (coin.scale.y <= maxScaleY) {
                coin.scale.y += 0.005;
                coin.scale.x += 0.005;
            } else scaleType = false;
        } else {
            if (coin.scale.y >= maxScaleY - 0.5) {
                coin.scale.y -= 0.001;
                coin.scale.x -= 0.001;
            } else scaleType = true;
        }
    },

   fadeOut: function () {
        if (coin.material[0].opacity > 0) {
            coin.material[0].opacity -= 0.01;
            coin.material[0].transparent = true;
            coin.material[1].opacity -= 0.01;
            coin.material[1].transparent = true;
            coin.material[2].opacity -= 0.01;
            coin.material[2].transparent = true;
        }
    },
    fadeIn: function () {
        if (coin.material[0].opacity < 1) {
            coin.material[0].opacity += 0.01;
            coin.material[0].transparent = true;
            coin.material[1].opacity += 0.01;
            coin.material[1].transparent = true;
            coin.material[2].opacity += 0.01;
            coin.material[2].transparent = true;
        }
    },

    scaleUp: function () {
        coin.scale.x += 0.01;
        coin.scale.y += 0.01;
    },
    scaleDown: function () {
        coin.scale.x -= 0.01;
        coin.scale.y -= 0.01;
    },
    moveLeft: function () {
        coin.position.x -= 0.01;
    },
    moveRight: function () {
        coin.position.x += 0.01;
    },
    moveUp: function () {
        coin.position.y += 0.01;
    },
    moveDown: function () {
        coin.position.y -= 0.01;
    },

 
 

    // rotateXYBounce: function () {
    //     coin.rotation.x += 0.01;
    //     coin.rotation.y += 0.01;
    //     coin.position.y = Math.abs(Math.sin(Date.now() * 0.005)) * 0.1; // Прыжок
    // },
    // elastic: function () {
    //     coin.scale.x += Math.sin(Date.now() * 0.01) * 0.01;
    //     coin.scale.y += Math.sin(Date.now() * 0.01) * 0.01;
    // },
    // slideIn: function () {
    //     coin.position.x += 0.01; // Плавное появление
    // },
    // slideOut: function () {
    //     coin.position.x -= 0.01; // Плавное исчезновение
    // },
  
    // spinAndScale: function () {
    //     coin.rotation.y += 0.1;
    //     coin.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.1; // Увеличение при вращении
    //     coin.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.1;
    // },
    // rotateAndMove: function () {
    //     coin.rotation.y += 0.01;
    //     coin.position.z += 0.01; // Вращение и движение вперед
    // },

    // colorChange: function () {
    //     const color = Math.floor(Math.abs(Math.sin(Date.now() * 0.01)) * 255);
    //     coin.material.color.setRGB(color / 255, color / 255, color / 255); // Изменение цвета
    // },
    // // Новые анимации
    // spinWithBounce: function () {
    //     coin.rotation.y += 0.1;
    //     coin.position.y = Math.abs(Math.sin(Date.now() * 0.005)) * 0.1; // Прыжок
    // },
    // rotateAndScale: function () {
    //     coin.rotation.y += 0.01;
    //     coin.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.05;
    //     coin.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.05;
    // },
    // oscillate: function () {
    //     coin.position.y += Math.sin(Date.now() * 0.01) * 0.01; // Осцилляция по Y
    //     coin.position.x += Math.cos(Date.now() * 0.01) * 0.01; // Осцилляция по X
    // },

    // pulsateColor: function () {
    //     const colorValue = Math.abs(Math.sin(Date.now() * 0.01));
    //     coin.material.color.setRGB(colorValue, colorValue, colorValue); // Пульсация цвета
    // },
    // flipAndBounce: function () {
    //     coin.rotation.y += Math.PI / 180;
    //     coin.position.y = Math.abs(Math.sin(Date.now() * 0.005)) * 0.1; // Прыжок
    // },
    // float: function () {
    //     coin.position.y += Math.sin(Date.now() * 0.002) * 0.005; // Плавание вверх и вниз
    // },
    // rotateAndTilt: function () {
    //     coin.rotation.y += 0.01;
    //     coin.rotation.x += 0.01; // Вращение и наклон
    // },
    // rotateAndShake: function () {
    //     coin.rotation.y += 0.1; // Вращение
    //     coin.position.x += (Math.random() - 0.5) * 0.02; // Дрожание
    //     coin.position.y += (Math.random() - 0.5) * 0.02; // Дрожание
    // },
    // rotateAndWobble: function () {
    //     coin.rotation.y += 0.1; // Вращение
    //     coin.rotation.x += Math.sin(Date.now() * 0.01) * 0.05; // Дрожание
    // },
    // pulseScaleAndColor: function () {
    //     const pulse = Math.abs(Math.sin(Date.now() * 0.01));
    //     coin.scale.set(pulse, pulse, pulse); // Пульсация масштаба
    //     coin.material.color.setRGB(pulse, pulse, pulse); // Пульсация цвета
    // },
    // // Добавленные анимации
    // rotateAndScaleBounce: function () {
    //     coin.rotation.y += 0.01;
    //     coin.scale.x = 1 + Math.abs(Math.sin(Date.now() * 0.01)) * 0.1; // Увеличение с прыжком
    //     coin.scale.y = 1 + Math.abs(Math.sin(Date.now() * 0.01)) * 0.1;
    //     coin.position.y = Math.abs(Math.sin(Date.now() * 0.005)) * 0.1; // Прыжок
    // },
  
    // bob: function () {
    //     coin.position.y += Math.sin(Date.now() * 0.005) * 0.02; // Подъем и опускание
    // },
    // bobAndRotate: function () {
    //     coin.rotation.y += 0.01; // Вращение
    //     coin.position.y += Math.sin(Date.now() * 0.005) * 0.02; // Подъем и опускание
    // },
    // rotateAndChangeColor: function () {
    //     coin.rotation.y += 0.1; // Вращение
    //     const colorValue = Math.abs(Math.sin(Date.now() * 0.01));
    //     backMaterial.color.setHex(0x0e1626) // Красный цвет меняется
    // }
    // fadeIn: function () {
    //     // Плавное увеличение прозрачности до полной видимости
    //     if (coin.material.opacity < 1) {
    //         coin.material.opacity += 0.01;
    //         coin.material.transparent = true;
    //     }
    // },
 
    // rotate360X: function () {
    //     // Полный поворот по оси X на 360 градусов
    //     coin.rotation.x += 0.1;
    //     if (coin.rotation.x >= 2 * Math.PI) coin.rotation.x = 0;
    // },
    // rotate360Y: function () {
    //     // Полный поворот по оси Y на 360 градусов
    //     coin.rotation.y += 0.1;
    //     if (coin.rotation.y >= 2 * Math.PI) coin.rotation.y = 0;
    // },
    // rotate360Z: function () {
    //     // Полный поворот по оси Z на 360 градусов
    //     coin.rotation.z += 0.1;
    //     if (coin.rotation.z >= 2 * Math.PI) coin.rotation.z = 0;
    // },
    // moveLeftRight: function () {
    //     // Движение из стороны в сторону по оси X
    //     coin.position.x = Math.sin(Date.now() * 0.005) * 2;
    // },
    // moveUpDown: function () {
    //     // Движение вверх и вниз по оси Y
    //     coin.position.y = Math.cos(Date.now() * 0.005) * 2;
    // },
    // moveInCircle: function () {
    //     // Круговое движение в плоскости XZ
    //     const radius = 2;
    //     coin.position.x = radius * Math.cos(Date.now() * 0.001);
    //     coin.position.z = radius * Math.sin(Date.now() * 0.001);
    // },
    // spin: function () {
    //     // Постоянное вращение по всем осям
    //     coin.rotation.x += 0.01;
    //     coin.rotation.y += 0.01;
    //     coin.rotation.z += 0.01;
    // },
    // tiltX: function () {
    //     // Наклон вперед и назад по оси X
    //     coin.rotation.x = Math.sin(Date.now() * 0.005) * 0.5;
    // },
    // tiltY: function () {
    //     // Наклон влево и вправо по оси Y
    //     coin.rotation.y = Math.cos(Date.now() * 0.005) * 0.5;
    // },
    // growAndShrink: function () {
    //     // Рост и уменьшение размера объекта
    //     const scaleFactor = 1 + 0.3 * Math.sin(Date.now() * 0.005);
    //     coin.scale.set(scaleFactor, scaleFactor, scaleFactor);
    // },
    // wobble: function () {
    //     // Эффект покачивания
    //     coin.rotation.x = 0.1 * Math.sin(Date.now() * 0.005);
    //     coin.rotation.z = 0.1 * Math.cos(Date.now() * 0.005);
    // },
    // shake: function () {
    //     // Эффект тряски объекта
    //     coin.position.x = (Math.random() - 0.5) * 0.01;
    //     coin.position.y = (Math.random() - 0.5) * 0.01;
    //     coin.position.z = (Math.random() - 0.5) * 0.01;
    // },
    // oscillateOpacity: function () {
    //     // Колебания прозрачности
    //     coin.material.opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.005);
    //     coin.material.transparent = true;
    // },
    // colorShift: function () {
    //     // Постепенное изменение цвета
    //     const hue = (Date.now() * 0.001) % 1;
    //     coin.material.color.setHSL(hue, 0.5, 0.5);
    // },
    // glowEffect: function () {
    //     // Эффект свечения
    //     coin.material.emissiveIntensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.005);
    //     coin.material.emissive = new THREE.Color(0xFFFF00); // Жёлтый цвет свечения
    // },
    // spiralMovement: function () {
    //     // Спиральное движение по осям X и Y
    //     const angle = Date.now() * 0.001;
    //     const radius = 0.5 + 0.5 * Math.sin(Date.now() * 0.001);
    //     coin.position.x = radius * Math.cos(angle);
    //     coin.position.y = radius * Math.sin(angle);
    // },
    // zigzag: function () {
    //     // Зигзагообразное движение по оси X
    //     coin.position.x = Math.sin(Date.now() * 0.005) * 2;
    //     coin.position.y = (Date.now() * 0.001) % 2;
    // }
}
//var types = [Animations.rotateX, Animations.rotateY, Animations.rotateXY, Animations.scale, Animations.bounce];
var types =   Object.values(Animations); 

function setType(type){
currentAnimation = types[type];
}

document.addEventListener('click', (event) => {
    if (!document.getElementById('main-menu').contains(event.target) && !document.getElementById('menu-button').contains(event.target)) {
        document.getElementById('main-menu').classList.remove('active');
    }
});

types.forEach((animation, index) => {
    var button = document.createElement('button');
    button.className = 'tile';
    button.innerText = `${Object.keys(Animations)[index]}`; // Текст кнопки
    button.addEventListener('click', function() {
        // coin.rotation.x = Math.PI / 2;
        // coin.rotation.y = Math.PI / 2;
        setType(index);
        document.getElementById('main-menu').classList.remove('active'); // Вызываем setType с индексом элемента

    });
    document.getElementsByClassName('grid')[0].appendChild(button); // Добавляем кнопку в контейнер
});


const container = document.getElementById('coin-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
renderer.setSize(512, 512)
renderer.setClearColor(0x0E1621, 1)
container.appendChild(renderer.domElement);
const geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 100); 
//const geometry2 = new THREE.CylinderGeometry(0.2, 0.2, 0.1005, 50); 
 // radius, tube, radialSegments, tubularSegments
 // radius, segments
// r, widthSegments, heightSegments



const textureLoader = new THREE.TextureLoader();
// textureLoader.load('bg.png', function(texture) {
//     scene.background = texture;
// });
const frontTexture = textureLoader.load('iccoin.png',  (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI; // Обновляем текстуру
});
const sideTextute = textureLoader.load('iccoin.png');
const backTexture = textureLoader.load('image.png');

const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture,  transparent: true,  depthWrite: true})
const sideMaterial = new THREE.MeshStandardMaterial({ map: sideTextute, transparent: true, depthWrite: true});
const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture,  transparent: true,  depthWrite: true,  });
//const bottomCircle = new THREE.Mesh(geometry2, [backMaterial, backMaterial, frontMaterial]);
const  coin = new THREE.Mesh(geometry, [backMaterial, backMaterial, frontMaterial]);
coin.rotation.x = -Math.PI / 2;
coin.scale.set(0.4, 0.4, 0.4); 
coin.rotation.x = Math.PI / 2;
coin.rotation.y = Math.PI / 2;
// bottomCircle.rotation.x = 1.5;
// bottomCircle.rotation.y = 1.6;

scene.add(coin);

const reflectionCylinder = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    map: backTexture,  transparent: true,  depthWrite: true, 
    opacity: 0.5, // Прозрачность для отражения
}));
reflectionCylinder.rotation.x = Math.PI / 2;
reflectionCylinder.rotation.y = -Math.PI / 2;
reflectionCylinder.scale.set(0.5, 0.5, 0.5);
reflectionCylinder.position.y = -0.67; // Устанавливаем на нужную высоту
// scene.add(reflectionCylinder);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Увеличенная интенсивность
scene.add(ambientLight);
const rotations = [1, 0, 0];

// const fontLoader = new FontLoader();
// fontLoader.load('path/to/your/font.typeface.json', (font) => {
//     const textGeometry = new TextGeometry('Hello, World!', {
//         font: font,
//         size: 0.5,
//         height: 0.1,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 0.03,
//         bevelSize: 0.02,
//         bevelSegments: 5
//     });

//     const textMaterial = new THREE.MeshStandardMaterial({ color:  });
//     const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
//     // Устанавливаем позицию текста

//     scene.add(textMesh);
// });

// Создайте canvas для текста
// const canvas = document.createElement('canvas');
// const context = canvas.getContext('2d');
// context.font = 'bold 32px Arial'; // Задайте стиль шрифта
// context.fillStyle = 'white'; // Цвет текста
// context.fillText('0 тряски', 0, 40); // Рисуем текст на канвасе

// // Создайте текстуру из канваса
// const texture = new THREE.Texture(canvas);
// texture.needsUpdate = true;

// // Создайте материал с текстурой
// const textMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

// // Создайте геометрию (например, плоскость) для отображения текста
// const planeGeometry = new THREE.PlaneGeometry(0.4, 0.3); // Размер плоскости
// const textPlane = new THREE.Mesh(planeGeometry, textMaterial);
// textPlane.position.z = 0.2;
// textPlane.position.y = -0.45;
// textPlane.position.x = 0.125 // Установите позицию
// scene.add(textPlane);

// // Создайте форму сердечка
// // Создайте форму сердечка
// let atmosphere = new THREE.Object3D();
// scene.add(atmosphere);

// // Создаем форму сердца
// let heartShape = new THREE.Shape();
// heartShape.moveTo(25, 25);
// heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
// heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
// heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
// heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
// heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
// heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);
// // Настройки экструзии
// var extrudeSettings = {
//     depth: 1,  // Глубина экструзии


//     steps: 1,
// };
// // Создаем геометрию сердца
// let geometry2 = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

// // Создаем материал
// let material = new THREE.MeshStandardMaterial({
//     map: backTexture,
// });

// // Создаем сетку сердца
// let heart = new THREE.Mesh(geometry2, material);

// // Устанавливаем позицию и вращение
// heart.position.set(0, 0, 0);
// heart.scale.x = 0.1;
// heart.scale.y = 0.1;
// heart.rotation.x = Math.PI; // Поворот по оси X
// heart.rotation.y = Math.PI;


// // Добавляем сердце в атмосферу
// atmosphere.add(heart);

// // Устанавливаем позицию камеры
// camera.position.z = 100;



// Добавьте сердечко в сцену


// const canvas = document.createElement('canvas');
// const context = canvas.getContext('2d');
// context.font = '20px Arial';
// context.fillStyle = '#ffffff';
// context.fillText('TONWORLD', 100, 40);



// Создаем текстуру
// const texture = new THREE.CanvasTexture(canvas);
// const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
// const planeGeometry = new THREE.PlaneGeometry(1, 1); // Настраиваем размеры под нужный текст
// const textMesh = new THREE.Mesh(planeGeometry, material);
// textMesh.rotation.x = 1.6;
// scene.add(textMesh);

var gif;
var capturing = false;


var currentAnimation = Animations.bounce;
function animateRotateX() {
    coin.rotation.x += 0.01;
    renderer.render(scene,camera);
    requestAnimationFrame(animateRotateX);
}

function animateRotateY() {
    requestAnimationFrame(animateRotateY);
    coin.rotation.y += 0.01;
    renderer.render(scene,camera);
}

function animateRotateXY() {
    requestAnimationFrame(animateRotateXY);
    coin.rotation.x += 0.01;
    coin.rotation.y += 0.01;
    renderer.render(scene,camera);
}

var maxScaleY = coin.scale.y + 0.1;
var scaleType = true;
function animate() {

    renderer.render(scene, camera);
    currentAnimation();
    if(capturing) captureGIF();
    requestAnimationFrame(animate);
}



// if(type == "rotate-x"){
//     document.getElementById('menu-button').innerText = "Horizontal Rotating"
//     currentAnimation = Animations.rotateX;
// }else if(type == "rotate-y"){
//    document.getElementById('menu-button').innerText = "Vertical Rotating"
//    currentAnimation = Animations.rotateY;
// }else if(type == "rotate-xy"){
//     document.getElementById('menu-button').innerText = "Vertical and Horizontal Rotating"
//     currentAnimation = Animations.rotateXY;
//  }else if(type == "scale"){
//     document.getElementById('menu-button').innerText = "Vertical Rotating"
//     currentAnimation = Animations.scale;
   
//  }else if(type == "position-y"){
//     document.getElementById('menu-button').innerText = "Vertical Rotating"
//     currentAnimation = Animations.tiltY;
//  }

 animate();
function captureGIF() {
    // html2canvas(container, { backgroundColor: null}).then(canvas => {
    //   gif.addFrame(canvas, { delay:100/5});
    // });

    gif.addFrame(renderer.domElement, { copy: true,  delay:15});
    
}  

 document.getElementById('record-button').addEventListener('click', (event) => {
    if(!capturing){
        gif = new GIF({
            workers: 2,
            quality: 20,
            repeat: 0,
            depthWrite: 1,
           // Установите цвет для прозрачного фона
        });
        gif.on('finished', function(blob) {
            const url = URL.createObjectURL(blob);
            const slidingResultMenu = document.createElement("div")
            slidingResultMenu.className = "result-menu";
            document.body.appendChild(slidingResultMenu);
            const img = document.createElement('img');
            img.src = url;
            img.style.width = "200px";
            img.style.height = "200px";
            slidingResultMenu.appendChild(img);
            slidingResultMenu.classList.add('active'); 
            const button = document.createElement('button');
            button.innerText = "Download"
            const link = document.createElement('a');
            link.href = url;
            link.download = 'downloaded.gif'; // Имя файла при скачивании
            button.addEventListener('click', function() {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            });
            slidingResultMenu.appendChild(button);
          // Добавление GIF на страницу
        });
        capturing = true;

      //  startProgress();
    }else{
        capturing = false;
        gif.render();
    }
});
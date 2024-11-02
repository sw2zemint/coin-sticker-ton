
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
var uploadType;


var Settings = {
     editorState: 0
}

var Settings_ = Settings;

var Animations = {

    spin: function () {
      coin.rotation.y += 0.1;
       // plane.rotation.z += 0.1;
       // plane.position.x += 0.001;
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
        //plane.position.y = (Math.abs(Math.sin(Date.now() * 0.005)) * 0.1) - 0.1;
    },
    wave: function () {
        coin.position.y += Math.sin(Date.now() * 0.01) * 0.01; // Волнообразное движение
        coin.position.x += Math.cos(Date.now() * 0.01) * 0.01;
    }
};

var types =   Object.values(Animations); 

function setType(type){
currentAnimation = types[type];
}
var vParam = 4;
// document.getElementById('increase').addEventListener('click', () => {
//     vParam += 1; // Увеличиваем радиус
//     coin.geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, vParam); 
// });

// document.getElementById('decrease').addEventListener('click', () => {
//     vParam -= 1; // Уменьшаем радиус, но не ниже 0.1
//     coin.geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, vParam); 
// });


// document.getElementById('rotation-x').addEventListener('click', () => {
//     coin.rotation.x += 0.1;
// });

// document.getElementById('rotation-y').addEventListener('click', () => {
//     coin.rotation.y += 0.1;
// });

// document.getElementById('rotation-z').addEventListener('click', () => {
//     coin.rotation.z += 0.1;
// });


document.querySelectorAll('.button-plus, .button-minus').forEach((button, index) => {
    button.addEventListener('click', (event) => {
        const adjustment = event.target.classList.contains('button-plus') ? 0.1 : -0.1;
        coin[['position', 'rotation', 'scale'][ Settings_.editorState]][event.target.dataset.action] += adjustment;
    });
});
const buttons = document.querySelectorAll('.editor-tag');
buttons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        Settings_.editorState = index;
        document.querySelectorAll('.editor-container').forEach(btn => btn.style.background = '#0e1621'); // Set the default color
        document.querySelectorAll('.editor-container')[index].style = 'background: linear-gradient(90deg, #073e5e  , #246bbd46, #00000000);'; // Set the selected color for the clicked button
    });
});


  
document.addEventListener('click', (event) => {
    if (!document.getElementById('main-menu').contains(event.target) && !document.getElementById('menu-button').contains(event.target)) {
        document.getElementById('main-menu').classList.remove('active');
    }
    if (!document.getElementById('textures-menu').contains(event.target) && !document.getElementById('textures-button').contains(event.target)) {
        document.getElementById('textures-menu').classList.remove('active');
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
 
 const renderer = new THREE.WebGLRenderer({ alpha: true});
 renderer.setSize(512, 512)
 renderer.setClearColor(0x0e1621, 0); 
 container.appendChild(renderer.domElement);
 const geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, vParam); 


const textureLoader = new THREE.TextureLoader();

const frontTexture = textureLoader.load('image.png',  (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI; // Обновляем текстуру
});
const sideTextute = textureLoader.load('image.png');
const backTexture = textureLoader.load('image.png');

const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture,  transparent: true,  depthWrite: true})
const sideMaterial = new THREE.MeshStandardMaterial({ map: sideTextute, transparent: true, depthWrite: true});
const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture,  transparent: true,  depthWrite: true,  });
//const bottomCircle = new THREE.Mesh(geometry2, [backMaterial, backMaterial, frontMaterial]);
var  coin = new THREE.Mesh(geometry, [sideMaterial, backMaterial, frontMaterial]);
coin.rotation.x = -Math.PI / 2;
coin.scale.set(0.4, 0.4, 0.4); 
coin.rotation.x = Math.PI / 2;
coin.rotation.y = Math.PI / 2;

scene.add(coin);

// const reflectionCylinder = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
//     map: backTexture,  transparent: true,  depthWrite: true, 
//     opacity: 0.5, // Прозрачность для отражения
// }));
// reflectionCylinder.rotation.x = Math.PI / 2;
// reflectionCylinder.rotation.y = -Math.PI / 2;
// reflectionCylinder.scale.set(0.5, 0.5, 0.5);
//reflectionCylinder.position.y = -0.67; // Устанавливаем на нужную высоту
// scene.add(reflectionCylinder);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Увеличенная интенсивность
scene.add(ambientLight);





































































































    // rotateX: function (type) {
    //     if (type) coin.rotation.x += 0.01; else coin.rotation.x -= 0.01;
    // },
    // rotateZ: function (type) {
    //     if (type) coin.rotation.z += 0.01; else coin.rotation.z -= 0.01;
    // },
    // rotateXY: function (type) {
    //     if (type) {
    //         coin.rotation.x += 0.01;
    //         coin.rotation.y += 0.01;
    //     } else {
    //         coin.rotation.x -= 0.01;
    //         coin.rotation.y -= 0.01;
    //     }
    // },
  
    // scale: function () {
    //     if (scaleType) {
    //         if (coin.scale.y <= maxScaleY) {
    //             coin.scale.y += 0.005;
    //             coin.scale.x += 0.005;
    //         } else scaleType = false;
    //     } else {
    //         if (coin.scale.y >= maxScaleY - 0.5) {
    //             coin.scale.y -= 0.001;
    //             coin.scale.x -= 0.001;
    //         } else scaleType = true;
    //     }
    // },

//    fadeOut: function () {
//         if (coin.material[0].opacity > 0) {
//             coin.material[0].opacity -= 0.01;
//             coin.material[0].transparent = true;
//             coin.material[1].opacity -= 0.01;
//             coin.material[1].transparent = true;
//             coin.material[2].opacity -= 0.01;
//             coin.material[2].transparent = true;
//         }
//     },
//     fadeIn: function () {
//         if (coin.material[0].opacity < 1) {
//             coin.material[0].opacity += 0.01;
//             coin.material[0].transparent = true;
//             coin.material[1].opacity += 0.01;
//             coin.material[1].transparent = true;
//             coin.material[2].opacity += 0.01;
//             coin.material[2].transparent = true;
//         }
//     },

    // scaleUp: function () {
    //     coin.scale.x += 0.01;
    //     coin.scale.y += 0.01;
    // },
    // scaleDown: function () {
    //     coin.scale.x -= 0.01;
    //     coin.scale.y -= 0.01;
    // },
    // moveLeft: function () {
    //     coin.position.x -= 0.01;
    // },
    // moveRight: function () {
    //     coin.position.x += 0.01;
    // },
    // moveUp: function () {
    //     coin.position.y += 0.01;
    // },
    // moveDown: function () {
    //     coin.position.y -= 0.01;
    // },

 
 

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

//var types = [Animations.rotateX, Animations.rotateY, Animations.rotateXY, Animations.scale, Animations.bounce];

// const rotations = [1, 0, 0];

// var x = 0, y = 0;

//   var light = new THREE.DirectionalLight(0x9955ff, 2);
//   light.position.x = -500;
//   light.position.y = 500;
//   camera.add( light );
  
// var light = new THREE.DirectionalLight(0x9955ff, 1);
// light.position.x = 30;
// light.position.y = -10;
// light.position.z = -50;
// camera.add( light );

// scene.background = new THREE.Color( '#993355' );

//  var heartShape = new THREE.Shape();
//  heartShape.moveTo( x + 25, y + 25 );
//  heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
//  heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
//  heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
//  heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
//  heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
//  heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );

// var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 20, bevelThickness: 10 };

//     addShape( heartShape,  extrudeSettings, '#ff0022', 
//              Math.random()*0.8, Math.random()*0.8, Math.PI);



var shapes = [];

// function addShape( shape, extrudeSettings, color, rx, ry, rz) {
// var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
// var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
// mesh.position.set( 0, 0, 0 );
// mesh.scale.set( 0.003, 0.003, 0.003);	
// mesh.rotation.set(rx, ry-0.5, rz)
// // shapes.push({shape: mesh, x: Math.random(), y: Math.random(), z: Math.random()});
// scene.add(mesh);
// coin = mesh;
// }


//   var light = new THREE.DirectionalLight(0x9955ff, 2);
//   light.position.x = -500;
//   light.position.y = 500;
//   camera.add( light );
  
// var light = new THREE.DirectionalLight(0x9955ff, 1);
// light.position.x = 500;
// light.position.y = -500;
// light.position.z = -150;
// camera.add( light );

// scene.background = new THREE.Color( '#993355' );

// var x = 0, y = 0;
// var heartShape = new THREE.Shape();
// heartShape.moveTo( x + 25, y + 25 );
// heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
// heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
// heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
// heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
// heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
// heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );

// var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 20, bevelThickness: 10 };


//     addShape( heartShape,  extrudeSettings, '#ff0022',   0, 0, 0, 
//              Math.random()*0.8, Math.random()*0.8, Math.PI, 0.0025 );

//  renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setSize( 512, 512 );

// render();

 

// function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
// var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
// var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
// mesh.position.set( x, y, z );
// mesh.rotation.set( rx, ry, rz );
// mesh.scale.set( s, s, s );	
// shapes.push({shape: mesh, x: Math.random(), y: Math.random(), z: Math.random()});
// scene.add(mesh);
// }

// function animate1() {
// var speed = 0.05;
// shapes.forEach(el => {
//   el.shape.rotation.x += el.x * speed;
//   el.shape.rotation.y += el.y * speed;
//   el.shape.rotation.z += el.z * speed;
// });
// }

// function render() {
//   requestAnimationFrame(render);
//   animate1();
//   renderer.render(scene, camera);
// }
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

const uploadInput = document.getElementById('file-upload');
uploadInput.addEventListener('change', (event) => {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load(e.target.result, () => {
                    // Устанавливаем текстуру в соответствующий материал
                    document.getElementsByClassName("delete-icon")[uploadType].style.display = "block";
                    if (uploadType == 0) {
                        container.style.backgroundImage = `url(${e.target.result})`;
                    } else if (uploadType == 1) {
                        frontMaterial.map = texture; // Устанавливаем текстуру для фронтального материала
                        frontMaterial.needsUpdate = true;
                    } else if (uploadType == 2) {
                        sideMaterial.map = texture; // Устанавливаем текстуру для бокового материала
                        sideMaterial.needsUpdate = true;
                    } else if (uploadType == 3) {
                        backMaterial.map = texture; // Устанавливаем текстуру для заднего материала
                        backMaterial.needsUpdate = true;
                    }
                });
            } else {
                alert('only PNG or JPG');
            }
             uploadInput.value = '';
        };
        

        reader.readAsDataURL(file);
        
    }
});


let timerInterval;
['container-image',   'front-texture-image',
 'side-texture-image', 'back-texture-image'].forEach((id, index) => {
    document.getElementById(id).addEventListener('click', () => {
        uploadInput.click();
        uploadType = index;
    });
});

// var stats;
// var camera, renderer;
// var group, shapes = [];
// init();

// function init(){

// //   var light = new THREE.DirectionalLight(0x9955ff, 2);
// //   light.position.x = -50;
// //   light.position.y = 50;
// //   camera.add( light );
  
//   var light = new THREE.DirectionalLight(0xffffff, 0.06);
//   light.position.x = 0;
//   light.position.y = 0;
//   light.position.z = 0;
//   camera.add( light );
  
//   scene.background = new THREE.Color( '#0E1621' );
 
//   var x = 0, y = 0;
//   var heartShape = new THREE.Shape();
//   heartShape.moveTo( x + 25, y + 25 );
//   heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
//   heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
//   heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
//   heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
//   heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
//   heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
  
//   var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 20, bevelThickness: 10 };
  

//       addShape( heartShape,  extrudeSettings, '#000000',   0, 0, 0, 
//                Math.random()*0.8, Math.random()*0.8, Math.PI, 0.0025 );
  
  
//   renderer = new THREE.WebGLRenderer( { antialias: true } );
//   // renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( 512, 512);

//container.appendChild( renderer.domElement );

// //   render();
  
// } 
// var coin;
// var plane;
// var item;
// function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
//   var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
//   const textureLoader = new THREE.TextureLoader();
// //   var texture1 = textureLoader.load('iccoin.png', function(texture) {
// //       texture.wrapS = THREE.ClampToEdgeWrapping;
// //       texture.wrapT = THREE.ClampToEdgeWrapping;
// //       texture.repeat.set(0.015, 0.015); // Увеличьте количество повторений
// //       texture.offset.set(0.15, -0.3); // Установите смещение
// //   // Устанавливаем смещение
// //   });
//       var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } )  );
//   mesh.position.set( x, y, z );
//   mesh.rotation.set( 0, 0, rz );
//   mesh.scale.set( s, s, s );	
//   shapes.push({shape: mesh, x: Math.random(), y: Math.random(), z: Math.random()});
//   coin = mesh;

// const planeGeometry = new THREE.CylinderGeometry(5, 5, 4, 100); // размеры 10x10, можно настроить
// var text1 = textureLoader.load('image.png', (texture) => {
//     texture.format = THREE.RGBAFormat;
// });
//     const material = new THREE.MeshBasicMaterial({
//         map: text1,
//         transparent: true,  // Включает прозрачность
//         opacity: 1.0,       // Полная видимость, можете регулировать от 0 до 1
//     });
//     // Добавляем текстуру на плоскость
//  plane = new THREE.Mesh(planeGeometry, material);
    
//  plane.rotation.set(Math.PI/2, Math.PI/2, 0)
//     plane.position.set(-0.06, -0.12, 0); // по центру сцены
//     plane.scale.set(0.015, 0.015, 0.015)

//     item = new THREE.Group();
// item.add(mesh);
// item.add(plane);
// scene.add(item);
// }

// function animate1() {
//   var speed = 0.05;
//   shapes.forEach(el => {
//     el.shape.rotation.x += el.x * speed;
//     el.shape.rotation.y += el.y * speed;
//     el.shape.rotation.z += el.z * speed;
//   });
// }

// function render() {
//     requestAnimationFrame(render);
//     animate1();
//     renderer.render(scene, camera);
// }
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
    if(capturing)   capturer.capture(renderer.domElement);
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

    gif.addFrame(renderer.domElement, { copy: true,  delay:33});
    
} document.getElementById('convert-button').addEventListener('click', async () => {
    const input = document.getElementById('gif-input');
    if (input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async function(event) {
        const gifData = new Uint8Array(event.target.result);
        
        // Initialize GIF.js
        const gif = new GIF({
            workers: 2,
            quality: 20,
            width: 320,
            height: 240
            
        });

        // Create frames (this should be your logic to add frames)
        for (let i = 0; i < 10; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 240;
            const ctx = canvas.getContext('2d');

            // Example: Fill with random color for illustration
            ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            ctx.fillRect(0, 0, 320, 240);

            // Add frame to GIF
            gif.addFrame(ctx, { delay: 200 });
        }

        // Finalize GIF creation
        gif.on('finished', async (blob) => {
            // Convert the GIF blob to WebM
            const webmBlob = await convertGIFToWebM(blob);
            const video = document.getElementById('video-output');
            const url = URL.createObjectURL(webmBlob);
            video.src = url;
        });

        gif.render();
    };

    reader.readAsArrayBuffer(file);
});

async function convertGIFToWebM(gifBlob) {
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    // Write the GIF file to FFmpeg's file system
    ffmpeg.FS('writeFile', 'input.gif', await fetchFile(gifBlob));

    // Run FFmpeg command to convert GIF to WebM
    await ffmpeg.run('-i', 'input.gif', 'output.webm');

    // Read the output WebM file
    const data = ffmpeg.FS('readFile', 'output.webm');

    // Return a new Blob for the WebM file
    return new Blob([data.buffer], { type: 'video/webm' });
}
var capturer;

 document.getElementById('record-button').addEventListener('click', (event) => {
    if(!capturing){
         capturer = new CCapture({
            format: 'png', // Формат записи
            framerate: 30, // Частота кадров
            verbose: true,
  background: 'red',
            alpha: false,
            width: 100, // Увеличьте ширину
            height: 100, // Увеличьте высоту// Включите подробный вывод в консоль
        });
        capturer.start();
        // gif = new GIF({
        //     workers: 1,
        //     delay: 33,
        //     quality: 20,
        //     repeat: 0,
        //     depthWrite: 1,

        //    // Установите цвет для прозрачного фона
        // });
        // gif.on('finished', function(blob) {
        //     const url = URL.createObjectURL(blob);
        //     const slidingResultMenu = document.createElement("div")
        //     slidingResultMenu.className = "result-menu";
        //     document.body.appendChild(slidingResultMenu);
        //     const img = document.createElement('img');
        //     img.src = url;
        //     img.style.width = "100px";
        //     img.style.height = "100px";
        //     slidingResultMenu.appendChild(img);
        //     slidingResultMenu.classList.add('active'); 
        //     const button = document.createElement('button');
        //     button.innerText = "Download"
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.download = 'downloaded.gif'; // Имя файла при скачивании
        //     button.addEventListener('click', function() {
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
      
        //     });
        //     document.getElementById('timer').textContent = "";
        //     slidingResultMenu.appendChild(button);
        //   // Добавление GIF на страницу
        // });
        capturing = true;
        let elapsedTime = 0; // Initialize elapsed time

        // Start a timer that updates the <p> element every second
        timerInterval = setInterval(() => {
            elapsedTime++;
            capturing = false;
            capturer.stop();
            capturer.save();
            document.getElementById('timer').textContent = "Recording: " + elapsedTime; // Update the timer display
        }, 2000);
      //  startProgress();
    }else{
     
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = "Rendering...";
        //gif.render();
    }
});
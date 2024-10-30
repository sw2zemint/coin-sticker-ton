const container = document.getElementById('coin-container');
const uploadInput = document.getElementById('file-upload');
const slidingMenu = document.getElementById('sliding-menu');
const settingsImg = document.getElementById('settings-img');
const texturesImg = document.getElementById('textures-img');
const xyzMenu = document.getElementById('rotate-container-2');

var isXYZVisible = false;

var uploadType;
Telegram.WebApp.ready(); // Инициализация WebApp

const tg = Telegram.WebApp;
const user = tg.initDataUnsafe.user;
// console.log(`User ID: ${user.id}, Username: ${user.username}`);

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

    document.getElementsByClassName("delete-icon")[0].onclick = () => {
        document.getElementsByClassName("delete-icon")[0].style.display = "none";
        container.style.backgroundImage = 'none';
    }
    document.getElementsByClassName("delete-icon")[1].onclick = () => {
        document.getElementsByClassName("delete-icon")[1].style.display = "none";
        frontMaterial.map = textureLoader.load('iccoin.png');; // Устанавливаем текстуру для фронтального материала
        frontMaterial.needsUpdate = true;
    }
    document.getElementsByClassName("delete-icon")[2].onclick = () => {
        document.getElementsByClassName("delete-icon")[2].style.display = "none";
        sideMaterial.map = textureLoader.load('iccoin.png');// Устанавливаем текстуру для бокового материала
        sideMaterial.needsUpdate = true;
    }
    document.getElementsByClassName("delete-icon")[3].onclick = () => {
        document.getElementsByClassName("delete-icon")[3].style.display = "none";
        backMaterial.map = textureLoader.load('iccoin.png');// Устанавливаем текстуру для заднего материала
        backMaterial.needsUpdate = true;
    }
settingsImg.addEventListener('click', (event) => {
    if (isXYZVisible){
        xyzMenu.classList.remove('active');
    }else xyzMenu.classList.add('active'); 
    isXYZVisible = !isXYZVisible;
});
document.addEventListener('click', (event) => {
    if (!slidingMenu.contains(event.target) && !texturesImg.contains(event.target)) {
        slidingMenu.classList.remove('active');
    }
});
texturesImg.addEventListener('click', (event) => {
        slidingMenu.classList.add('active');
});





const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
renderer.setSize(512, 512)
renderer.setClearColor(0x0E1621, 0)
container.appendChild(renderer.domElement);
const geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 100); 
//const geometry2 = new THREE.CylinderGeometry(0.2, 0.2, 0.1005, 50); 
 // radius, tube, radialSegments, tubularSegments
 // radius, segments
// r, widthSegments, heightSegments



const textureLoader = new THREE.TextureLoader();
const frontTexture = textureLoader.load('iccoin.png',  (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI; // Обновляем текстуру
});
const sideTextute = textureLoader.load('iccoin.png');
const backTexture = textureLoader.load('iccoin.png');

const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture,  transparent: true,  depthWrite: true})
const sideMaterial = new THREE.MeshStandardMaterial({ map: sideTextute, transparent: true, depthWrite: true});
const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture,  transparent: true,  depthWrite: true,  });
//const bottomCircle = new THREE.Mesh(geometry2, [backMaterial, backMaterial, frontMaterial]);
const topCircle = new THREE.Mesh(geometry, [backMaterial, backMaterial, frontMaterial]);
topCircle.rotation.x = -Math.PI / 2;
topCircle.scale.set(0.5, 0.5, 0.5); 
topCircle.rotation.x = Math.PI / 2;
topCircle.rotation.y = Math.PI / 2;
// bottomCircle.rotation.x = 1.5;
// bottomCircle.rotation.y = 1.6;
const coin = new THREE.Group();
coin.add(topCircle);
// coin.add(bottomCircle);



const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Увеличенная интенсивность
scene.add(ambientLight);
const rotations = [1, 0, 0];
// Создаем Canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
context.font = '20px Arial';
context.fillStyle = '#ffffff';
context.fillText('TONWORLD', 100, 40);

// Создаем текстуру
const texture = new THREE.CanvasTexture(canvas);
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
const planeGeometry = new THREE.PlaneGeometry(1, 1); // Настраиваем размеры под нужный текст
const textMesh = new THREE.Mesh(planeGeometry, material);
textMesh.rotation.x = 1.6;
scene.add(textMesh);
scene.add(coin);
// // Толщина окружности
// const outerRadius = 0.6; // Внешний радиус
// const innerRadius = 0.5; // Внутренний радиус
// const height = 0.1; // Высота цилиндра
// const radialSegments = 50; // Количество сегментов

// // Создаем внешнюю окружность
// const outerCylinder = new THREE.CylinderGeometry(outerRadius, outerRadius, height, radialSegments);

// // Создаем внутреннюю окружность
// const innerCylinder = new THREE.CylinderGeometry(innerRadius, innerRadius, height, radialSegments);

// // Создаем материал
// const material = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // Золотистый цвет

// // Создаем верхнюю часть (обычно окружность)
// const topCircle = new THREE.Mesh(outerCylinder, material);
// const bottomCircle = new THREE.Mesh(innerCylinder, material);

// // Перемещаем внутренний цилиндр вниз
// innerCylinder.translate(0, -height / 2, 0);

// // Перемещаем верхнюю окружность вверх
// topCircle.position.y = height / 2;
// bottomCircle.position.y = -height / 2;

// // Объединяем их в один объект

// // Добавляем в сцену

['x', 'y', 'z'].forEach((axis, index) => {
    document.getElementById(`rotate-btn-${axis}`).addEventListener('click', () => {
        rotations[index] = (rotations[index] + 1) % 3;
        document.getElementById(`rotate-btn-${axis}`).style.backgroundColor = ["#283441", "#28bb6a", "#b82828"][rotations[index]];
    });
});

var gif;

function captureGIF() {
    html2canvas(container, { backgroundColor: null}).then(canvas => {
      gif.addFrame(canvas, { delay:100/5});
    });
  }
var capturing = false;
var animation = true;

let rotationAngle = 0;
let rotationAngle2 = -1.6;
let isRotating = true;
let isUping = true;
let maxpos = coin.position.y + 0.5;
function animate() {
    requestAnimationFrame(animate);
    coin.rotation.x += 0.1;
    if(isUping){
if(coin.position.y < maxpos){
    coin.position.y += 0.01;
    coin.scale.x += 0.01;
    coin.scale.y += 0.01;
  
}else isUping = false;
}else{
    if(coin.position.y >= maxpos - 0.5){
        coin.position.y -= 0.01;
        coin.scale.x -= 0.01;
        coin.scale.y -= 0.01;
      
    }else isUping = true;
}
    // coin.rotation.x += rotations[0] === 1 ? 0.05 : rotations[0] === 2 ? -0.05 : 0;
    // coin.rotation.y += rotations[1] === 1 ? 0.05 : rotations[1] === 2 ? -0.05 : 0;
    // coin.rotation.z += rotations[2] === 1 ? 0.05 : rotations[2] === 2 ? -0.05 : 0;
    renderer.render(scene, camera);
    if(capturing){  
    if (isRotating) {
        // Увеличиваем угол вращения
        rotationAngle += 0.05; // Скорость вращения, можно изменять для плавности

        // Ограничиваем вращение до 360 градусов (2 * Math.PI радиан)
        // if (rotationAngle <= 1.6) {
        //     coin.rotation.x = rotationAngle;
           
        // }   
        // if (rotationAngle >= 1.6) {
        //     rotationAngle2 += 0.05;
        //     textMesh.rotation.x = rotationAngle2;
        // }
        if (rotationAngle >= 2 * Math.PI) {
            rotationAngle = 0;
        isRotating = false; 
        capturing = false;
        gif.render();
        }// Останавливаем вращение после полного оборота
        // Применяем вращение по оси Y (в зависимости от направления вращения)
   
       
    }
    coin.rotation.x = rotationAngle;
           
    renderer.render(scene, camera);
      captureGIF();
}
    //document.getElementById("info").innerText = "x: " + coin.rotation.x + "\ny: " + coin.rotation.y + "\nz: " + coin.rotation.z;
    
}

//animate();
const buttons = ['translate-left-btn', 'translate-right-btn', 'translate-top-btn', 'translate-bottom-btn'];

buttons.forEach(id => {
    document.getElementById(id).onclick = () => {
        buttons.forEach(buttonId => {
            document.getElementById(buttonId).style.backgroundColor = buttonId === id ? "#ffffff" : "#202b36";
        });
    };
});

document.getElementById('coin-container').addEventListener('click', (event) => {
    animation = !animation;
});
document.getElementById('start-capture').addEventListener('click', (event) => {
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
            img.style.width = "512px";
            img.style.height = "512px";
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
    }
});


function openScene(type) {
    window.location.href = `scene.html?type=${encodeURIComponent(type)}`;
} 

document.getElementById('container-image').addEventListener('click', (event) => {
    uploadInput.click();
    uploadType  = 0;
});

document.getElementById('front-texture-image').addEventListener('click', (event) => {
    uploadInput.click();
    uploadType  = 1;
});

document.getElementById('side-texture-image').addEventListener('click', (event) => {
    uploadInput.click();
    uploadType  = 2;
});

document.getElementById('back-texture-image').addEventListener('click', (event) => {
    uploadInput.click();
    uploadType  = 3;
});

function startProgress() {
    const progressBar = document.getElementById('info');
    let progress = 0;
    const totalDuration = 5000; // Длительность прогресса в миллисекундах
    const intervalTime = 100; // Интервал обновления прогресса в миллисекундах
    const increment = (intervalTime / totalDuration) * 100; // Увеличение прогресса за каждое обновление

    const interval = setInterval(() => {
        progress += increment;

        // Обновляем ширину прогресс-бара
        progressBar.innerText = Math.min(progress, 100) + '%';

        // Проверяем, завершен ли прогресс
        if (progress >= 100) {
            clearInterval(interval);
           capturing = false;
           gif.render();
           progressBar.innerText = Math.min(progress, 100) + '% Rendering...';
        }
    }, intervalTime);
}
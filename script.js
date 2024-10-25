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
                        alert(uploadType);
                    });
                } else {
                    alert('only PNG or JPG');
                }
                // uploadInput.value = '';
            };
            

            reader.readAsDataURL(file);
            
        }
    });


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

const renderer = new THREE.WebGLRenderer({ alpha: false, preserveDrawingBuffer: true });
renderer.setSize(512, 512)
renderer.setClearColor(0x0E1621, 1)
container.appendChild(renderer.domElement);
const geometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 100); 
//const geometry2 = new THREE.CylinderGeometry(0.2, 0.2, 0.1005, 50); 
 // radius, tube, radialSegments, tubularSegments
 // radius, segments
// r, widthSegments, heightSegments



const textureLoader = new THREE.TextureLoader();
const frontTexture = textureLoader.load('telegram.png');
const sideTextute = textureLoader.load('bg.png');
const backTexture = textureLoader.load('bg.png');

const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture,  transparent: true,  depthWrite: true,  })
const sideMaterial = new THREE.MeshStandardMaterial({ map: sideTextute, transparent: true, depthWrite: true});
const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture,  transparent: true,  depthWrite: true,  });
//const bottomCircle = new THREE.Mesh(geometry2, [backMaterial, backMaterial, frontMaterial]);
const topCircle = new THREE.Mesh(geometry, [backMaterial, backMaterial, frontMaterial]);
topCircle.rotation.x = -Math.PI / 2;
topCircle.scale.set(0.5, 0.5, 0.5); 
topCircle.rotation.x = 1.55;
topCircle.rotation.y = 1.6;
// bottomCircle.rotation.x = 1.5;
// bottomCircle.rotation.y = 1.6;
const coin = new THREE.Group();
coin.add(topCircle);
// coin.add(bottomCircle);
scene.add(coin);


const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Увеличенная интенсивность
scene.add(ambientLight);
const rotations = [1, 0, 0];


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
let isRotating = true;
function animate() {
    requestAnimationFrame(animate);
   
    // coin.rotation.x += rotations[0] === 1 ? 0.05 : rotations[0] === 2 ? -0.05 : 0;
    // coin.rotation.y += rotations[1] === 1 ? 0.05 : rotations[1] === 2 ? -0.05 : 0;
    // coin.rotation.z += rotations[2] === 1 ? 0.05 : rotations[2] === 2 ? -0.05 : 0;
    renderer.render(scene, camera);
    if(capturing){  
    if (isRotating) {
        // Увеличиваем угол вращения
        rotationAngle += 0.05; // Скорость вращения, можно изменять для плавности

        // Ограничиваем вращение до 360 градусов (2 * Math.PI радиан)
        if (rotationAngle >= 2 * Math.PI) {
            rotationAngle = 0;
            isRotating = false; 
            capturing = false;
            gif.render();// Останавливаем вращение после полного оборота
        }

        // Применяем вращение по оси Y (в зависимости от направления вращения)
        coin.rotation.y = rotationAngle;
    }
    renderer.render(scene, camera);
      captureGIF();
}
    //document.getElementById("info").innerText = "x: " + coin.rotation.x + "\ny: " + coin.rotation.y + "\nz: " + coin.rotation.z;
    
}

animate();

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
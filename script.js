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

const renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true });
renderer.setSize(200, 200)
container.appendChild(renderer.domElement);

const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);


const textureLoader = new THREE.TextureLoader();
const frontTexture = textureLoader.load('bg.png');
const sideTextute = 0xffffff;
const backTexture = textureLoader.load('telegram.png');

const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture,  transparent: true,  depthWrite: false,  })
const sideMaterial = new THREE.MeshBasicMaterial({ color: sideTextute });
const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture,  transparent: true,  depthWrite: false,  });

const coin = new THREE.Mesh(geometry, [sideMaterial, backMaterial, frontMaterial]);
coin.rotation.x = -Math.PI / 2;
coin.scale.set(0.5, 0.5, 0.5); 
coin.rotation.x = 1.5;
coin.rotation.y = 1.6;
scene.add(coin);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 15);
scene.add(light);
const rotations = [0, 0, 0];

['x', 'y', 'z'].forEach((axis, index) => {
    document.getElementById(`rotate-btn-${axis}`).addEventListener('click', () => {
        rotations[index] = (rotations[index] + 1) % 3;
        document.getElementById(`rotate-btn-${axis}`).style.backgroundColor = ["#283441", "#28bb6a", "#b82828"][rotations[index]];
    });
});

var gif;

function captureGIF() {
    html2canvas(container, { backgroundColor: null}).then(canvas => {
      gif.addFrame(canvas, { delay: 100/3});
    });
  }
var capturing = false;
var animation = true;
function animate() {
    requestAnimationFrame(animate);
    if(animation){
    coin.rotation.x += rotations[0] === 1 ? 0.05 : rotations[0] === 2 ? -0.05 : 0;
    coin.rotation.y += rotations[1] === 1 ? 0.05 : rotations[1] === 2 ? -0.05 : 0;
    coin.rotation.z += rotations[2] === 1 ? 0.05 : rotations[2] === 2 ? -0.05 : 0;
  
    if(capturing)    captureGIF();
    renderer.render(scene, camera);
    //document.getElementById("info").innerText = "x: " + coin.rotation.x + "\ny: " + coin.rotation.y + "\nz: " + coin.rotation.z;
    }
}

animate();

document.getElementById('coin-container').addEventListener('click', (event) => {
    animation = !animation;
});
document.getElementById('start-capture').addEventListener('click', (event) => {
    if(!capturing){
        gif = new GIF({
            workers: 1,
            quality: 100,
            repeat: 0,
            transparent: 0x000000 // Установите цвет для прозрачного фона
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

        startProgress();
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
const container = document.getElementById('coin-container');

// Создаем сцену
const scene = new THREE.Scene();

// Создаем камеру
const camera = new THREE.PerspectiveCamera(25, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

// Создаем рендерер и настраиваем его размер по размеру div-контейнера
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);

// Вставляем канвас рендерера в div
container.appendChild(renderer.domElement);

// Создаем геометрию монеты (цилиндр)
const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);

// Загружаем текстуры для лицевой и оборотной стороны монеты
const textureLoader = new THREE.TextureLoader();
const frontTexture = textureLoader.load('telegram.png');
const backTexture = textureLoader.load('telegram.png');

// Создаем материалы для лицевой и оборотной стороны
const frontMaterial = new THREE.MeshStandardMaterial({ map: frontTexture });
const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture });

// Создаем монету с использованием массива материалов
const coin = new THREE.Mesh(geometry, [frontMaterial, backMaterial, frontMaterial]);
coin.rotation.x = -1.5;
coin.rotation.y = 1.5;
scene.add(coin);

// Добавляем освещение
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 16);
scene.add(light);

// Цикл анимации
function animate() {
    requestAnimationFrame(animate);
    
    // Вращение монеты для наглядности
    coin.rotation.y += 0.01;
    
    // Рендер сцены с камерой
    renderer.render(scene, camera);
}

// Запуск анимации
animate();

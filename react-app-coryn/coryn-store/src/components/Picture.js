// src/ThreeScene.js
import * as THREE from 'three';

const ThreeScene = () => {
  // Tạo cảnh
  const scene = new THREE.Scene();

  // Tạo camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Tạo renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Tạo hình khối lập phương
  const geometry = new THREE.BoxGeometry();
  const texture = new THREE.TextureLoader().load('/images/shirt-3.jpg'); // Đường dẫn tới hình ảnh trong thư mục public
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Đặt vị trí camera
  camera.position.z = 5;

  // Hàm hoạt hình
  const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01; // Quay quanh trục x
    cube.rotation.y += 0.01; // Quay quanh trục y
    renderer.render(scene, camera);
  };

  animate();

  // Trả về renderer để dọn dẹp khi unmount
  return { renderer };
};

export default ThreeScene;

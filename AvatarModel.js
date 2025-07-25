import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AvatarModel({ scale = [1, 1, 1], position = [0, 0, 0], customization = {} }) {
  const group = useRef();
  const { scene, materials } = useGLTF("/models/BodyMesh.glb");

  // Rotate avatar slightly (optional)
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
  });

  // Apply customization if material names are known
  const applyColors = () => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const name = child.material.name.toLowerCase();

        if (name.includes("skin") && customization.skinColor) {
          child.material.color = new THREE.Color(customization.skinColor);
        }

        if (name.includes("hair") && customization.hairColor) {
          child.material.color = new THREE.Color(customization.hairColor);
        }

        if (name.includes("eye") && customization.eyeColor) {
          child.material.color = new THREE.Color(customization.eyeColor);
        }

        child.material.needsUpdate = true;
      }
    });
  };

  applyColors();

  return (
    <group ref={group} scale={scale} position={position}>
      <primitive object={scene} />
    </group>
  );
}

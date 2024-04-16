/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Bob.glb -o ..\components\Bob.jsx 
*/

import React from 'react';
import { Image, useGLTF } from '@react-three/drei';

export function Bob({ avatar, ...props }) {
  const { nodes, materials } = useGLTF('/models/Bob.glb');

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Eyes_Sphere.geometry} material={materials.Eyes} />
      <mesh geometry={nodes.Tooth_Cube001.geometry} material={materials.Tooth} />
      <mesh geometry={nodes.Body_Cube002.geometry} material={materials.Pink} />
      <mesh geometry={nodes.Arms_Cube003.geometry} material={materials.Pink} />
      <mesh geometry={nodes['Head_Cube-Mesh'].geometry} material={materials.Pink} />
      <mesh geometry={nodes['Head_Cube-Mesh_1'].geometry} material={materials.Material} />

      <Image position={[0, 0.3, 0.35]} rotation={[0, 0, 0]} url={avatar}>
        <planeGeometry args={[0.5, 0.5]} />
      </Image>
    </group>
  );
}

useGLTF.preload('/models/Bob.glb');
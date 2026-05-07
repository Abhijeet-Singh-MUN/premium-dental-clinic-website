"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerformanceMonitor,
  useGLTF
} from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SOURCE_MODEL_URL = "/models/exploded-skull-hero.glb";
const MODEL_VISUAL_PROFILE = 2;
const MAX_DRAG_Y = THREE.MathUtils.degToRad(78);
const MAX_DRAG_X = THREE.MathUtils.degToRad(34);

const enamel = {
  color: "#f8f0e6",
  roughness: 0.1,
  transmission: 0.22,
  ior: 1.45,
  thickness: 0.5,
  clearcoat: 0.9,
  clearcoatRoughness: 0.12,
  envMapIntensity: 1.2
};

function Tooth({ position, rotation, scale = 1, kind = "incisor", upper = false }) {
  const rootSign = upper ? 1 : -1;
  const crownScale = {
    incisor: [0.18, 0.25, 0.13],
    canine: [0.2, 0.29, 0.15],
    premolar: [0.22, 0.23, 0.18],
    molar: [0.31, 0.22, 0.23]
  }[kind];
  const rootCount = kind === "molar" ? 2 : 1;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow scale={crownScale}>
        <sphereGeometry args={[0.18, 32, 24]} />
        <meshPhysicalMaterial {...enamel} />
      </mesh>
      {Array.from({ length: rootCount }).map((_, index) => (
        <mesh
          key={index}
          position={[
            rootCount === 2 ? (index === 0 ? -0.065 : 0.065) : 0,
            rootSign * 0.145,
            0
          ]}
          rotation={[upper ? Math.PI : 0, 0, 0]}
          castShadow
          receiveShadow
          scale={[kind === "molar" ? 0.72 : 0.82, 1, kind === "molar" ? 0.72 : 0.82]}
        >
          <coneGeometry args={[0.065, kind === "molar" ? 0.34 : 0.4, 28]} />
          <meshPhysicalMaterial color="#f1dfc9" roughness={0.38} clearcoat={0.18} />
        </mesh>
      ))}
      <mesh
        position={[0, rootSign * -0.06, 0.004]}
        scale={[crownScale[0] * 0.78, 0.022, crownScale[2] * 0.7]}
      >
        <sphereGeometry args={[1, 18, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function GumArch({ upper = false }) {
  const y = upper ? 0.52 : -0.48;
  const rotation = upper ? [Math.PI / 2, 0, Math.PI] : [Math.PI / 2, 0, 0];

  return (
    <group position={[0, y, 0]} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.35, 0.105, 24, 128, Math.PI]} />
        <meshPhysicalMaterial
          color="#dca0a0"
          roughness={0.48}
          clearcoat={0.12}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0, 0.018]}>
        <torusGeometry args={[1.72, 0.014, 12, 128, Math.PI]} />
        <meshBasicMaterial color="#0d6e74" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function AlignerShell({ upper = false }) {
  const y = upper ? 0.52 : -0.48;
  const rotation = upper ? [Math.PI / 2, 0, Math.PI] : [Math.PI / 2, 0, 0];

  return (
    <group position={[0, y, 0.01]} rotation={rotation}>
      <mesh>
        <torusGeometry args={[1.42, 0.145, 24, 128, Math.PI]} />
        <meshPhysicalMaterial
          color="#9fe4e1"
          transparent
          opacity={0.24}
          roughness={0.04}
          transmission={0.8}
          thickness={1.2}
          clearcoat={1}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.18, 0.025, 12, 128, Math.PI]} />
        <meshBasicMaterial color="#e7ffff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function ImplantDetail() {
  return (
    <group position={[1.28, -0.46, -0.42]} rotation={[0.18, 0.35, -0.12]} scale={0.78}>
      <mesh castShadow>
        <cylinderGeometry args={[0.065, 0.09, 0.58, 32]} />
        <meshStandardMaterial color="#c8ccd2" roughness={0.18} metalness={0.85} />
      </mesh>
      {[-0.18, -0.06, 0.06, 0.18].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.072, 0.006, 8, 32]} />
          <meshStandardMaterial color="#eef3f4" roughness={0.18} metalness={0.75} />
        </mesh>
      ))}
      <mesh position={[0, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.09, 0.18, 32]} />
        <meshPhysicalMaterial color="#fff5df" roughness={0.26} clearcoat={0.4} />
      </mesh>
    </group>
  );
}

function ToothArch({ upper = false }) {
  const teeth = useMemo(() => {
    const items = [];
    for (let i = 0; i < 14; i += 1) {
      const progress = i / 13;
      const angle = THREE.MathUtils.degToRad(204 + progress * 132);
      const x = Math.cos(angle) * 1.48;
      const z = Math.sin(angle) * 0.78 + 0.18;
      const centerDistance = Math.abs(i - 6.5);
      const kind =
        centerDistance < 1.3
          ? "incisor"
          : centerDistance < 2.6
            ? "canine"
            : centerDistance < 4.6
              ? "premolar"
              : "molar";
      const scale = 0.95 + Math.cos(centerDistance * 0.5) * 0.04;
      items.push({ x, z, scale, angle, kind });
    }
    return items;
  }, []);

  return (
    <group position={[0, upper ? 0.52 : -0.48, 0]} rotation={[upper ? Math.PI : 0, 0, 0]}>
      {teeth.map((tooth, index) => (
        <Tooth
          key={`${upper ? "u" : "l"}-${index}`}
          position={[tooth.x, 0.12, tooth.z]}
          rotation={[0, -tooth.angle + Math.PI / 2, 0]}
          scale={tooth.scale}
          kind={tooth.kind}
          upper={upper}
        />
      ))}
    </group>
  );
}

function ClinicalGrid({ position = [0, -0.08, -0.08], scale = 1 }) {
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      {[0.8, 1.2, 1.6, 2.0].map((radius) => (
        <mesh key={radius}>
          <ringGeometry args={[radius, radius + 0.006, 128]} />
          <meshBasicMaterial color="#60d5d0" transparent opacity={0.14} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {Array.from({ length: 18 }).map((_, index) => (
        <mesh key={index} rotation={[0, 0, (Math.PI / 18) * index]}>
          <planeGeometry args={[0.005, 4.3]} />
          <meshBasicMaterial color="#60d5d0" transparent opacity={0.055} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function ProceduralDentalModel() {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.16;
    group.current.rotation.x = -0.14 + Math.sin(state.clock.elapsedTime * 0.2) * 0.035;
  });

  return (
    <Float speed={1.15} rotationIntensity={0.15} floatIntensity={0.24}>
      <group ref={group} rotation={[-0.14, 0, 0]} scale={0.7}>
        <GumArch upper />
        <GumArch />
        <AlignerShell upper />
        <AlignerShell />
        <ToothArch upper />
        <ToothArch />
        <ImplantDetail />
        <ClinicalGrid />
      </group>
    </Float>
  );
}

function classifyMesh(name = "") {
  const meshName = name.toLowerCase();

  if (
    /_(u|l)l\d/.test(meshName) ||
    meshName.includes("ul2low") ||
    meshName.includes("blinn23") ||
    meshName.includes("tooth") ||
    meshName.includes("teeth") ||
    meshName.includes("canine") ||
    meshName.includes("molar") ||
    meshName.includes("premolar") ||
    meshName.includes("incisor")
  ) {
    return "tooth";
  }

  if (meshName.includes("mandible")) {
    return "jaw";
  }

  if (meshName.includes("maxilla") || meshName.includes("palatine")) {
    return "maxilla";
  }

  if (meshName.includes("temporal")) {
    return "tmj";
  }

  if (
    meshName.includes("frontal") ||
    meshName.includes("occipital") ||
    meshName.includes("parietal")
  ) {
    return "cranium";
  }

  if (
    meshName.includes("ethmoid") ||
    meshName.includes("nasal") ||
    meshName.includes("lacrimal") ||
    meshName.includes("sphenoid") ||
    meshName.includes("vomer") ||
    meshName.includes("concha")
  ) {
    return "center";
  }

  if (meshName.includes("zygomatic")) {
    return "support";
  }

  return "support";
}

function focusForCategory(category) {
  if (category === "tooth") return "teeth";
  if (category === "jaw") return "mandible";
  if (category === "maxilla") return "maxilla";
  if (category === "tmj") return "tmj";
  return "skull";
}

function isLowerToothEntry(entry) {
  const meshName = entry.mesh.name.toLowerCase();
  return entry.category === "tooth" && meshName.startsWith("lower_");
}

function getToothSubtype(toothEntry, sortedToothEntries) {
  const meshName = toothEntry.mesh.name.toLowerCase();
  if (meshName.includes("incisor")) return "incisor";
  if (meshName.includes("canine")) return "canine";
  if (meshName.includes("premolar")) return "premolar";
  if (meshName.includes("molar")) return "molar";

  const rank = sortedToothEntries.indexOf(toothEntry);
  const toothCount = sortedToothEntries.length || 1;
  const jawSetCount = Math.max(1, Math.round(toothCount / 14));
  const incisorLimit = 4 * jawSetCount;
  const canineLimit = incisorLimit + 2 * jawSetCount;
  const premolarLimit = canineLimit + 4 * jawSetCount;

  if (rank < incisorLimit) return "incisor";
  if (rank < canineLimit) return "canine";
  if (rank < premolarLimit) return "premolar";
  return "molar";
}

let enamelTexture = null;

function getEnamelTexture() {
  if (enamelTexture) return enamelTexture;

  const size = 64;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const nx = x / size;
      const ny = y / size;
      const grain = (((x * 17 + y * 31) % 23) / 23 - 0.5) * 4;
      const softVein = Math.max(
        0,
        Math.sin((nx * 2.2 - ny * 1.35) * Math.PI * 2 + Math.sin(ny * 8) * 0.45)
      );
      const vein = Math.pow(softVein, 16) * 8;
      const pearl = Math.sin((nx + ny) * Math.PI * 5) * 2;

      data[index] = THREE.MathUtils.clamp(248 + grain + pearl - vein, 0, 255);
      data[index + 1] = THREE.MathUtils.clamp(239 + grain * 0.8 + pearl - vein * 0.7, 0, 255);
      data[index + 2] = THREE.MathUtils.clamp(224 + grain * 0.6 + pearl * 0.5 - vein * 0.4, 0, 255);
      data[index + 3] = 255;
    }
  }

  enamelTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  enamelTexture.colorSpace = THREE.SRGBColorSpace;
  enamelTexture.wrapS = THREE.RepeatWrapping;
  enamelTexture.wrapT = THREE.RepeatWrapping;
  enamelTexture.repeat.set(1.45, 1.45);
  enamelTexture.minFilter = THREE.LinearMipmapLinearFilter;
  enamelTexture.magFilter = THREE.LinearFilter;
  enamelTexture.needsUpdate = true;

  return enamelTexture;
}

function materialMeta(category, subtype = "default") {
  if (category === "tooth") {
    const subtypeColors = {
      incisor: "#26b7ff",
      canine: "#ff4f5e",
      premolar: "#34d46f",
      molar: "#8a5cff",
      default: "#fff8ed"
    };
    const activeToothColor = subtypeColors[subtype] || subtypeColors.default;

    return {
      base: MODEL_VISUAL_PROFILE === 2 ? activeToothColor : "#fff8ed",
      active: activeToothColor,
      opacity: 1,
      roughness: MODEL_VISUAL_PROFILE === 2 ? 0.16 : 0.12,
      clearcoat: MODEL_VISUAL_PROFILE === 2 ? 0.82 : 0.92,
      envMapIntensity: MODEL_VISUAL_PROFILE === 2 ? 1.42 : 1.62,
      emissive: MODEL_VISUAL_PROFILE === 2 ? activeToothColor : "#fff3df",
      emissiveIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.08 : 0.015
    };
  }

  const shared = {
    roughness: 0.3,
    clearcoat: 0.3,
    envMapIntensity: 0.92,
    emissive: "#7ce7e2",
    emissiveIntensity: 0
  };

  const categoryMeta = {
    jaw: {
      base: MODEL_VISUAL_PROFILE === 2 ? "#e54464" : "#d6b06f",
      active: "#e54464",
      opacity: MODEL_VISUAL_PROFILE === 2 ? 0.9 : 0.96,
      roughness: 0.24,
      clearcoat: 0.48,
      envMapIntensity: 1.18,
      emissive: "#ff5f79",
      emissiveIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.08 : 0
    },
    maxilla: {
      base: MODEL_VISUAL_PROFILE === 2 ? "#2e9ac8" : "#e5c486",
      active: "#2e9ac8",
      opacity: MODEL_VISUAL_PROFILE === 2 ? 0.9 : 0.97,
      roughness: 0.22,
      clearcoat: 0.52,
      envMapIntensity: 1.22,
      emissive: "#44c3e7",
      emissiveIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.08 : 0
    },
    tmj: {
      base: MODEL_VISUAL_PROFILE === 2 ? "#b000ff" : "#55d5ce",
      active: "#b000ff",
      opacity: MODEL_VISUAL_PROFILE === 2 ? 0.88 : 0.78,
      roughness: 0.14,
      clearcoat: 0.82,
      envMapIntensity: 1.48,
      emissive: "#ff4fd8",
      emissiveIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.16 : 0
    },
    cranium: {
      base: MODEL_VISUAL_PROFILE === 2 ? "#eadfcd" : "#d7a6bf",
      active: "#f1bad0",
      opacity: MODEL_VISUAL_PROFILE === 2 ? 0.28 : 0.54,
      roughness: 0.34,
      clearcoat: MODEL_VISUAL_PROFILE === 2 ? 0.16 : 0.24,
      envMapIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.58 : 0.86,
      emissive: MODEL_VISUAL_PROFILE === 2 ? "#fff4df" : "#e9a5c2"
    },
    center: {
      base: MODEL_VISUAL_PROFILE === 2 ? "#eee2ce" : "#a9b8ff",
      active: "#c2cdff",
      opacity: MODEL_VISUAL_PROFILE === 2 ? 0.24 : 0.58,
      roughness: 0.36,
      clearcoat: MODEL_VISUAL_PROFILE === 2 ? 0.12 : 0.24,
      envMapIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.54 : 0.82,
      emissive: MODEL_VISUAL_PROFILE === 2 ? "#fff4df" : "#9fb0ff"
    },
    support: {
      base: MODEL_VISUAL_PROFILE === 2 ? "#eadfcd" : "#79d6a9",
      active: "#a1efc7",
      opacity: MODEL_VISUAL_PROFILE === 2 ? 0.26 : 0.6,
      roughness: 0.32,
      clearcoat: MODEL_VISUAL_PROFILE === 2 ? 0.14 : 0.28,
      envMapIntensity: MODEL_VISUAL_PROFILE === 2 ? 0.56 : 0.86,
      emissive: MODEL_VISUAL_PROFILE === 2 ? "#fff4df" : "#78ddad"
    }
  }[category];

  return { ...shared, ...categoryMeta };
}

function makeAnatomyMaterial(category, subtype) {
  const meta = materialMeta(category, subtype);
  const material =
    category === "tooth"
      ? new THREE.MeshPhysicalMaterial({
          color: meta.base,
          map: MODEL_VISUAL_PROFILE === 2 ? null : getEnamelTexture(),
          roughness: meta.roughness,
          metalness: 0,
          transmission: MODEL_VISUAL_PROFILE === 2 ? 0.05 : 0.1,
          ior: 1.45,
          thickness: 0.42,
          clearcoat: meta.clearcoat,
          clearcoatRoughness: MODEL_VISUAL_PROFILE === 2 ? 0.18 : 0.13,
          envMapIntensity: meta.envMapIntensity,
          specularColor: "#fff7e8",
          specularIntensity: 1.12,
          sheen: 0.18,
          sheenColor: "#f8ead8",
          sheenRoughness: 0.42
        })
      : new THREE.MeshPhysicalMaterial({
          color: meta.base,
          transparent: true,
          opacity: meta.opacity,
          roughness: meta.roughness,
          clearcoat: meta.clearcoat,
          envMapIntensity: meta.envMapIntensity,
          depthWrite: category === "jaw" || category === "maxilla",
          side: THREE.DoubleSide
        });

  material.emissive = new THREE.Color(meta.emissive);
  material.emissiveIntensity = meta.emissiveIntensity;
  material.userData = {
    baseColor: new THREE.Color(meta.base),
    activeColor: new THREE.Color(meta.active),
    baseEmissiveColor: new THREE.Color(meta.emissive),
    activeEmissiveColor: new THREE.Color(meta.active),
    baseOpacity: meta.opacity,
    baseClearcoat: meta.clearcoat,
    baseEmissiveIntensity: meta.emissiveIntensity
  };

  return material;
}

function meshWorldCenter(mesh) {
  if (!mesh.geometry.boundingBox) {
    mesh.geometry.computeBoundingBox();
  }
  return mesh.geometry.boundingBox
    .getCenter(new THREE.Vector3())
    .applyMatrix4(mesh.matrixWorld);
}

function animateModelMaterials(meshEntries, activeFocus, isInteracting) {
  meshEntries.forEach(({ mesh, focus }) => {
    const material = mesh.material;
    const meta = material.userData;
    const focusIsActive = activeFocus && focus === activeFocus;
    const mouthIsActive =
      isInteracting && (focus === "teeth" || focus === "mandible" || focus === "maxilla");
    const isActive = focusIsActive || mouthIsActive;

    const targetColor = MODEL_VISUAL_PROFILE === 2
      ? meta.baseColor
      : isActive
        ? meta.activeColor
        : meta.baseColor;
    const targetEmissiveColor = MODEL_VISUAL_PROFILE === 2
      ? meta.baseEmissiveColor
      : isActive
        ? meta.activeEmissiveColor
        : meta.baseEmissiveColor;
    const targetOpacity =
      MODEL_VISUAL_PROFILE === 2
        ? meta.baseOpacity
        : focusIsActive && focus === "tmj"
        ? 0.98
        : isActive
          ? Math.min(meta.baseOpacity + 0.1, 1)
          : meta.baseOpacity;
    const targetClearcoat =
      MODEL_VISUAL_PROFILE === 2 || !isActive
        ? meta.baseClearcoat
        : Math.min(meta.baseClearcoat + 0.18, 1);
    const targetEmissive =
      MODEL_VISUAL_PROFILE === 2
        ? meta.baseEmissiveIntensity
        : focusIsActive
          ? focus === "tmj"
            ? 1.15
            : 0.46
          : mouthIsActive
            ? 0.18
            : meta.baseEmissiveIntensity;

    material.color.lerp(targetColor, focus === "tmj" ? 0.32 : 0.22);
    material.emissive.lerp(targetEmissiveColor, focus === "tmj" ? 0.32 : 0.22);
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.18);
    material.clearcoat = THREE.MathUtils.lerp(material.clearcoat || 0, targetClearcoat, 0.18);
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity || 0,
      targetEmissive,
      0.18
    );
  });
}

function animateSpeakingJaw(meshEntries, rotationWave) {
  if (MODEL_VISUAL_PROFILE !== 2) return;

  const openAmount = Math.pow((rotationWave + 1) / 2, 1.25);
  const openAngle = THREE.MathUtils.degToRad(15) * openAmount;
  const hingeAxis = new THREE.Vector3(1, 0, 0);

  meshEntries.forEach((entry) => {
    if (!entry.isLowerMouth) return;

    const { mesh, basePosition, baseRotation, jawPivot } = entry;
    const hingedPosition = basePosition
      .clone()
      .sub(jawPivot)
      .applyAxisAngle(hingeAxis, openAngle)
      .add(jawPivot);

    mesh.position.copy(hingedPosition);
    mesh.rotation.set(
      baseRotation.x + openAngle,
      baseRotation.y,
      baseRotation.z
    );
  });
}

function usePreparedModel(scene) {
  return useMemo(() => {
    const model = scene.clone(true);
    const meshEntries = [];

    model.traverse((object) => {
      if (!object.isMesh) return;

      const category = classifyMesh(
        `${object.name} ${object.geometry?.name || ""} ${object.material?.name || ""}`
      );

      object.castShadow = true;
      object.receiveShadow = true;
      object.frustumCulled = false;

      const compression = {
        tooth: 1,
        jaw: 0.96,
        maxilla: 0.96,
        tmj: 0.84,
        cranium: 0.78,
        center: 0.8,
        support: 0.82
      }[category];
      object.position.multiplyScalar(compression);

      meshEntries.push({
        mesh: object,
        name: `${object.name} ${object.geometry?.name || ""} ${object.material?.name || ""}`,
        category,
        focus: focusForCategory(category),
        subtype: "default",
        center: new THREE.Vector3(),
        isLowerMouth: false
      });
    });

    if (meshEntries.length === 0) {
      model.traverse((object) => {
        if (!object.isMesh) return;
        object.visible = true;
        const entry = {
          mesh: object,
          name: object.name,
          category: "maxilla",
          focus: "maxilla",
          subtype: "default",
          center: new THREE.Vector3(),
          isLowerMouth: false
        };
        meshEntries.push(entry);
      });
    }

    model.updateMatrixWorld(true);

    meshEntries.forEach((entry) => {
      entry.center.copy(meshWorldCenter(entry.mesh));
    });

    const toothEntries = meshEntries
      .filter((entry) => entry.category === "tooth")
      .sort((a, b) => Math.abs(a.center.x) - Math.abs(b.center.x));
    const mandibleEntries = meshEntries.filter((entry) => entry.category === "jaw");
    const mandibleBox = new THREE.Box3();
    mandibleEntries.forEach((entry) => {
      mandibleBox.expandByObject(entry.mesh);
    });
    const mandibleCenter = new THREE.Vector3();
    const mandibleSize = new THREE.Vector3();
    mandibleBox.getCenter(mandibleCenter);
    mandibleBox.getSize(mandibleSize);
    const jawPivot = new THREE.Vector3(
      mandibleCenter.x,
      mandibleCenter.y + mandibleSize.y * 0.34,
      mandibleCenter.z - mandibleSize.z * 0.18
    );

    meshEntries.forEach((entry) => {
      entry.subtype =
        entry.category === "tooth" ? getToothSubtype(entry, toothEntries) : "default";
      entry.isLowerMouth =
        entry.category === "jaw" ||
        isLowerToothEntry(entry);
      entry.basePosition = entry.mesh.position.clone();
      entry.baseRotation = entry.mesh.rotation.clone();
      entry.jawPivot = jawPivot.clone();
      entry.mesh.userData = {
        ...entry.mesh.userData,
        category: entry.category,
        focus: entry.focus,
        toothSubtype: entry.subtype
      };
      entry.mesh.material = makeAnatomyMaterial(entry.category, entry.subtype);
    });

    const box = new THREE.Box3();
    meshEntries.forEach(({ mesh }) => {
      box.expandByObject(mesh);
    });

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const largestAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.25 / largestAxis;
    model.scale.setScalar(scale);
    model.position.set(
      -center.x * scale,
      -center.y * scale + 0.1,
      -center.z * scale
    );

    model.rotation.set(
      THREE.MathUtils.degToRad(-4),
      THREE.MathUtils.degToRad(-16),
      THREE.MathUtils.degToRad(0)
    );

    return { model, meshEntries };
  }, [scene]);
}

function RealDentalModel({ activeFocus, onFocusChange }) {
  const group = useRef(null);
  const manualRotation = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const dragState = useRef({
    active: false,
    startX: 0,
    startY: 0,
    rotationX: 0,
    rotationY: 0
  });
  const targetScale = useRef(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const { scene } = useGLTF(SOURCE_MODEL_URL);
  const { model, meshEntries } = usePreparedModel(scene);

  useEffect(() => {
    let frame = 0;

    const updateScrollProgress = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      scrollProgress.current = THREE.MathUtils.clamp(window.scrollY / viewportHeight, 0, 1);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    animateModelMaterials(meshEntries, activeFocus, isInteracting);

    const scroll = scrollProgress.current;
    const diagonalDrift =
      MODEL_VISUAL_PROFILE === 2 ? Math.sin(state.clock.elapsedTime * 0.66) : 0;
    const diagonalRotation =
      MODEL_VISUAL_PROFILE === 2 ? Math.sin(state.clock.elapsedTime * 0.54 + 0.65) : 0;
    animateSpeakingJaw(meshEntries, diagonalRotation);
    const pointerInfluence = isInteracting && !dragState.current.active ? 0.55 : 0.22;
    const targetY =
      manualRotation.current.y +
      Math.sin(state.clock.elapsedTime * 0.18) * 0.08 +
      diagonalRotation * 0.2 +
      state.pointer.x * 0.32 * pointerInfluence -
      scroll * 0.1;
    const targetX =
      manualRotation.current.x +
      Math.sin(state.clock.elapsedTime * 0.15) * 0.025 -
      diagonalRotation * 0.07 -
      state.pointer.y * 0.16 * pointerInfluence -
      scroll * 0.055;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      THREE.MathUtils.clamp(targetY, -MAX_DRAG_Y, MAX_DRAG_Y),
      0.08
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      THREE.MathUtils.clamp(targetX, -MAX_DRAG_X, MAX_DRAG_X),
      0.08
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      MODEL_VISUAL_PROFILE === 2 ? diagonalRotation * -0.035 : 0,
      0.055
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      0.02 + diagonalDrift * 0.13,
      0.045
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      0.08 + diagonalDrift * 0.11 + scroll * 0.15,
      0.045
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      -scroll * 0.22,
      0.055
    );
    targetScale.current = (isInteracting || activeFocus ? 1.02 : 0.98) - scroll * 0.02;
    const nextScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale.current, 0.08);
    group.current.scale.setScalar(nextScale);
  });

  const handlePointerFocus = (event) => {
    const focus = event.object?.userData?.focus;
    if (focus && focus !== "skull") {
      onFocusChange(focus);
    }
  };

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.target.setPointerCapture?.(event.pointerId);
    const focus = event.object?.userData?.focus;
    if (focus && focus !== "skull") {
      onFocusChange(focus);
    }
    dragState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      rotationX: manualRotation.current.x,
      rotationY: manualRotation.current.y
    };
    setIsInteracting(true);
  };

  const handlePointerMove = (event) => {
    handlePointerFocus(event);
    if (!dragState.current.active) return;
    const deltaX = (event.clientX - dragState.current.startX) / 180;
    const deltaY = (event.clientY - dragState.current.startY) / 220;
    manualRotation.current.y = THREE.MathUtils.clamp(
      dragState.current.rotationY + deltaX,
      -MAX_DRAG_Y,
      MAX_DRAG_Y
    );
    manualRotation.current.x = THREE.MathUtils.clamp(
      dragState.current.rotationX + deltaY,
      -MAX_DRAG_X,
      MAX_DRAG_X
    );
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.target.releasePointerCapture?.(event.pointerId);
    dragState.current.active = false;
    setIsInteracting(false);
  };

  return (
    <Float speed={0.95} rotationIntensity={0.12} floatIntensity={0.22}>
      <group
        ref={group}
        position={[0.02, 0.08, 0]}
        onPointerOver={(event) => {
          setIsInteracting(true);
          handlePointerFocus(event);
        }}
        onPointerOut={() => {
          if (!dragState.current.active) {
            setIsInteracting(false);
          }
          onFocusChange(null);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <pointLight
          position={[0, -0.52, 1.15]}
          intensity={isInteracting ? 1.75 : 0.7}
          color="#7ce7e2"
          distance={4}
        />
        <primitive object={model} />
      </group>
    </Float>
  );
}

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function ModelWithFallback({ activeFocus, onFocusChange }) {
  return (
    <ModelErrorBoundary fallback={<ProceduralDentalModel />}>
      <RealDentalModel
        activeFocus={activeFocus}
        onFocusChange={onFocusChange}
      />
    </ModelErrorBoundary>
  );
}

export function HeroVisual() {
  const [dpr, setDpr] = useState(1.4);
  const [hoverFocus, setHoverFocus] = useState(null);
  const activeFocus = hoverFocus;

  return (
    <div className="hero-visual" aria-label="3D dental technology illustration">
      <div className="hero-fallback" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [0, 0.3, 5.2], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(1.6)}
          onDecline={() => setDpr(1)}
        />
        <ambientLight intensity={0.62} />
        <directionalLight position={[2.4, 3.5, 4.2]} intensity={3.1} color="#fff7e8" castShadow />
        <pointLight position={[-1.8, -1.7, 1.5]} intensity={2.8} color="#0d6e74" />
        <pointLight position={[2.8, -0.8, 1.8]} intensity={1.35} color="#c9a84c" />
        <pointLight position={[0.2, 1.4, -2.2]} intensity={1.55} color="#9fe4e1" />
        <Suspense fallback={<ProceduralDentalModel />}>
          <ModelWithFallback
            activeFocus={activeFocus}
            onFocusChange={setHoverFocus}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(SOURCE_MODEL_URL);

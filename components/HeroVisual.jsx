"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerformanceMonitor,
  useGLTF
} from "@react-three/drei";
import { Component, Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SOURCE_MODEL_URL = "/models/exploded-skull-hero.glb";
const MAX_DRAG_Y = Math.PI / 2;
const MAX_DRAG_X = Math.PI / 3;

const ANATOMY_HOTSPOTS = [
  { id: "teeth", label: "Teeth" },
  { id: "maxilla", label: "Maxilla" },
  { id: "mandible", label: "Mandible" },
  { id: "tmj", label: "Temporomandibular Joint (TMJ)" }
];

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
      <group ref={group} rotation={[-0.14, 0, 0]} scale={1.06}>
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

function getToothSubtype(toothEntry, sortedToothEntries) {
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

function materialMeta(category, subtype = "default") {
  if (category === "tooth") {
    const subtypeColors = {
      incisor: "#26b7ff",
      canine: "#ff4f5e",
      premolar: "#34d46f",
      molar: "#8a5cff",
      default: "#f9f1e8"
    };
    return {
      base: "#f9f1e8",
      active: subtypeColors[subtype] || subtypeColors.default,
      opacity: 1,
      roughness: 0.085,
      clearcoat: 1,
      envMapIntensity: 1.45,
      emissive: "#ffffff",
      emissiveIntensity: 0
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
      base: "#e5a0a8",
      active: "#e54464",
      opacity: 0.96,
      roughness: 0.24,
      clearcoat: 0.48,
      envMapIntensity: 1.18,
      emissive: "#ff5f79"
    },
    maxilla: {
      base: "#d4a63a",
      active: "#ffc933",
      opacity: 0.97,
      roughness: 0.22,
      clearcoat: 0.52,
      envMapIntensity: 1.22,
      emissive: "#ffd45a"
    },
    tmj: {
      base: "#55d5ce",
      active: "#b000ff",
      opacity: 0.78,
      roughness: 0.14,
      clearcoat: 0.82,
      envMapIntensity: 1.48,
      emissive: "#ff4fd8"
    },
    cranium: {
      base: "#d7a6bf",
      active: "#f1bad0",
      opacity: 0.54,
      roughness: 0.34,
      clearcoat: 0.24,
      envMapIntensity: 0.86,
      emissive: "#e9a5c2"
    },
    center: {
      base: "#a9b8ff",
      active: "#c2cdff",
      opacity: 0.58,
      roughness: 0.36,
      clearcoat: 0.24,
      envMapIntensity: 0.82,
      emissive: "#9fb0ff"
    },
    support: {
      base: "#79d6a9",
      active: "#a1efc7",
      opacity: 0.6,
      roughness: 0.32,
      clearcoat: 0.28,
      envMapIntensity: 0.86,
      emissive: "#78ddad"
    }
  }[category];

  return { ...shared, ...categoryMeta };
}

function makeAnatomyMaterial(category, subtype) {
  const meta = materialMeta(category, subtype);
  const material =
    category === "tooth"
      ? new THREE.MeshPhysicalMaterial({
          color: "#f9f1e8",
          roughness: 0.085,
          metalness: 0,
          transmission: 0.16,
          ior: 1.45,
          thickness: 0.5,
          clearcoat: 1,
          clearcoatRoughness: 0.075,
          envMapIntensity: 1.45,
          specularIntensity: 1
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

    const targetColor = isActive ? meta.activeColor : meta.baseColor;
    const targetEmissiveColor = isActive ? meta.activeEmissiveColor : meta.baseEmissiveColor;
    const targetOpacity =
      focusIsActive && focus === "tmj"
        ? 0.98
        : isActive
          ? Math.min(meta.baseOpacity + 0.1, 1)
          : meta.baseOpacity;
    const targetClearcoat = isActive ? Math.min(meta.baseClearcoat + 0.18, 1) : meta.baseClearcoat;
    const targetEmissive = focusIsActive
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
        center: new THREE.Vector3()
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
          center: new THREE.Vector3()
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

    meshEntries.forEach((entry) => {
      entry.subtype =
        entry.category === "tooth" ? getToothSubtype(entry, toothEntries) : "default";
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
    const scale = 3.2 / largestAxis;
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

function RealDentalModel({ activeFocus, onFocusChange, onSelectFocus }) {
  const group = useRef(null);
  const manualRotation = useRef({ x: 0, y: 0 });
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

  useFrame((state) => {
    if (!group.current) return;
    animateModelMaterials(meshEntries, activeFocus, isInteracting);

    const pointerInfluence = isInteracting && !dragState.current.active ? 0.55 : 0.22;
    const targetY =
      manualRotation.current.y +
      Math.sin(state.clock.elapsedTime * 0.18) * 0.08 +
      state.pointer.x * 0.32 * pointerInfluence;
    const targetX =
      manualRotation.current.x +
      Math.sin(state.clock.elapsedTime * 0.15) * 0.025 -
      state.pointer.y * 0.18 * pointerInfluence;
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
    targetScale.current = isInteracting || activeFocus ? 1.035 : 1;
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
      onSelectFocus(focus);
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

function ModelWithFallback({ activeFocus, onFocusChange, onSelectFocus }) {
  return (
    <ModelErrorBoundary fallback={<ProceduralDentalModel />}>
      <RealDentalModel
        activeFocus={activeFocus}
        onFocusChange={onFocusChange}
        onSelectFocus={onSelectFocus}
      />
    </ModelErrorBoundary>
  );
}

function AnatomyHotspots({
  activeFocus,
  selectedFocus,
  onFocusChange,
  onSelectFocus
}) {
  return (
    <div className="model-hotspots" aria-label="Dental anatomy highlights">
      {ANATOMY_HOTSPOTS.map((hotspot) => {
        const isActive = activeFocus === hotspot.id || selectedFocus === hotspot.id;
        return (
          <button
            key={hotspot.id}
            type="button"
            className={isActive ? "active" : ""}
            aria-pressed={selectedFocus === hotspot.id}
            onMouseEnter={() => onFocusChange(hotspot.id)}
            onMouseLeave={() => onFocusChange(null)}
            onFocus={() => onFocusChange(hotspot.id)}
            onBlur={() => onFocusChange(null)}
            onClick={() => onSelectFocus(hotspot.id)}
          >
            {hotspot.label}
          </button>
        );
      })}
    </div>
  );
}

export function HeroVisual() {
  const [dpr, setDpr] = useState(1.4);
  const [hoverFocus, setHoverFocus] = useState(null);
  const [selectedFocus, setSelectedFocus] = useState(null);
  const activeFocus = selectedFocus || hoverFocus;

  const handleSelectFocus = (focus) => {
    setSelectedFocus((current) => (current === focus ? null : focus));
  };

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
        camera={{ position: [0, 0.32, 4.75], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
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
            onSelectFocus={handleSelectFocus}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      <AnatomyHotspots
        activeFocus={activeFocus}
        selectedFocus={selectedFocus}
        onFocusChange={setHoverFocus}
        onSelectFocus={handleSelectFocus}
      />
    </div>
  );
}

useGLTF.preload(SOURCE_MODEL_URL);

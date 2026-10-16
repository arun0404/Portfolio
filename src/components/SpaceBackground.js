import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { THEME_CHANGE_EVENT } from "./ThemeToggle";

// 5,000 points distributed inside a sphere, rendered as a single draw call
// and slowly spun each frame — the standard react-three-fiber "starfield"
// technique (maath generates the distribution). Built from R3F's native
// <points>/<pointsMaterial> JSX rather than drei's Points/PointMaterial
// wrappers: drei's package-root barrel re-exports a Stats helper that
// requires a three.js subpath ("examples/js/libs/stats.min") blocked by
// three's package.json exports map, and every attempt to import
// Points/PointMaterial directly from their own files to dodge that barrel
// hit a different breakage (Jest doesn't transform node_modules ESM, and
// the prebuilt CJS files throw at runtime when loaded outside drei's own
// entry point — deep-importing a library's internals turned out to be
// generally unsupported here, not just inconvenient). Native three.js
// primitives sidestep drei for this component entirely.
function StarField(props) {
  const ref = useRef();
  // inSphere fills the buffer as (x, y, z) triplets, so its length must be
  // the point count * 3 — passing the point count alone misaligns the last
  // triplet and produces NaN positions (three.js then throws computing the
  // geometry's bounding sphere).
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled {...props}>
        <bufferGeometry>
          {/* attachObject={[parent, child]}, not attach="parent-child" — the
              dash-string form is a later react-three-fiber (v8+) convention
              and silently fails to attach anything on the v7 line this app
              is pinned to for React 17 compatibility, leaving
              geometry.attributes.position undefined (no error, nothing
              rendered). Confirmed against drei@7's own Points source,
              which uses this exact attachObject + plain-props form. */}
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={sphere.length / 3}
            array={sphere}
            itemSize={3}
          />
        </bufferGeometry>
        {/* Native PointsMaterial draws hard-edged squares (no circular
            falloff shader the way drei's PointMaterial has), which read as
            noticeably chunkier than a soft circle at the same nominal
            size — sized down and paler to compensate, landing closer to
            "stars" than "confetti". */}
        <pointsMaterial
          transparent
          opacity={0.8}
          color="#e4d4fa"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function getInitialTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

// Dark-theme-only, mirroring Particle.js: listens for ThemeToggle's
// broadcast and unmounts the whole Canvas (not just hides it) in light
// theme, so the WebGL context and render loop aren't doing invisible work.
function SpaceBackground() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    function handleThemeChange(event) {
      setTheme(event.detail && event.detail.theme === "light" ? "light" : "dark");
    }
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  if (theme === "light") return null;

  return (
    <div className="space-background">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default SpaceBackground;

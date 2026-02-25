/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import type { ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
    useFBO,
    useGLTF,
    Preload,
    MeshTransmissionMaterial,
    Environment,
} from '@react-three/drei';
// @ts-ignore
import { easing } from 'maath';

interface FluidGlassProps {
    mode?: 'lens' | 'bar' | 'cube';
    children?: ReactNode;
    lensProps?: any;
    barProps?: any;
    cubeProps?: any;
    [key: string]: any;
}

export default function FluidGlass({
    mode = 'lens',
    children,
    lensProps = {},
    barProps = {},
    cubeProps = {},
    ...rest
}: FluidGlassProps) {
    const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
    const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

    // Merge rest props into overrides for flexibility with the user's snippet
    const modeProps = { ...rawOverrides, ...rest };

    return (
        <Canvas
            camera={{ position: [0, 0, 20], fov: 15 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Environment preset="city" />

            <Wrapper modeProps={modeProps}>
                {children}
            </Wrapper>
            <Preload all />
        </Canvas>
    );
}

const ModeWrapper = memo(function ModeWrapper({
    children,
    glb,
    geometryKey,
    lockToBottom = false,
    followPointer = true,
    modeProps = {},
    ...props
}: any) {
    const ref = useRef<THREE.Mesh>(null!);
    const { nodes } = useGLTF(glb) as any;
    const buffer = useFBO();
    const { viewport: vp } = useThree();
    const [scene] = useState(() => new THREE.Scene());
    const geoWidthRef = useRef(1);

    useEffect(() => {
        const geo = nodes[geometryKey]?.geometry;
        if (geo) {
            geo.computeBoundingBox();
            geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
        }
    }, [nodes, geometryKey]);

    useFrame((state, delta) => {
        const { gl, pointer, camera } = state;
        const v = state.viewport.getCurrentViewport(camera, [0, 0, 15]);

        if (ref.current) {
            const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
            const destY = lockToBottom ? -v.height / 2 + 0.5 : followPointer ? (pointer.y * v.height) / 2 : 0;
            easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

            if (modeProps.scale == null) {
                const maxWorld = v.width * 0.9;
                const desired = maxWorld / geoWidthRef.current;
                ref.current.scale.setScalar(Math.min(0.15, desired));
            } else {
                ref.current.scale.setScalar(modeProps.scale);
            }
        }

        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
    });

    const { ior, thickness, anisotropy, chromaticAberration, transmission, roughness, ...extraMat } = modeProps;

    return (
        <>
            {createPortal(<>{children}</>, scene)}

            {/* Background plane to show the scene */}
            <mesh scale={[vp.width, vp.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent />
            </mesh>

            {/* The Glass Effect Mesh */}
            <mesh
                ref={ref}
                rotation-x={Math.PI / 2}
                geometry={nodes[geometryKey]?.geometry}
                {...props}
            >
                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior ?? 1.15}
                    thickness={thickness ?? 2}
                    anisotropy={anisotropy ?? 0.01}
                    chromaticAberration={chromaticAberration ?? 0.05}
                    transmission={transmission ?? 1}
                    roughness={roughness ?? 0}
                    {...extraMat}
                />
            </mesh>
        </>
    );
});

function Lens({ modeProps, children, ...p }: any) {
    return (
        <ModeWrapper
            glb="/assets/3d/lens.glb"
            geometryKey="Cylinder"
            followPointer
            modeProps={modeProps}
            {...p}
        >
            {children}
        </ModeWrapper>
    );
}

function Cube({ modeProps, children, ...p }: any) {
    return (
        <ModeWrapper
            glb="/assets/3d/cube.glb"
            geometryKey="Cube"
            followPointer
            modeProps={modeProps}
            {...p}
        >
            {children}
        </ModeWrapper>
    );
}

function Bar({ modeProps = {}, children, ...p }: any) {
    return (
        <ModeWrapper
            glb="/assets/3d/bar.glb"
            geometryKey="Cube"
            lockToBottom
            followPointer={false}
            modeProps={modeProps}
            {...p}
        >
            {children}
        </ModeWrapper>
    );
}

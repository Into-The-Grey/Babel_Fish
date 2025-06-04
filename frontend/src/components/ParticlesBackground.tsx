// src/components/ParticlesBackground.tsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { type Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0, // behind app
                pointerEvents: "none", // don't interfere with clicks
                filter: "blur(2.5px) opacity(0.7)",
                // Optional: darken/contrast using CSS here if you want
            }}
            options={{
                background: {
                    color: {
                        value: "#222", // matches your dark mode
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {enable: false},
                        onClick: {enable: false},
                        resize: true,
                    },
                },
                particles: {
                    color: {value: "#8ecae6"},
                    links: {
                        enable: true,
                        distance: 140,
                        color: "#8ecae6",
                        opacity: 0.35,
                        width: 1,
                    },
                    collisions: {enable: false},
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: {default: "out"},
                    },
                    number: {
                        value: 75,
                        density: {enable: true, area: 900},
                    },
                    opacity: {value: 0.55},
                    shape: {type: "circle"},
                    size: {value: 2.5, random: {enable: true, minimumValue: 1.5}},
                },
                detectRetina: true,
            }}
        />
    );
}

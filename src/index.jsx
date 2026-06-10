import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.jsx'
import Navebar from './Components/Navebar/Navebar'
import Profile from './Components/Profile/Profile.jsx'
import Skills from './Components/Skills/Skills.jsx'
import Card from './Components/Card/Card.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Navebar />

        {/* Fixed 3D card — right side, always on top of canvas */}
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
            pointerEvents: 'none',
        }}>
            <Card
                position={[0, 0, 22]}
                gravity={[0, -40, 0]}
                frontImage="/Card/front.png"
                backImage="/Card/back.png"
                imageFit="cover"
                lanyardImage="/Card/band.png"
                lanyardWidth={1}
            />
        </div>

        {/* Scrollable sections */}
        <main style={{ position: 'relative', zIndex: 2 }}>
            <section id="home">
                <Profile />
            </section>
            <section id="skills">
                <Skills />
            </section>
        </main>

        {/* Fixed grid background canvas */}
        <Canvas
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            gl={{ alpha: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [ 0, 1, 7 ]
            }}
        >
            <Experience />
        </Canvas>
    </>
)
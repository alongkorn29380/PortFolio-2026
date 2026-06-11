import './style.css'
import ReactDOM from 'react-dom/client'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.jsx'
import Navebar from './Components/Navebar/Navebar'
import Profile from './Components/Profile/Profile.jsx'
import Card from './Components/Card/Card.jsx'
import { SkillsSection } from './Components/Keyboard/Skillssection.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        {/* Navbar — fixed so it stays above the scroll container */}
        <Navebar />

        {/* Card portaled to body — body never scrolls so position:fixed is viewport-guaranteed */}
        {createPortal(
            <Card
                position={[0, 0, 22]}
                gravity={[0, -40, 0]}
                frontImage="/Card/front.png"
                backImage="/Card/back.png"
                imageFit="cover"
                lanyardImage="/Card/band.png"
                lanyardWidth={1}
            />,
            document.body
        )}

        {/* Scroll container — body is overflow:hidden so only this div scrolls */}
        <div id="scroll-container">
            <section id="home">
                <Profile />
            </section>
            <SkillsSection />
        </div>

        {/* Fixed grid background canvas */}
        <Canvas
            // เพิ่ม pointerEvents: 'none' เข้าไปในสไตล์ของ Canvas ตัวล่างสุด
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
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
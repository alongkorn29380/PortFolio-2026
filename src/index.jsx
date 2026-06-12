import './style.css'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Experience from './Experience.jsx'
import Navebar from './Components/Navebar/Navebar'
import Profile from './Components/Profile/Profile.jsx'
import Card from './Components/Card/Card.jsx'
import { SkillsSection } from './Components/Keyboard/Skillssection.jsx'
import Portfolio from './Components/Portfolio/Portfolio.jsx'
import Contact   from './Components/Contact/Contact.jsx'
import ClendearPage        from './Components/Project/Clendear.jsx'
import SensorDashboardPage from './Components/Project/SensorDashboard.jsx'
import ChristmasCardPage   from './Components/Project/ChristmasCard.jsx'
import ArmRoboticPage       from './Components/Project/ArmRobotic.jsx'
import SnowGlobePage        from './Components/Project/SnowGlobe.jsx'
import TerrainPortfolioPage from './Components/Project/TerrainPortfolio.jsx'

function MainPage() {
    useEffect(() => {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
        const saved = sessionStorage.getItem('returnScroll')
        if (saved !== null) {
            window.scrollTo({ top: parseInt(saved), behavior: 'instant' })
            sessionStorage.removeItem('returnScroll')
        }
    }, [])

    return (
        <>
            <Navebar />
            {createPortal(
                <Card
                    position={[0, 0, 22]}
                    gravity={[0, -40, 0]}
                    frontImage="/Images/Card/front.png"
                    backImage="/Images/Card/back.png"
                    imageFit="cover"
                    lanyardImage="/Images/Card/band.png"
                    lanyardWidth={1}
                />,
                document.body
            )}
            <div id="scroll-container">
                <section id="home">
                    <Profile />
                </section>
                <SkillsSection />
            </div>
            <Portfolio />
            <Contact />
            <Canvas
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
                gl={{ alpha: true }}
                camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 1, 7] }}
            >
                <Experience />
            </Canvas>
        </>
    )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/project/clendear"          element={<ClendearPage />} />
            <Route path="/project/sensor-dashboard"  element={<SensorDashboardPage />} />
            <Route path="/project/christmas-card"    element={<ChristmasCardPage />} />
            <Route path="/project/arm-robotic"       element={<ArmRoboticPage />} />
            <Route path="/project/snow-globe"         element={<SnowGlobePage />} />
            <Route path="/project/terrain-portfolio"  element={<TerrainPortfolioPage />} />
        </Routes>
    </BrowserRouter>
)
import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.jsx'
import Navebar from './Components/Navebar/Navebar'
import Profile from './Components/Profile/Profile.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Navebar />
        <Profile />
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
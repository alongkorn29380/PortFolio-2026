import React from "react"
import styles from "./Profile.module.css"
import { FaGithub, FaLinkedinIn } from "react-icons/fa6"
import { TypeAnimation } from "react-type-animation"
import BorderGlow from "../Border_Glow/BorderGlow"

function Profile() {
  return (
    <div className={styles.hero_wrapper}>
      <div className={styles.container}>
        <BorderGlow
          edgeSensitivity={44}
          glowColor="186 85 60"
          borderRadius={25}
          glowRadius={44}
          glowIntensity={1.9}
          coneSpread={24}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
          backgroundColor="#1a1a1a"
          animated={true}
          className={styles.badge_glow}
        >
          <p className={styles.text_1}>Hi, it's me</p>
          <h1 className={styles.text_2}>
            Alongkorn<br />Anuwatprakit
          </h1>

          <p className={styles.text_3}>
            <TypeAnimation
              sequence={[
                "Full Stack Developer", 1500,
                "3D Web Experience",    1500,
                "WebGL & Three.js",     1500,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </p>

          <p className={styles.text_4}>
             Computer Engineering student and full-stack developer specializing in interactive real-time web applications with rich 3D experiences. Skilled in React, Three.js/React Three Fiber, and WebGL on the front end, backed by Node.js, REST, and WebSocket services. I enjoy turning complex data into clear, performant 3D visualizations and building them end-to-end—from API to render loop. With additional experience in real-time streaming (WebRTC) and IoT hardware, I bring a broad full-stack perspective and am eager to grow within a product-driven engineering team.
          </p>
          <div className={styles.action_row}>
            <ul className={styles.hero_social}>
              <li>
                <a href="https://github.com/alongkorn29380" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/alongkorn-anuwatprakit-7956281a0/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </BorderGlow>

      </div>

    </div>
  )
}

export default Profile

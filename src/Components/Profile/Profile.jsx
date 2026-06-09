import React from "react"
import styles from "./Profile.module.css"
import { FaGithub, FaLinkedinIn } from "react-icons/fa6"
import { TypeAnimation } from "react-type-animation"

function Profile() {
  return (
    <div className={styles.hero_wrapper}>
      <div className={styles.container}>
        <div className={styles.hero_con}>
          <div className={styles.hero_info}>
            <p className={styles.text_1}>Hi, it's me</p>
            <h3 className={styles.text_2}>
              Alongkorn
              <br /> Anuwatprakit
            </h3>
            <p className={styles.text_3}>
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1000,
                  "Web Graphics Library",
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </p>
            <p className={styles.text_4}>
              Computer Engineering student and full-stack developer specializing
              in interactive real-time web applications with rich 3D experiences.
            </p>
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
        </div>
      </div>
    </div>
  )
}

export default Profile

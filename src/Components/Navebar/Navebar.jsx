import React, { useState } from 'react'
import styles from './Navebar.module.css'
import { FaBars } from 'react-icons/fa6'

function Navebar() {

    const [isToggled, setToggle] = useState(false);

    function handleToggle () {
        setToggle(!isToggled) //false + false = true
    }

  return (
    <nav>
        <div className={styles.container}>
            <div className={styles.nav_con}>
                <div className={styles.logo}>
                    <a href="#">Alongkorn</a>
                </div>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Skill</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div className={styles.button}>
                    <a href="#">Hire Me</a>
                </div>
            </div>

            {/* Mobile Menu */}
            <FaBars className={styles.bars} onClick={handleToggle}/>
            {isToggled ? (
                <>
                    <ul className={styles.mobile_menu}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Skill</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                    <div className={styles.mobile_button}>
                        <a href='#'>Hire Me</a>
                    </div>
                </>
            ) : null}
        </div>
    </nav>
  )
}

export default Navebar

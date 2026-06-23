import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import styles from './Portfolio.module.css'

const projects = [
    { id: 1, title: 'Clendear',                desc: 'ปฏิทินสำหรับการชดบันทึกประจำวัน',                   img: '/Images/Project/Calendar.png',          details: '/project/clendear' },
    { id: 2, title: 'Sensor Dashboard',        desc: 'เซนเซอร์วัดคุณภาพอากาศ',                         img: '/Images/Project/Sensor_Dashboard.png',  details: '/project/sensor-dashboard' },
    { id: 3, title: 'Christmas Card',          desc: 'การ์ดอวยพรวันคริสมาสและปีใหม่',                     img: '/Images/Project/Christmas.png',         details: '/project/christmas-card' },
    { id: 4, title: 'Arm Robotic',             desc: 'แขนหุ่นยนต์ช่วยหยิบจับตามความประสงค์ของผู้ใช้งาน',     img: '/Images/Project/Arm_Robotic.jpg',       details: '/project/arm-robotic' },
    { id: 5, title: 'Snow Globe',              desc: 'ลูกแก้วหิมะ Three.js',                           img: '/Images/Project/Snow_Globe.png',        details: '/project/snow-globe' },
    { id: 6, title: 'Terrain Portfolio',       desc: 'Openworld Portfolio (Open in Computer)',                          img: '/Images/Project/Portfolio.png',        details: '/project/terrain-portfolio' },
    { id: 7, title: 'Ecommerce 3D',            desc: 'เว็บไซต์ร้านค้าออนไลน์ 3 มิติ',                       img: '/Images/Project/Ecom.png',             details: '/project/ecommerce-3d' },
]

const certs = [
    { id: 1, title: 'Three.js Journey', img: '/Images/Certiflcate/Three.js%20Journey%20-%20Certificate.jpg' },
]

export default function Portfolio() {
    const [activeTab, setActiveTab] = useState('project')
    const [lightboxImg, setLightboxImg] = useState(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        if (!lightboxImg) return
        const onKey = (e) => { if (e.key === 'Escape') setLightboxImg(null) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightboxImg])

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { el.classList.add(styles.inView); observer.disconnect() } },
            { threshold: 0.06 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="portfolio" className={styles.section} ref={sectionRef}>

            <h2 className={styles.heading}>Portfolio Showcase</h2>

            <div className={styles.header}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'project' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('project')}
                    >
                        Project
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'certificate' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('certificate')}
                    >
                        Certificate
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                {activeTab === 'project' ? (
                    projects.map((project, i) => (
                        <div key={project.id} style={{ '--i': i }} className={styles.card}>
                            <div className={styles.cardImage}>
                                <img src={project.img} alt={project.title} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <p className={styles.cardDesc}>{project.desc}</p>
                            </div>
                            <div className={styles.cardActions}>
                                <Link
                                    to={project.details}
                                    className={styles.btnDetails}
                                    onClick={() => sessionStorage.setItem('returnScroll', window.scrollY)}
                                >Details →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    certs.map((cert, i) => (
                        <div
                            key={cert.id}
                            style={{ '--i': i, cursor: cert.img ? 'pointer' : 'default' }}
                            className={styles.card}
                            onClick={() => cert.img && setLightboxImg(cert.img)}
                        >
                            <div className={styles.certImageSlot}>
                                {cert.img
                                    ? <img src={cert.img} alt={cert.title} />
                                    : <span className={styles.certIcon}>🏅</span>
                                }
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{cert.title}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Lightbox — portaled to body so it's above the navbar (z:100) */}
            {lightboxImg && createPortal(
                <div
                    className={styles.lightboxOverlay}
                    onClick={() => setLightboxImg(null)}
                >
                    <img
                        className={styles.lightboxImg}
                        src={lightboxImg}
                        alt="certificate"
                        onClick={e => e.stopPropagation()}
                    />
                </div>,
                document.body
            )}

        </section>
    )
}

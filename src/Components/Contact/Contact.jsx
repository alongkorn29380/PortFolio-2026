import { useEffect, useRef } from 'react'
import styles from './Contact.module.css'
import { FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6'

const infoItems = [
    {
        icon: <FaEnvelope />,
        label: 'Email',
        value: 'alongkorn29380@gmail.com',
        href: 'mailto:alongkorn29380@gmail.com',
    },
    {
        icon: <FaPhone />,
        label: 'Phone',
        value: '(+66) 80 357 2874',
    },
    {
        icon: <FaLocationDot />,
        label: 'Location',
        value: '222, village 8, Tha Bo Subdistrict, Tha Bo District, Nong Khai Province, 43110, Thailand · Bangkok, Thailand',
    },
]

export default function Contact() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(styles.inView)
                    observer.disconnect()
                }
            },
            { threshold: 0.12 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section id="contact" className={styles.section} ref={sectionRef}>

            {/* decorative background glows */}
            <div className={styles.blobTL} />
            <div className={styles.blobBR} />

            {/* ── header ── */}
            <div className={styles.header}>
                <p className={styles.kicker}>Contact</p>
                <h2 className={styles.heading}>Get In Touch</h2>
                <p className={styles.subheading}>
                    I'm always open to new opportunities, collaborations, or just a friendly chat.
                </p>
            </div>

            <div className={styles.content}>

                {/* ── left: info ── */}
                <div className={styles.info}>
                    {infoItems.map((item, i) => (
                        <div key={i} className={styles.infoItem} style={{ '--d': `${i * 0.12}s` }}>
                            <span className={styles.infoIcon}>{item.icon}</span>
                            <div>
                                <p className={styles.infoLabel}>{item.label}</p>
                                {item.href
                                    ? <a href={item.href} className={styles.infoValue}>{item.value}</a>
                                    : <p className={styles.infoValue}>{item.value}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── right: form ── */}
                <form className={styles.form} action="https://getform.io/f/awnqwmjb" method="POST">
                    <div className={styles.formGlow} />
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" name="first_name" placeholder="Alongkorn" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" name="last_name" placeholder="Anuwatprakit" />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email_address">Email Address</label>
                        <input type="email" id="email_address" name="email_address" placeholder="your@email.com" />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" placeholder="Type your message here…" />
                    </div>
                    <button type="submit" className={styles.btnSubmit}>
                        <span>Send Message</span>
                        <span className={styles.btnArrow}>→</span>
                    </button>
                </form>

            </div>

        </section>
    )
}

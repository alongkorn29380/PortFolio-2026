import styles from './Contact.module.css'
import { FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6'

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>

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
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}><FaEnvelope /></span>
                        <div>
                            <p className={styles.infoLabel}>Email</p>
                            <a href="mailto:alongkorn29380@gmail.com" className={styles.infoValue}>
                                alongkorn29380@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}><FaPhone /></span>
                        <div>
                            <p className={styles.infoLabel}>Phone</p>
                            <p className={styles.infoValue}>(+66) 80 357 2874</p>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoIcon}><FaLocationDot /></span>
                        <div>
                            <p className={styles.infoLabel}>Location</p>
                            <p className={styles.infoValue}>222, village 8, Tha Bo Subdistrict, Tha Bo District, Nong Khai Province, 43110, Thailand  <br />
                    Bangkok, Thailand</p>
                        </div>
                    </div>
                </div>

                {/* ── right: form ── */}
                <form
                    className={styles.form}
                    action="https://getform.io/f/awnqwmjb"
                    method="POST"
                >
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
                    <button type="submit" className={styles.btnSubmit}>Send Message →</button>
                </form>

            </div>

        </section>
    )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProjectPage.module.css'

export default function ProjectPage({ title, desc, technologies, features, imgSrc, gallery = [], liveUrl }) {
    const navigate = useNavigate()
    const [activeImg, setActiveImg] = useState(imgSrc)

    return (
        <div className={styles.page}>

            {/* ── top bar ── */}
            <div className={styles.topBar}>
                <button className={styles.btnBack} onClick={() => navigate(-1)}>← Back</button>
                <span className={styles.breadcrumb}>Projects › {title}</span>
                {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnLive}>
                        View Live ↗
                    </a>
                )}
            </div>

            {/* ── main content ── */}
            <div className={styles.content}>

                {/* left */}
                <div className={styles.left}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.accent} />

                    <p className={styles.desc}>{desc}</p>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>&lt;/&gt; Technologies Used</h3>
                        <div className={styles.techList}>
                            {technologies.map(t => (
                                <span key={t} className={styles.techBadge}>{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.featuresCard}>
                        <h3 className={styles.sectionTitle}>☆ Key Features</h3>
                        <ul className={styles.featureList}>
                            {features.map((f, i) =>
                                typeof f === 'string' ? (
                                    <li key={i} className={styles.featureItem}>
                                        <span className={styles.featureDot} />{f}
                                    </li>
                                ) : (
                                    <li key={i} className={styles.featureGroup}>
                                        <span className={styles.featureGroupTitle}>{f.title}</span>
                                        <ul className={styles.featureSubList}>
                                            {f.details.map((d, j) => (
                                                <li key={j} className={styles.featureItem}>
                                                    <span className={styles.featureDot} />{d}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>

                {/* right */}
                <div className={styles.right}>
                    <div className={styles.imgFrame}>
                        <img src={activeImg} alt={title} />
                    </div>
                </div>

            </div>

            {/* ── gallery strip ── */}
            {gallery.length > 0 && (
                <div className={styles.galleryStrip}>
                    {gallery.map((url, i) => (
                        <button
                            key={i}
                            className={`${styles.thumb} ${activeImg === url ? styles.thumbActive : ''}`}
                            onClick={() => setActiveImg(url)}
                        >
                            <img src={url} alt={`screenshot ${i + 1}`} />
                        </button>
                    ))}
                </div>
            )}

        </div>
    )
}

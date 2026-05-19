'use client';
import styles from './Audiotoggle.module.css';

const WaveIcon = ({ muted }) => (
    <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg"
        className={styles.waveIcon} aria-hidden="true">
        <rect data-muted={muted} className={`${styles.bar} ${styles.b1}`} x="1" y="4" width="3.5" rx="1.75" />
        <rect data-muted={muted} className={`${styles.bar} ${styles.b2}`} x="6" y="1" width="3.5" rx="1.75" />
        <rect data-muted={muted} className={`${styles.bar} ${styles.b3}`} x="11" y="6" width="3.5" rx="1.75" />
        <rect data-muted={muted} className={`${styles.bar} ${styles.b4}`} x="16" y="2" width="3.5" rx="1.75" />
        <rect data-muted={muted} className={`${styles.bar} ${styles.b5}`} x="21" y="5" width="3.5" rx="1.75" />
        {muted && (
            <line x1="2" y1="2" x2="26" y2="18" stroke="rgba(200,170,120,0.7)" strokeWidth="2" strokeLinecap="round" />
        )}
    </svg>
);

export default function AudioToggle({ muted, toggle }) {
    return (
        <button onClick={toggle} className={`${styles.btn} ${muted ? styles.muted : ''}`} aria-label={muted ? 'Unmute nature sounds' : 'Mute nature sounds'} title={muted ? 'Unmute' : 'Mute nature sounds'}>
            <span className={styles.ripple} />
            <WaveIcon muted={muted} />
            <span className={styles.label}>{muted ? 'Muted' : 'Sounds on'}</span>
        </button>
    );
}
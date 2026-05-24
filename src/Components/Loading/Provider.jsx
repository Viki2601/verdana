'use client';
import { useState, useCallback } from 'react';
import LoadingScreen from './LoadingScreen';

export default function Providers({ children }) {
    const [loaded, setLoaded] = useState(false);

    const handleComplete = useCallback(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            {!loaded && <LoadingScreen onComplete={handleComplete} />}
            <div style={{ opacity: loaded ? 1 : 0, transition: loaded ? 'opacity 0.7s ease' : 'none', visibility: loaded ? 'visible' : 'hidden', }}>
                {children}
            </div>
        </>
    );
}
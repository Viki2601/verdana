'use client';

import { useState, useCallback } from 'react';
import LoadingScreen from './Loading/LoadingScreen';

export default function Providers({ children }) {
    const [loaded, setLoaded] = useState(false);

    // useCallback ensures onComplete is a stable reference,
    // so it's safe to omit from the progress useEffect's dep array
    const handleComplete = useCallback(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            {!loaded && <LoadingScreen onComplete={handleComplete} />}

            <div
                style={{
                    opacity: loaded ? 1 : 0,
                    transition: loaded ? 'opacity 0.7s ease' : 'none',
                    visibility: loaded ? 'visible' : 'hidden',
                }}
            >
                {children}
            </div>
        </>
    );
}
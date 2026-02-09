'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    return (
        <>
            <motion.div
                className="cursor-dot md:block hidden"
                animate={{ x: mousePosition.x, y: mousePosition.y }}
                transition={{ type: 'spring', mass: 0.1 }}
            />
            <motion.div
                className="cursor-outline md:block hidden"
                animate={{ x: mousePosition.x, y: mousePosition.y }}
                transition={{ type: 'spring', mass: 0.5 }}
            />
        </>
    );
}

'use client';
import { useState, useRef } from 'react';

export default function Carousel({ children, className = '' }) {
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef(null);
    const itemCount = children.length;

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        setDragOffset(diff);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (Math.abs(dragOffset) > 50) {
            if (dragOffset > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        }
        setDragOffset(0);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        setDragOffset(diff);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (Math.abs(dragOffset) > 50) {
            if (dragOffset > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        }
        setDragOffset(0);
    };

    const handleNext = () => { setCurrent((prev) => (prev + 1) % itemCount); };
    const handlePrev = () => { setCurrent((prev) => (prev - 1 + itemCount) % itemCount); };
    const goToSlide = (index) => { setCurrent(index); };

    return (
        <div className={`relative w-full ${className}`}>
            <div ref={containerRef} className="relative overflow-hidden" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`, }}>
                    {children?.map((child, index) => (
                        <div key={index} className="w-full shrink-0 rounded-[36px] overflow-hidden">
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: itemCount }).map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition duration-300 ${index === current ? 'bg-[#c9a84c] w-8' : 'bg-white/30 w-2'}`} />
                ))}
            </div>
        </div>
    );
}
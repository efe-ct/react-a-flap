import { useEffect, useRef, useCallback } from "react";

export const useGameLoop = (updateFunction: (deltaTime: number) => void, isRunning: boolean) => {
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();

    const animate = useCallback((time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime =time - previousTimeRef.current;
            updateFunction(deltaTime);
        }
        previousTimeRef.current = time;
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }, [updateFunction, isRunning]);

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
            return () => {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                }
            };
        }
    }, [isRunning, animate]);

    return null; //not giving a value

};


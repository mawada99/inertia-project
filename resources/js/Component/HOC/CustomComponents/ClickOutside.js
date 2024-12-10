import { useRef, useEffect } from 'react';

export default function ClickOutside({ children, exceptionRef, onClick, className }) {
    const wrapperRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickListener);

        return () => {
            document.removeEventListener('mousedown', handleClickListener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickListener = (event) => {
        let clickedInside;
        if (exceptionRef) {
            clickedInside = (wrapperRef && wrapperRef.current.contains(event.target)) || exceptionRef.current === event.target || exceptionRef.current.contains(event.target);
        }
        else {
            clickedInside = (wrapperRef && wrapperRef.current.contains(event.target));
        }

        if (clickedInside) return;
        else onClick();
    }

    return (
        <div ref={wrapperRef} className={`${className || ''}`}>
            {children}
        </div>
    );
};
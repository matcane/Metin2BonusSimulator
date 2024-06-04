import { useState, useRef } from 'react';

export default function Enchant({ shuffle }) {
  const [isMoving, setIsMoving] = useState(false);
  const divRef = useRef(null);
  let offsetX, offsetY, left, top;

  const move = (clientX, clientY) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const newX = clientX - offsetX;
    const newY = clientY - offsetY;
    const maxX = window.innerWidth - div.offsetWidth;
    const maxY = window.innerHeight - div.offsetHeight;
    div.style.left = `${Math.min(Math.max(newX, 0), maxX)}px`;
    div.style.top = `${Math.min(Math.max(newY, 0), maxY)}px`;
  };

  const moveMouse = (e) => {
    move(e.clientX, e.clientY);
  };

  const moveTouch = (e) => {
    move(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseDown = (e) => {
    setIsMoving(true);
    const div = divRef.current;
    if (!div) return;
    left = div.style.left;
    top = div.style.top;
    offsetX = e.clientX - div.offsetLeft;
    offsetY = e.clientY - div.offsetTop;
    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    setIsMoving(true);
    const div = divRef.current;
    if (!div) return;
    left = div.style.left;
    top = div.style.top;
    offsetX = e.touches[0].clientX - div.offsetLeft;
    offsetY = e.touches[0].clientY - div.offsetTop;
    document.addEventListener('touchmove', moveTouch);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', moveMouse);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsMoving(false);
    const div = divRef.current;
    if (!div) return;
    div.style.left = left;
    div.style.top = top;
    document.addEventListener('mouseover', moveOver);
  };

  const handleTouchEnd = (e) => {
    document.removeEventListener('touchmove', moveTouch);
    document.removeEventListener('touchend', handleTouchEnd);
    setIsMoving(false);
    const div = divRef.current;
    if (!div) return;
    div.style.left = left;
    div.style.top = top;

    const touchedElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    if (touchedElement && touchedElement.id === 'item') {
      shuffle();
    }
  };

  const moveOver = (e) => {
    if (e.target.id === 'item') {
      shuffle();
    }
    document.removeEventListener('mouseover', moveOver);
  };

  return (
    <img
      ref={divRef}
      draggable="false"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={`${isMoving ? 'absolute w-16 h-16' : 'w-full h-full'}`}
      src="./enchant.png"
    />
  );
}

import React, { useRef, useState, useCallback, useEffect } from 'react';

type VirtualJoystickProps = {
  onMove: (vector: { dx: number; dy: number }) => void;
  onStop: () => void;
  onInteract: () => void;
  canInteract: boolean;
};

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onMove,
  onStop,
  onInteract,
  canInteract,
}) => {
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const baseRef = useRef<HTMLDivElement>(null);

  const maxRadius = 45;

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    handlePointerMove(e);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!baseRef.current) return;
      const rect = baseRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rawDx = e.clientX - centerX;
      const rawDy = e.clientY - centerY;
      const dist = Math.hypot(rawDx, rawDy);

      let clampedX = rawDx;
      let clampedY = rawDy;

      if (dist > maxRadius) {
        clampedX = (rawDx / dist) * maxRadius;
        clampedY = (rawDy / dist) * maxRadius;
      }

      setKnobPos({ x: clampedX, y: clampedY });

      // Output normalized vector
      const normLen = Math.hypot(clampedX, clampedY);
      if (normLen > 5) {
        onMove({
          dx: clampedX / maxRadius,
          dy: clampedY / maxRadius,
        });
      } else {
        onStop();
      }
    },
    [maxRadius, onMove, onStop]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore if pointer capture is lost
      }
      setIsDragging(false);
      setKnobPos({ x: 0, y: 0 });
      onStop();
    },
    [onStop]
  );

  return (
    <div className="virtual-controls-container" aria-label="行動端觸控控制器">
      {/* Joystick Pad */}
      <div
        ref={baseRef}
        className={`joystick-base ${isDragging ? 'joystick-base--active' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={isDragging ? handlePointerMove : undefined}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="移動搖桿"
      >
        <div
          className="joystick-knob"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        />
        <div className="joystick-guide-arrows">
          <span className="arrow-up">▲</span>
          <span className="arrow-down">▼</span>
          <span className="arrow-left">◀</span>
          <span className="arrow-right">▶</span>
        </div>
      </div>

      {/* Action Interaction Button */}
      <button
        type="button"
        className={`action-interact-button ${canInteract ? 'action-interact-button--active' : ''}`}
        onClick={onInteract}
        disabled={!canInteract}
        aria-label={canInteract ? '與 NPC 老師互動' : '未在互動範圍'}
      >
        <span className="action-key-hint">E</span>
        <span className="action-text">{canInteract ? '點擊互動' : '靠近互動'}</span>
      </button>
    </div>
  );
};

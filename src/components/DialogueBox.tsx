import React, { useEffect } from 'react';

type DialogueBoxProps = {
  name: string;
  title?: string;
  dialogue: string;
  portraitUrl?: string;
  actionText?: string;
  onAction?: () => void;
  onClose: () => void;
};

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  name,
  title,
  dialogue,
  portraitUrl,
  actionText = '接受任務',
  onAction,
  onClose,
}) => {
  // Allow Esc key to close dialogue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="jrpg-dialogue-overlay" role="dialog" aria-label={`與 ${name} 對話`}>
      <div className="jrpg-dialogue-box">
        {/* Left Character Portrait */}
        <div className="dialogue-portrait-wrapper">
          {portraitUrl ? (
            <img src={portraitUrl} alt={`${name} 立繪`} className="dialogue-portrait-img" />
          ) : (
            <div className="dialogue-portrait-placeholder">
              <span>🧑‍🏫</span>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="dialogue-content">
          <div className="dialogue-header">
            <span className="dialogue-speaker-name">{name}</span>
            {title && <span className="dialogue-speaker-title">{title}</span>}
          </div>

          <div className="dialogue-body-text">
            <p>{dialogue}</p>
          </div>

          <div className="dialogue-actions">
            {onAction && (
              <button
                type="button"
                className="primary-button dialogue-action-btn"
                onClick={onAction}
              >
                ✦ {actionText}
              </button>
            )}
            <button
              type="button"
              className="secondary-button dialogue-close-btn"
              onClick={onClose}
            >
              稍後再說 [Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

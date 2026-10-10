import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getMapById } from '../data/maps';
import {
  computeMovementInput,
  findNearbyInteractable,
  updatePlayer,
} from '../domain/player-controller';
import { getLocationBreadcrumb } from '../data/world-structure';
import { CLASSROOM_CHALLENGES, type ClassroomChallenge } from '../data/challenges';
import { ClassroomChallengeModal } from './ClassroomChallengeModal';
import type {
  Interactable,
  MapDefinition,
  PlayerEntity,
  Vector2D,
} from '../types/rpg';
import { VirtualJoystick } from './VirtualJoystick';
import { soundManager } from '../domain/audio';
import { getAssetUrl } from '../utils/assets';

type TopDownRPGCanvasProps = {
  initialMapId?: string;
  initialSpawn?: Vector2D;
  currentMapId?: string;
  onMapChange?: (mapId: string) => void;
  onInteractNPC?: (npcData: {
    id: string;
    name: string;
    title?: string;
    dialogue: string;
    portraitUrl?: string;
  }) => void;
  onStartQuest?: () => void;
  isLocked?: boolean;
  collectedChips?: string[];
  onCollectChip?: (chipId: string, chipName: string, clue?: string) => void;
  isCoreCalibrated?: boolean;
  onStartChallenge?: (challengeId: string) => void;
};

type ToastNotification = {
  title: string;
  clue?: string;
  badge?: string;
};

export const TopDownRPGCanvas: React.FC<TopDownRPGCanvasProps> = ({
  initialMapId = 'campus-outdoor',
  initialSpawn,
  currentMapId: propCurrentMapId,
  onMapChange,
  onInteractNPC,
  onStartQuest,
  isLocked = false,
  collectedChips: propCollectedChips,
  onCollectChip,
  isCoreCalibrated = false,
  onStartChallenge,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Map state
  const [internalMapId, setInternalMapId] = useState<string>(initialMapId);
  const activeMapId = propCurrentMapId || internalMapId;
  const currentMapRef = useRef<MapDefinition>(
    getMapById(activeMapId, { isCoreCalibrated })
  );

  // Collectibles internal fallback
  const [internalChips, setInternalChips] = useState<string[]>([]);
  const effectiveChips = propCollectedChips ?? internalChips;

  // Floating toast notification state
  const [toastNotification, setToastNotification] = useState<ToastNotification | null>(null);

  // Active classroom challenge modal state
  const [activeChallenge, setActiveChallenge] = useState<ClassroomChallenge | null>(null);

  // 80th Anniversary Easter Egg states
  const [isCelebrationActive, setIsCelebrationActive] = useState<boolean>(false);
  const [showAnniversaryModal, setShowAnniversaryModal] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(soundManager.getMuted());
  const inputBufferRef = useRef<string[]>([]);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    vRot: number;
    alpha: number;
    shape: 'rect' | 'circle';
  }>>([]);

  // Player state
  const initialX = initialSpawn?.x ?? currentMapRef.current.defaultSpawn.x;
  const initialY = initialSpawn?.y ?? currentMapRef.current.defaultSpawn.y;

  const playerRef = useRef<PlayerEntity>({
    x: initialX,
    y: initialY,
    width: 32,
    height: 48,
    direction: activeMapId === 'campus-outdoor' ? 'down' : 'up',
    isMoving: false,
    animState: activeMapId === 'campus-outdoor' ? 'idle-down' : 'idle-up',
    walkFrame: 0,
    speed: 210, // pixels per second
  });

  // Inputs
  const keysRef = useRef<Set<string>>(new Set());
  const joystickVectorRef = useRef<Vector2D>({ x: 0, y: 0 });

  // Nearby interactable for HUD & touch controls
  const [nearbyInteractable, setNearbyInteractable] = useState<Interactable | null>(null);
  const [currentMapName, setCurrentMapName] = useState<string>(currentMapRef.current.name);

  // Fade screen transition state
  const fadeAlphaRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);

  // Background map image cache
  const mapImagesCache = useRef<Record<string, HTMLImageElement>>({});

  // Preload background images
  useEffect(() => {
    const campusImg = new Image();
    campusImg.src = getAssetUrl('/assets/maps/daxi-future-campus-rpg-v1.png');
    campusImg.onload = () => {
      mapImagesCache.current['campus-outdoor'] = campusImg;
    };
  }, []);

  // Update map definition when map ID or calibrated status changes
  useEffect(() => {
    const mapDef = getMapById(activeMapId, { isCoreCalibrated });
    currentMapRef.current = mapDef;
    setCurrentMapName(mapDef.name);
  }, [activeMapId, isCoreCalibrated]);

  // Sync initialSpawn when provided dynamically
  useEffect(() => {
    if (initialSpawn) {
      playerRef.current.x = initialSpawn.x;
      playerRef.current.y = initialSpawn.y;
    }
  }, [initialSpawn]);

  // Toast auto-dismiss timer
  useEffect(() => {
    if (toastNotification) {
      const timer = setTimeout(() => {
        setToastNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastNotification]);

  // Map Transition Helper (Fade Out -> Switch Map -> Spawn -> Fade In)
  // Truly implements "walking stairs up/down" smoothly without teleport menus
  const transitionToMap = useCallback(
    (targetMapId: string, targetSpawn?: Vector2D) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      let alpha = 0;
      const fadeOutInterval = setInterval(() => {
        alpha += 0.15;
        fadeAlphaRef.current = Math.min(1, alpha);

        if (alpha >= 1) {
          clearInterval(fadeOutInterval);

          // Switch map
          const newMap = getMapById(targetMapId, { isCoreCalibrated });
          currentMapRef.current = newMap;
          setInternalMapId(targetMapId);
          onMapChange?.(targetMapId);

          // Set player position to designated spawn point
          const spawn = targetSpawn || newMap.defaultSpawn;
          playerRef.current.x = spawn.x;
          playerRef.current.y = spawn.y;
          playerRef.current.direction = targetMapId === 'campus-outdoor' ? 'down' : 'up';
          playerRef.current.animState = targetMapId === 'campus-outdoor' ? 'idle-down' : 'idle-up';

          // Fade in
          const fadeInInterval = setInterval(() => {
            alpha -= 0.15;
            fadeAlphaRef.current = Math.max(0, alpha);

            if (alpha <= 0) {
              clearInterval(fadeInInterval);
              isTransitioningRef.current = false;
            }
          }, 30);
        }
      }, 30);
    },
    [isCoreCalibrated, onMapChange]
  );

  // Trigger interaction with the currently nearby interactable
  const triggerInteraction = useCallback(() => {
    if (isLocked || isTransitioningRef.current || activeChallenge) return;
    const item = nearbyInteractable;
    if (!item) return;

    // 1. Collectible chip
    if (item.type === 'collectible') {
      if (!effectiveChips.includes(item.id)) {
        soundManager.playCollectChip();
        if (onCollectChip) {
          onCollectChip(item.id, item.name, item.collectibleData?.clue);
        } else {
          setInternalChips((prev) => [...prev, item.id]);
        }
        setToastNotification({
          title: item.name,
          clue: item.collectibleData?.clue,
        });
      }
      setNearbyInteractable(null);
      return;
    }

    // 2. Stairs or Door map navigation
    if (item.type === 'stairs' || item.type === 'door' || item.type === 'portal') {
      if (item.targetMapId) {
        soundManager.playBlip();
        transitionToMap(item.targetMapId, item.targetSpawn);
        return;
      }
    }

    // 3. Classroom Challenge Trigger (from door plate or terminal)
    if (item.challengeId) {
      const challenge = CLASSROOM_CHALLENGES[item.challengeId];
      if (challenge) {
        if (item.id === 'monument-daxi-80th') {
          soundManager.playMonumentChime();
        } else {
          soundManager.playBlip();
        }
        setActiveChallenge(challenge);
        onStartChallenge?.(item.challengeId);
        return;
      }
    }

    // 4. Central Energy Core Terminal (Main Quest)
    if (item.id === 'core-terminal' || item.id === 'math-challenge-terminal') {
      soundManager.playBlip();
      if (item.challengeId) {
        const challenge = CLASSROOM_CHALLENGES[item.challengeId];
        if (challenge) {
          setActiveChallenge(challenge);
          onStartChallenge?.(item.challengeId);
          return;
        }
      }
      if (!isCoreCalibrated && onStartQuest) {
        onStartQuest();
      } else if (onInteractNPC) {
        onInteractNPC({
          id: item.id,
          name: isCoreCalibrated ? '能源核心校準控制台 (穩定已校準)' : item.name,
          title: item.npcData?.title || '能源核心控制台',
          dialogue: isCoreCalibrated
            ? '【系統提示】七年級數學校準模組（正負數、指數、因數）已全數鎖定，能源核心狀態：穩定已校準 (100%)！大溪科技校園運轉正常。'
            : (item.npcData?.dialogue || '請進行數學校準任務。'),
          portraitUrl: item.npcData?.portraitUrl,
        });
      }
      return;
    }

    // 5. NPC or Object dialogue
    if (item.type === 'npc' || item.type === 'object') {
      soundManager.playBlip();
      if (item.npcData && onInteractNPC) {
        let dialogue = item.npcData.dialogue;
        if (item.id === 'npc-cai' && isCoreCalibrated) {
          dialogue = '太棒了！實驗室回報能源核心已成功校準，大溪校園的能源危機解除了！你可以繼續在校園走道探索，找尋散落的能量晶片與各教室的數學挑戰！';
        }
        onInteractNPC({
          id: item.id,
          name: item.name,
          title: item.npcData.title,
          dialogue,
          portraitUrl: item.npcData.portraitUrl,
        });
      }
    }
  }, [
    activeChallenge,
    effectiveChips,
    isCoreCalibrated,
    isLocked,
    nearbyInteractable,
    onCollectChip,
    onInteractNPC,
    onStartChallenge,
    onStartQuest,
    transitionToMap,
  ]);

  // Trigger 80th Anniversary Confetti and Fanfare Celebration
  const triggerCelebration = useCallback(() => {
    setIsCelebrationActive(true);
    setShowAnniversaryModal(true);
    soundManager.playAnniversaryFanfare();
    soundManager.playFireworkPop();

    // Spawn 80 confetti & firework particles
    const confettiColors = ['#facc15', '#f59e0b', '#38bdf8', '#ec4899', '#10b981', '#ffffff', '#8b5cf6'];
    const newParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      vRot: number;
      alpha: number;
      shape: 'rect' | 'circle';
    }> = [];

    for (let i = 0; i < 90; i++) {
      newParticles.push({
        x: Math.random() * 960,
        y: -10 - Math.random() * 300,
        vx: (Math.random() - 0.5) * 120,
        vy: 120 + Math.random() * 180,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: 5 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 6,
        alpha: 1,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
      });
    }
    particlesRef.current = newParticles;
  }, []);

  // Keyboard Event Listeners with Easter Egg sequence detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
        keysRef.current.add(code);
      }

      if ((code === 'KeyE' || code === 'Space' || code === 'Enter') && !isLocked && !activeChallenge) {
        e.preventDefault();
        triggerInteraction();
      }

      // Check Konami Code or "80" input
      const key = e.key.toUpperCase();
      inputBufferRef.current.push(key);
      if (inputBufferRef.current.length > 20) {
        inputBufferRef.current.shift();
      }
      const bufferStr = inputBufferRef.current.join('');

      // Check Konami Code: ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A
      // Or short codes: '80', '1946', 'DAXI80'
      const isKonami = bufferStr.includes('ARROWUPARROWUPARROWDOWNARROWDOWNARROWLEFTARROWRIGHTARROWLEFTARROWRIGHTBA');
      const isNumber80 = bufferStr.endsWith('80');
      const isDaxi80 = bufferStr.endsWith('1946') || bufferStr.endsWith('DAXI');

      if (isKonami || isNumber80 || isDaxi80) {
        inputBufferRef.current = [];
        triggerCelebration();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeChallenge, isLocked, triggerCelebration, triggerInteraction]);

  // Main 60FPS Game Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let walkTimer = 0;

    const gameLoop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (canvas && ctx) {
        const map = currentMapRef.current;
        const player = playerRef.current;

        // 1. Process movement if not locked
        let input = { dx: 0, dy: 0, isMoving: false };
        if (!isLocked && !isTransitioningRef.current && !activeChallenge) {
          input = computeMovementInput(keysRef.current, joystickVectorRef.current);
        }

        // 2. Physics & Player State Update
        const updateRes = updatePlayer(
          player,
          input,
          dt,
          map.obstacles,
          { width: map.width, height: map.height },
          walkTimer
        );
        playerRef.current = updateRes.player;
        walkTimer = updateRes.newWalkTimer;

        // Filter out already collected chips
        const activeInteractables = map.interactables.filter(
          (item) => !(item.type === 'collectible' && effectiveChips.includes(item.id))
        );

        // 3. Proximity check for interactables
        const nearby = findNearbyInteractable(
          { x: player.x + player.width / 2, y: player.y + player.height / 2 },
          activeInteractables
        );
        setNearbyInteractable(nearby.interactable);

        // 4. Camera Follow (centered on player, clamped to world bounds)
        const viewW = canvas.width;
        const viewH = canvas.height;
        const camX = Math.max(0, Math.min(map.width - viewW, player.x + player.width / 2 - viewW / 2));
        const camY = Math.max(0, Math.min(map.height - viewH, player.y + player.height / 2 - viewH / 2));

        // 5. Render Scene
        ctx.clearRect(0, 0, viewW, viewH);

        ctx.save();
        ctx.translate(-camX, -camY);

        // Layer 1: Specialized Architectural Ground Layer
        renderGroundLayer(ctx, map, mapImagesCache.current, isCoreCalibrated);

        // Layer 2: Architectural Details & Obstacles
        renderCollisionDecorations(ctx, map, isCoreCalibrated, time);

        // Layer 3: Interactive Layer (Stairs, Doorplates, Doors, NPCs, Collectibles)
        renderInteractables(ctx, activeInteractables, nearby.interactable, time, isCoreCalibrated);

        // Layer 4: Player Character Layer
        renderPlayer(ctx, playerRef.current, time, isCelebrationActive);

        ctx.restore();

        // Layer 5: Screen-Space HUD & Minimap
        renderScreenOverlay(ctx, viewW, viewH, playerRef.current, map, activeInteractables);

        // Layer 5.5: 80th Anniversary Confetti Particles Layer
        if (particlesRef.current.length > 0) {
          ctx.save();
          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rotation += p.vRot * dt;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;

            if (p.shape === 'rect') {
              ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
              ctx.beginPath();
              ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();

            // Respawn particles from top while celebration is active, or fade out
            if (p.y > viewH + 20) {
              if (isCelebrationActive) {
                p.y = -10;
                p.x = Math.random() * viewW;
              } else {
                particlesRef.current.splice(i, 1);
              }
            }
          }
          ctx.restore();
        }

        // Layer 6: Map Transition Fade Curtain
        if (fadeAlphaRef.current > 0) {
          ctx.fillStyle = `rgba(15, 23, 42, ${fadeAlphaRef.current})`;
          ctx.fillRect(0, 0, viewW, viewH);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [activeChallenge, effectiveChips, isCelebrationActive, isCoreCalibrated, isLocked]);

  // Touch handlers
  const handleJoystickMove = useCallback((vector: { dx: number; dy: number }) => {
    joystickVectorRef.current = { x: vector.dx, y: vector.dy };
  }, []);

  const handleJoystickStop = useCallback(() => {
    joystickVectorRef.current = { x: 0, y: 0 };
  }, []);

  const handleChallengeComplete = (challengeId: string, badge?: string) => {
    if (badge) {
      setToastNotification({
        title: `解鎖成就：${badge}`,
        badge: badge,
      });
    }
  };

  // Location Breadcrumb
  const breadcrumbList = currentMapRef.current.locationPath && currentMapRef.current.locationPath.length > 0
    ? currentMapRef.current.locationPath
    : getLocationBreadcrumb(activeMapId);
  const breadcrumbText = breadcrumbList.join(' ❯ ');

  return (
    <>
      <div className="rpg-viewport-container" aria-label="2D 校園 RPG 探索畫面">
      {/* Top HUD Status Bar */}
      <div className="rpg-hud-bar">
        {/* Hierarchical Location Breadcrumb (Rule 88) */}
        <div className="hud-location-tag" title={breadcrumbText}>
          <span className="hud-icon">🏫</span>
          <span className="hud-text">{breadcrumbText}</span>
        </div>

        <div className="hud-chips-tag" aria-label="校園能量晶片進度">
          <span className="hud-icon">💎</span>
          <span className="hud-text">校園能量晶片：{effectiveChips.length}/3</span>
        </div>

        <div className="hud-mission-tag">
          <span className="hud-icon">🎯</span>
          <span className="hud-text">
            {isCoreCalibrated
              ? '【校準完成】能源核心運轉穩定！可自由探索各大樓與解鎖教室彩蛋'
              : activeMapId === 'campus-outdoor'
              ? '前往科技館與「數字研究員」對話，或走訪各大樓進行探索'
              : '探索樓層、檢視教室門牌或前往中央操作台'}
          </span>
        </div>

        <div className="hud-control-hint">
          <span className="key-badge">W</span>
          <span className="key-badge">A</span>
          <span className="key-badge">S</span>
          <span className="key-badge">D</span> 移動 |{' '}
          <span className={`key-badge key-badge--interact ${nearbyInteractable ? 'key-badge--pulse' : ''}`}>
            E
          </span>{' '}
          互動
        </div>

        {/* Quick Travel / Map Switch: 椰林大道 🌴 */}
        <button
          type="button"
          className="hud-mission-tag"
          style={{ background: 'linear-gradient(135deg, #15803d, #047857)', color: '#ffffff', cursor: 'pointer', pointerEvents: 'auto' }}
          onClick={() => {
            soundManager.playBlip();
            if (activeMapId === 'palm-boulevard') {
              transitionToMap('campus-outdoor', { x: 720, y: 920 });
            } else {
              transitionToMap('palm-boulevard', { x: 400, y: 1350 });
            }
          }}
          title={activeMapId === 'palm-boulevard' ? '進入校園中庭' : '漫步校門口民權東路椰林大道'}
        >
          <span className="hud-icon">🌴</span>
          <span className="hud-text">{activeMapId === 'palm-boulevard' ? '進入校園中庭 🏫' : '前往校門椰林大道 🌴'}</span>
        </button>

        {/* 80th Anniversary Trigger Button (Accessible for Touch & Mouse) */}
        <button
          type="button"
          className="hud-mission-tag anniversary-badge-btn"
          onClick={triggerCelebration}
          title="點擊慶祝大溪國中 80 週年校慶 (或鍵盤輸入 80)"
        >
          <span className="hud-icon">🎉</span>
          <span className="hud-text">80週年校慶彩蛋</span>
        </button>

        {/* Audio Mute/Unmute toggle */}
        <button
          type="button"
          className="hud-control-hint anniversary-sound-btn"
          onClick={() => {
            const muted = soundManager.toggleMute();
            setIsAudioMuted(muted);
          }}
          title={isAudioMuted ? '開啟音效' : '靜音'}
        >
          <span className="hud-icon">{isAudioMuted ? '🔇' : '🔊'}</span>
          <span className="hud-text">{isAudioMuted ? '靜音' : '音效開啟'}</span>
        </button>
      </div>

      {/* Main 2D Game Canvas */}
      <canvas
        ref={canvasRef}
        width={960}
        height={580}
        className="rpg-main-canvas"
        aria-label="校園 2D Top-Down 角色走動地圖"
      />

      {/* 80th Anniversary Greeting Celebration Modal */}
      {showAnniversaryModal && (
        <div className="anniversary-modal-overlay" role="dialog" aria-modal="true">
          <div className="anniversary-card animate-pop-in">
            <button
              type="button"
              className="anniversary-card-close"
              onClick={() => setShowAnniversaryModal(false)}
              aria-label="關閉校慶賀卡"
            >
              ✕
            </button>
            <div className="anniversary-crown">🎂🏛️🎉</div>
            <h2>大溪國中 80 週年校慶</h2>
            <p className="anniversary-slogan">「甲子又廿．作育英才．溪中風華．光輝八十」</p>
            <p className="anniversary-desc">
              恭喜解鎖校慶專屬彩蛋！自民國 35 年（1946）創校至今，大溪國中走過八十載春秋，
              在傳統文化與未來科技教育中持續發光。
              你的角色已獲得「溪中 80 週年校慶使者」光環與派對帽！
            </p>
            <div className="anniversary-meta-box">
              <div className="meta-item">
                <span className="meta-label">創校年份</span>
                <span className="meta-val">民國 35 年 (1946)</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">校慶主題</span>
                <span className="meta-val">80 週年大慶</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">紀念碑位置</span>
                <span className="meta-val">校門迎賓廣場中庭</span>
              </div>
            </div>
            <div className="completion-modal-actions">
              <button
                type="button"
                className="modal-action-btn primary-btn"
                onClick={() => {
                  setShowAnniversaryModal(false);
                  soundManager.playAnniversaryFanfare();
                }}
              >
                🎊 一起歡慶 80 歲生日！
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Collectible or Achievement Notification Toast */}
      {toastNotification && (
        <aside
          className="chip-notification-toast animate-slide-in"
          role="status"
          aria-live="polite"
        >
          <div className="toast-header">
            <span className="toast-icon">{toastNotification.badge ? '🏆' : '✨'}</span>
            <strong className="toast-title">{toastNotification.title}</strong>
            {toastNotification.badge && <span className="toast-badge-glow">成就達成</span>}
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setToastNotification(null)}
              aria-label="關閉提示"
            >
              ✕
            </button>
          </div>
          {toastNotification.clue && (
            <p className="toast-clue">{toastNotification.clue}</p>
          )}
        </aside>
      )}

      {/* Proximity Floating Interaction Banner */}
      {nearbyInteractable && !isLocked && !activeChallenge && (
        <div
          className="proximity-interaction-banner animate-bounce"
          onClick={triggerInteraction}
          role="button"
          tabIndex={0}
        >
          <span className="banner-icon">
            {nearbyInteractable.type === 'stairs'
              ? nearbyInteractable.stairDirection === 'up'
                ? '▲'
                : '▼'
              : nearbyInteractable.type === 'door'
              ? '🚪'
              : nearbyInteractable.doorPlate
              ? '🏷️'
              : nearbyInteractable.type === 'collectible'
              ? '💎'
              : nearbyInteractable.id.includes('terminal')
              ? '⚡'
              : '💬'}
          </span>
          <span className="banner-title">{nearbyInteractable.promptText}</span>
        </div>
      )}

      {/* Modular Classroom Challenge Modal */}
      {activeChallenge && (
        <ClassroomChallengeModal
          challenge={activeChallenge}
          mode="story"
          onClose={() => setActiveChallenge(null)}
          onComplete={handleChallengeComplete}
        />
      )}

      {/* Mobile/Tablet Virtual Controls */}
      <VirtualJoystick
        onMove={handleJoystickMove}
        onStop={handleJoystickStop}
        onInteract={triggerInteraction}
        canInteract={!!nearbyInteractable && !isLocked && !activeChallenge}
      />
      </div>
      {/* Campus Fast-Travel Navigator Bar (Rule 88, 80th Anniversary & Palm Boulevard) */}
      <nav className="campus-fast-travel-bar" aria-label="校園快速漫遊導覽">
        <div className="fast-travel-label">
          <span className="fast-travel-icon">🗺️</span>
          <span className="fast-travel-text">校園快捷傳送：</span>
        </div>
        <div className="fast-travel-buttons">
          <button
            type="button"
            className={`fast-travel-btn ${activeMapId === 'palm-boulevard' ? 'fast-travel-btn--active' : ''}`}
            onClick={() => {
              soundManager.playBlip();
              transitionToMap('palm-boulevard', { x: 400, y: 1350 });
            }}
            title="漫步校門口民權東路椰林大道 (12棵大王椰子樹、正校門立柱與金色明珠地標)"
          >
            🌴 校門椰林大道
          </button>
          <button
            type="button"
            className={`fast-travel-btn ${activeMapId === 'campus-outdoor' ? 'fast-travel-btn--active' : ''}`}
            onClick={() => {
              soundManager.playBlip();
              transitionToMap('campus-outdoor', { x: 720, y: 780 });
            }}
            title="前往校園中庭迎曦廣場與 80 週年校慶紀念石碑"
          >
            🏛️ 迎曦中庭 (80週年碑)
          </button>
          <button
            type="button"
            className="fast-travel-btn"
            onClick={() => {
              soundManager.playBlip();
              transitionToMap('campus-outdoor', { x: 330, y: 260 });
            }}
            title="操場司令台巨幅馬賽克壁畫「跨越巔峰・奔向朝陽」"
          >
            🏃 操場司令台壁畫
          </button>
          <button
            type="button"
            className={`fast-travel-btn ${activeMapId === 'tech-lab-interior' ? 'fast-travel-btn--active' : ''}`}
            onClick={() => {
              soundManager.playBlip();
              transitionToMap('tech-lab-interior', { x: 400, y: 340 });
            }}
            title="進入科技館未來能源核心實驗室進行數學校準"
          >
            🔬 科技館 (能源核心)
          </button>
          <button
            type="button"
            className="fast-travel-btn"
            onClick={() => {
              soundManager.playBlip();
              transitionToMap('campus-outdoor', { x: 720, y: 680 });
            }}
            title="前往員生消費合作社挑戰找零速算心算彩蛋"
          >
            🛒 合作社心算彩蛋
          </button>
          <button
            type="button"
            className="fast-travel-btn fast-travel-btn--anniversary"
            onClick={triggerCelebration}
            title="觸發大溪國中 80 週年校慶禮炮、歡慶光環與彩蛋視窗"
          >
            🎉 80週年校慶彩蛋
          </button>
        </div>
      </nav>
    </>
  );
};

/* ========================================================================= */
/*                          CANVAS LAYER RENDERING                           */
/* ========================================================================= */

/**
 * Procedural Ground Texture by Building Type
 */
function renderGroundLayer(
  ctx: CanvasRenderingContext2D,
  map: MapDefinition,
  imageCache: Record<string, HTMLImageElement>,
  isCoreCalibrated: boolean
) {
  const bgImg = imageCache[map.id];
  if (bgImg) {
    ctx.drawImage(bgImg, 0, 0, map.width, map.height);
    return;
  }

  // 0. 校門口椰林大道 (Palm Boulevard - Asphalt Road & Royal Palm Trees)
  if (map.id === 'palm-boulevard') {
    // 兩側熱帶綠蔭植栽草地
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(0, 0, map.width, map.height);

    // 中央民權東路筆直雙向瀝青柏油大道 (寬度 400，從 x: 200 到 600)
    ctx.fillStyle = '#374151';
    ctx.fillRect(200, 0, 400, map.height);

    // 兩側路肩紅實線
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(215, 0);
    ctx.lineTo(215, map.height);
    ctx.moveTo(585, 0);
    ctx.lineTo(585, map.height);
    ctx.stroke();

    // 兩側路肩排水邊界白線
    ctx.strokeStyle = '#f9fafb';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(230, 0);
    ctx.lineTo(230, map.height);
    ctx.moveTo(570, 0);
    ctx.lineTo(570, map.height);
    ctx.stroke();

    // 中央車道雙黃實線 (標誌性大溪國中民權東路路面)
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(395, 0);
    ctx.lineTo(395, map.height);
    ctx.moveTo(405, 0);
    ctx.lineTo(405, map.height);
    ctx.stroke();

    // 路面大字印花【民權東路】(向校門透視)
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '900 32px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('民 權 東 路', 400, 1380);
    ctx.fillText('大 溪 國 中', 400, 680);

    // 斑馬線迎賓格
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let bx = 240; bx <= 560; bx += 32) {
      ctx.fillRect(bx, 150, 20, 40);
    }
    ctx.restore();

    // 北端大溪國中宏偉正校門 (白色立柱 + 頂端金色明珠)
    // 左立柱
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(230, 80, 90, 80);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.strokeRect(230, 80, 90, 80);
    // 左金球
    const goldGradL = ctx.createRadialGradient(275, 75, 4, 275, 75, 22);
    goldGradL.addColorStop(0, '#fef08a');
    goldGradL.addColorStop(0.5, '#eab308');
    goldGradL.addColorStop(1, '#a16207');
    ctx.fillStyle = goldGradL;
    ctx.beginPath();
    ctx.arc(275, 75, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 右立柱 (警衛室門面)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(480, 80, 90, 80);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.strokeRect(480, 80, 90, 80);
    // 右金球
    const goldGradR = ctx.createRadialGradient(525, 75, 4, 525, 75, 22);
    goldGradR.addColorStop(0, '#fef08a');
    goldGradR.addColorStop(0.5, '#eab308');
    goldGradR.addColorStop(1, '#a16207');
    ctx.fillStyle = goldGradR;
    ctx.beginPath();
    ctx.arc(525, 75, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 門楣橫幅校名
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(320, 85, 160, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('桃園市立大溪國民中學', 400, 101);

    // 沿途繪製 12 棵高聳大王椰子樹 (左右兩側，巨大棕櫚樹冠與灰白節環樹幹)
    const treeYCoords = [260, 460, 680, 900, 1120, 1340];
    for (const ty of treeYCoords) {
      // 左側椰子樹
      drawRoyalPalmTree(ctx, 190, ty);
      // 右側椰子樹
      drawRoyalPalmTree(ctx, 610, ty);
    }
    return;
  }

  const buildingId = map.buildingId || '';

  // 1. 科技館 (Tech Lab Interior)
  if (map.id === 'tech-lab-interior' || buildingId === 'tech-lab') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, map.width, map.height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    const tileSize = 50;
    for (let x = 0; x < map.width; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, map.height);
      ctx.stroke();
    }
    for (let y = 0; y < map.height; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(map.width, y);
      ctx.stroke();
    }

    // Glowing circuit lines to central core
    ctx.strokeStyle = isCoreCalibrated ? 'rgba(16, 185, 129, 0.7)' : 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400, 500);
    ctx.lineTo(400, 280);
    ctx.stroke();
    return;
  }

  // 2. 行政大樓 (Admin Building - Marble Beige Texture & Mahogany doors)
  if (buildingId === 'building-admin') {
    // Marble beige base
    ctx.fillStyle = '#f8f4ed';
    ctx.fillRect(0, 0, map.width, map.height);

    // Marble tile grid (80x80) with warm borders
    ctx.strokeStyle = '#e7dece';
    ctx.lineWidth = 1.5;
    const tileSize = 80;
    for (let x = 0; x < map.width; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, map.height);
      ctx.stroke();
    }
    for (let y = 0; y < map.height; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(map.width, y);
      ctx.stroke();
    }

    // Marble vein accents
    ctx.strokeStyle = 'rgba(215, 203, 185, 0.45)';
    ctx.lineWidth = 1;
    for (let x = 40; x < map.width; x += 160) {
      ctx.beginPath();
      ctx.moveTo(x, 120);
      ctx.bezierCurveTo(x + 20, 200, x - 15, 320, x + 30, 470);
      ctx.stroke();
    }
    return;
  }

  // 3. 綜合大樓 / 圖書館 (Complex Building - Wood Herringbone Parquet Floor)
  if (buildingId === 'building-complex' || buildingId === 'building-multi') {
    // Herringbone wood parquet background
    ctx.fillStyle = '#caa576';
    ctx.fillRect(0, 0, map.width, map.height);

    // Draw stylized herringbone pattern
    ctx.lineWidth = 1;
    const plankW = 40;
    const plankH = 14;
    for (let y = 120; y < map.height - 30; y += plankH * 2) {
      for (let x = 30; x < map.width - 30; x += plankW) {
        ctx.fillStyle = (x + y) % 3 === 0 ? '#b8905e' : (x + y) % 2 === 0 ? '#d4ad7f' : '#c39c6c';
        ctx.fillRect(x, y, plankW, plankH);
        ctx.strokeStyle = 'rgba(107, 68, 35, 0.25)';
        ctx.strokeRect(x, y, plankW, plankH);
      }
    }
    return;
  }

  // 4. 活動中心 (Gymnasium - Maple Sports Court with lines)
  if (buildingId === 'building-gym') {
    ctx.fillStyle = '#f3d59b';
    ctx.fillRect(0, 0, map.width, map.height);

    // Court plank lines
    ctx.strokeStyle = 'rgba(217, 169, 93, 0.4)';
    ctx.lineWidth = 1;
    for (let y = 100; y < map.height - 30; y += 12) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(map.width - 30, y);
      ctx.stroke();
    }

    // Basketball Court Lines (White & Red)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    // Outer court line
    ctx.strokeRect(90, 140, 720, 340);

    // Center circle
    ctx.beginPath();
    ctx.arc(450, 310, 55, 0, Math.PI * 2);
    ctx.stroke();

    // Center half-court line
    ctx.beginPath();
    ctx.moveTo(450, 140);
    ctx.lineTo(450, 480);
    ctx.stroke();

    // 3-point key areas
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(90, 310, 90, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(810, 310, 90, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.stroke();
    return;
  }

  // 5. 人文藝術館 (Art Building - Warm Wood Gallery Floor)
  if (buildingId === 'building-art') {
    ctx.fillStyle = '#9c6644';
    ctx.fillRect(0, 0, map.width, map.height);

    ctx.strokeStyle = '#7f4f24';
    ctx.lineWidth = 1.5;
    for (let y = 120; y < map.height - 30; y += 28) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(map.width - 30, y);
      ctx.stroke();
    }
    return;
  }

  // 6. 新大樓 / 八九年級教學大樓 (Modern School Corridor Tiles with Daylight Windows)
  // Default for classroom buildings
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, map.width, map.height);

  // Modern corridor square tiles (50x50)
  const tileSize = 50;
  for (let x = 0; x < map.width; x += tileSize) {
    for (let y = 0; y < map.height; y += tileSize) {
      ctx.fillStyle = ((x / tileSize + y / tileSize) % 2 === 0) ? '#f8fafc' : '#e2e8f0';
      ctx.fillRect(x, y, tileSize, tileSize);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  // Classroom daylight window glows along top wall
  const windowCount = Math.floor(map.width / 120);
  for (let i = 0; i < windowCount; i++) {
    const wx = 80 + i * 120;
    const grad = ctx.createLinearGradient(wx, 120, wx, 220);
    grad.addColorStop(0, 'rgba(186, 230, 253, 0.45)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(wx - 25, 120, 50, 100);
  }
}

/**
 * 大溪國中民權東路大王椰子樹專屬繪製函式 (Royal Palm Tree)
 * 依照真實照片特徵：高聳筆直、灰白色粗壯樹幹帶水平節環、微膨大基部、繁茂熱帶棕櫚葉冠與落影
 */
function drawRoyalPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();

  // 1. 地面自然陰影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(x + 10, y + 10, 36, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. 樹根與基座 (大王椰子基部微圓膨大特徵)
  const baseGrad = ctx.createLinearGradient(x - 14, y, x + 14, y);
  baseGrad.addColorStop(0, '#64748b');
  baseGrad.addColorStop(0.5, '#cbd5e1');
  baseGrad.addColorStop(1, '#475569');
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.ellipse(x, y + 2, 15, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. 樹幹 (灰白柱狀，帶橫向年輪節環)
  const trunkW = 16;
  const trunkH = 80;
  const trunkGrad = ctx.createLinearGradient(x - trunkW / 2, y - trunkH, x + trunkW / 2, y);
  trunkGrad.addColorStop(0, '#94a3b8');
  trunkGrad.addColorStop(0.4, '#e2e8f0');
  trunkGrad.addColorStop(1, '#64748b');

  ctx.fillStyle = trunkGrad;
  ctx.beginPath();
  ctx.roundRect(x - trunkW / 2, y - trunkH, trunkW, trunkH, 4);
  ctx.fill();

  // 樹幹水平環狀橫紋
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.45)';
  ctx.lineWidth = 1.2;
  for (let ringY = y - trunkH + 10; ringY < y; ringY += 12) {
    ctx.beginPath();
    ctx.moveTo(x - trunkW / 2 + 1, ringY);
    ctx.lineTo(x + trunkW / 2 - 1, ringY);
    ctx.stroke();
  }

  // 4. 上段鮮綠色葉鞘 (大王椰子頂部光滑深綠色葉鞘段)
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.roundRect(x - trunkW / 2 + 1, y - trunkH - 18, trunkW - 2, 20, 2);
  ctx.fill();

  // 5. 傘狀放射羽狀椰林葉冠 (放射狀舒展向下垂彎的大王椰子葉)
  const crownY = y - trunkH - 16;
  const frondCount = 10;
  for (let i = 0; i < frondCount; i++) {
    const angle = (i / frondCount) * Math.PI * 2;
    const len = 42 + (i % 2) * 12;

    ctx.save();
    ctx.translate(x, crownY);
    ctx.rotate(angle);

    // 主葉軸
    ctx.strokeStyle = i % 2 === 0 ? '#166534' : '#15803d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(len * 0.5, -8, len, 12);
    ctx.stroke();

    // 羽狀細葉裂片
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.5;
    for (let f = 10; f < len; f += 7) {
      const drop = (f / len) * 10;
      ctx.beginPath();
      ctx.moveTo(f, drop - 5);
      ctx.lineTo(f + 4, drop + 9);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.restore();
}

/**
 * Architectural Wall & Furniture Decorations
 */
function renderCollisionDecorations(
  ctx: CanvasRenderingContext2D,
  map: MapDefinition,
  isCoreCalibrated: boolean,
  time: number
) {
  // Walls base rendering: Only draw wall/furniture blocks for indoor maps!
  // Outdoor maps (campus-outdoor & palm-boulevard) are rendered via background art and dedicated roadside procedural graphics.
  if (map.id !== 'campus-outdoor' && map.id !== 'palm-boulevard') {
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;

    for (const obs of map.obstacles) {
      // Check if obstacle is a perimeter wall
      if (obs.height >= 400 || obs.y === 0 || obs.y >= 450) {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

        // Top wall decorative classroom border
        if (obs.y === 0 && obs.height >= 80) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(obs.x, obs.height - 10, obs.width, 10);
        }
      } else {
        // Internal structural furniture / columns / benches
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  // 大溪國中戶外中庭南校門引道 (通往民權東路椰林大道)
  if (map.id === 'campus-outdoor') {
    ctx.save();
    // 柏油引道 (x: 630~810, y: 940~1031)
    ctx.fillStyle = '#374151';
    ctx.fillRect(630, 940, 180, 91);

    // 兩側路緣紅實線
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(635, 940);
    ctx.lineTo(635, 1031);
    ctx.moveTo(805, 940);
    ctx.lineTo(805, 1031);
    ctx.stroke();

    // 中央車道雙黃線
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(716, 940);
    ctx.lineTo(716, 1031);
    ctx.moveTo(724, 940);
    ctx.lineTo(724, 1031);
    ctx.stroke();

    // 迎賓斑馬線
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let bx = 650; bx <= 780; bx += 22) {
      ctx.fillRect(bx, 946, 14, 24);
    }

    // 兩側南校門白色立柱與金色圓球
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(620, 950, 18, 55);
    ctx.fillRect(802, 950, 18, 55);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.strokeRect(620, 950, 18, 55);
    ctx.strokeRect(802, 950, 18, 55);

    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(629, 944, 9, 0, Math.PI * 2);
    ctx.arc(811, 944, 9, 0, Math.PI * 2);
    ctx.fill();

    // 大道指標路面標記
    ctx.fillStyle = 'rgba(254, 240, 138, 0.95)';
    ctx.font = '900 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('▼ 往 民權東路椰林大道 (南校門出口) ▼', 720, 985);
    ctx.restore();
  }

  // Tech Lab Central Reactor
  if (map.id === 'tech-lab-interior') {
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(320, 160, 160, 120, 12);
    ctx.fill();

    const coreColor = isCoreCalibrated ? '#10b981' : '#06b6d4';
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    const pulse = Math.sin(time / 200) * 4;
    ctx.fillStyle = isCoreCalibrated ? '#34d399' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(400, 220, 36 + (isCoreCalibrated ? pulse * 0.5 : 0), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(400, 220, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isCoreCalibrated ? 'rgba(6, 78, 59, 0.85)' : 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(330, 125, 140, 22, 6);
    ctx.fill();
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = isCoreCalibrated ? '#34d399' : '#fef08a';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      isCoreCalibrated ? '⚡ 能源核心：穩定已校準 100%' : '⚠️ 能源核心：待數學校準',
      400,
      140
    );
  }

  // Math Challenge Room Podium & Blackboard
  if (map.id === 'room-math-challenge') {
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(180, 10, 290, 60);
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 3;
    ctx.strokeRect(180, 10, 290, 60);

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('七年級數學研究室：正負數、指數與質因數', 325, 45);
  }
}

/**
 * Render Interactive Entities: Stairs, Doorplates, Doors, Collectibles, NPCs
 */
function renderInteractables(
  ctx: CanvasRenderingContext2D,
  interactables: Interactable[],
  activeItem: Interactable | null,
  time: number,
  isCoreCalibrated: boolean
) {
  for (const item of interactables) {
    const isSelected = activeItem?.id === item.id;

    if (item.type === 'stairs') {
      drawStairsSprite(ctx, item, isSelected, time);
    } else if (item.type === 'portal') {
      drawPortalSprite(ctx, item, isSelected, time);
    } else if (item.doorPlate) {
      drawDoorPlateSprite(ctx, item, isSelected, time);
    } else if (item.type === 'door') {
      drawDoorSprite(ctx, item, isSelected, time);
    } else if (item.type === 'collectible') {
      drawCollectibleSprite(ctx, item, isSelected, time);
    } else if (item.type === 'npc') {
      drawNPCSprite(ctx, item, isSelected, time);
    } else if (item.type === 'object') {
      drawObjectSprite(ctx, item, isSelected, time, isCoreCalibrated);
    }
  }
}

/**
 * High-detail Stairs Rendering (Rules 76～78, 108)
 * Shows step treads, handrails, and clear ▲/▼ directional glowing indicator
 */
function drawStairsSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number
) {
  const { x, y, width, height, stairDirection } = item;
  const isUp = stairDirection === 'up';

  ctx.save();

  // Stairwell base cutout
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x - width / 2, y - height / 2, width, height);

  // Draw step treads
  const steps = 6;
  const stepH = height / steps;
  for (let i = 0; i < steps; i++) {
    const sy = y - height / 2 + i * stepH;
    ctx.fillStyle = i % 2 === 0 ? '#475569' : '#334155';
    ctx.fillRect(x - width / 2 + 3, sy, width - 6, stepH - 1);

    // Tread highlight line
    ctx.fillStyle = isUp ? 'rgba(56, 189, 248, 0.6)' : 'rgba(251, 191, 36, 0.6)';
    ctx.fillRect(x - width / 2 + 3, sy, width - 6, 2);
  }

  // Side handrails
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x - width / 2 + 2, y - height / 2);
  ctx.lineTo(x - width / 2 + 2, y + height / 2);
  ctx.moveTo(x + width / 2 - 2, y - height / 2);
  ctx.lineTo(x + width / 2 - 2, y + height / 2);
  ctx.stroke();

  // Outer border with neon pulse
  const pulse = Math.sin(time / 200) * 0.25 + 0.75;
  ctx.strokeStyle = isUp ? `rgba(56, 189, 248, ${pulse})` : `rgba(245, 158, 11, ${pulse})`;
  ctx.lineWidth = isSelected ? 3 : 2;
  ctx.strokeRect(x - width / 2, y - height / 2, width, height);

  // Overhead Stair Indicator Badge (▲ / ▼)
  const bounce = Math.sin(time / 180) * 2;
  const badgeY = y - height / 2 - 16 + bounce;
  const arrowColor = isUp ? '#38bdf8' : '#f59e0b';

  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.beginPath();
  ctx.roundRect(x - 36, badgeY - 10, 72, 20, 6);
  ctx.fill();
  ctx.strokeStyle = arrowColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = arrowColor;
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isUp ? '▲ 往上層' : '▼ 往下層', x, badgeY + 4);

  // Proximity Floating Prompt (< 60px)
  if (isSelected) {
    const promptY = y - height / 2 - 42 + bounce;
    ctx.fillStyle = isUp ? '#0284c7' : '#d97706';
    ctx.beginPath();
    ctx.roundRect(x - 90, promptY, 180, 24, 6);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(item.promptText, x, promptY + 16);
  }

  ctx.restore();
}

/**
 * High-tech Classroom Doorplate System (Rules 80～82)
 * Shows physical luminous plaque [ 701 ], [ 702 ], [ 數學研究室 ◈ ], etc.
 */
function drawDoorPlateSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number
) {
  const { x, y, width, height, doorPlate } = item;
  const text = doorPlate || item.name;

  ctx.save();

  // Plaque outer metallic casing
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y - height / 2, width, height, 5);
  ctx.fill();

  // Glowing neon frame
  const isChallenge = !!item.challengeId || text.includes('◈');
  const isEaster = text.includes('✦') || text.includes('彩蛋');
  const frameColor = isEaster ? '#facc15' : isChallenge ? '#38bdf8' : '#64748b';

  ctx.strokeStyle = isSelected ? '#ffffff' : frameColor;
  ctx.lineWidth = isSelected ? 2.5 : 1.5;
  ctx.stroke();

  // Little LED indicator dot on top-left of plate
  ctx.fillStyle = isEaster ? '#facc15' : isChallenge ? '#38bdf8' : '#10b981';
  ctx.beginPath();
  ctx.arc(x - width / 2 + 5, y - height / 2 + 5, 2, 0, Math.PI * 2);
  ctx.fill();

  // Door plate text: [ 701 ] or [ 數學研究室 ◈ ]
  ctx.fillStyle = isEaster ? '#fef08a' : isChallenge ? '#e0f2fe' : '#f8fafc';
  ctx.font = 'bold 10px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y + 4);

  // Proximity balloon (< 50px)
  if (isSelected) {
    const bounce = Math.sin(time / 160) * 3;
    const by = y - height / 2 - 32 + bounce;

    ctx.fillStyle = isEaster ? '#b45309' : isChallenge ? '#0369a1' : '#1e293b';
    ctx.beginPath();
    ctx.roundRect(x - 70, by, 140, 22, 6);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText(
      item.challengeId ? '◈ 按 [E] 進入挑戰' : item.promptText ? item.promptText.slice(0, 18) : '按 [E] 檢視門牌',
      x,
      by + 15
    );
  }

  ctx.restore();
}

/**
 * Standard Doorway Sprite
 */
function drawDoorSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number
) {
  const pulse = Math.sin(time / 250) * 0.2 + 0.8;
  ctx.fillStyle = isSelected
    ? `rgba(56, 189, 248, ${pulse})`
    : 'rgba(6, 182, 212, 0.45)';
  ctx.beginPath();
  ctx.roundRect(item.x - item.width / 2, item.y - item.height / 2, item.width, item.height, 6);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(item.name, item.x, item.y - 12);
}

/**
 * Dedicated Grand Portal Sprite (Campus Gateway & Boulevard Transitions)
 */
function drawPortalSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number
) {
  const { x, y, width, height, name, promptText } = item;
  const isPalm = item.id.includes('palm') || item.targetMapId === 'palm-boulevard';
  const pulse = Math.sin(time / 200) * 0.25 + 0.75;

  ctx.save();
  // Portal glowing ground area
  const baseColor = isPalm ? `rgba(22, 163, 74, ${0.45 * pulse})` : `rgba(2, 132, 199, ${0.45 * pulse})`;
  const neonColor = isPalm ? '#4ade80' : '#38bdf8';

  ctx.fillStyle = baseColor;
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y - height / 2, width, height, 10);
  ctx.fill();

  ctx.strokeStyle = isSelected ? '#ffffff' : neonColor;
  ctx.lineWidth = isSelected ? 3 : 2;
  ctx.stroke();

  // Direction chevron indicator
  const arrowBounce = Math.sin(time / 160) * 3;
  ctx.fillStyle = neonColor;
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isPalm ? '▼' : '▲', x, y + 6 + arrowBounce);

  // Floating portal banner
  const bounce = Math.sin(time / 180) * 2;
  const bannerY = y - height / 2 - 18 + bounce;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.beginPath();
  ctx.roundRect(x - 100, bannerY - 12, 200, 24, 6);
  ctx.fill();

  ctx.strokeStyle = isSelected ? '#ffffff' : neonColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = isPalm ? '#86efac' : '#7dd3fc';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.fillText(name, x, bannerY + 4);

  // Proximity balloon (< 65px)
  if (isSelected) {
    const promptY = bannerY - 30;
    ctx.fillStyle = isPalm ? '#15803d' : '#0369a1';
    ctx.beginPath();
    ctx.roundRect(x - 110, promptY, 220, 24, 6);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(promptText || '按 [E] 傳送移動', x, promptY + 16);
  }

  ctx.restore();
}

function drawCollectibleSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number
) {
  const { x, y } = item;
  const bobY = Math.sin(time / 220) * 3;
  const pulse = Math.sin(time / 200) * 0.25 + 0.75;

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(x, y + 14, 12, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  const grad = ctx.createRadialGradient(x, y + bobY, 2, x, y + bobY, 20);
  grad.addColorStop(0, `rgba(56, 189, 248, ${0.85 * pulse})`);
  grad.addColorStop(0.5, `rgba(250, 204, 21, ${0.5 * pulse})`);
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y + bobY, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(x, y + bobY);

  ctx.fillStyle = isSelected ? '#ffffff' : '#facc15';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, -11);
  ctx.lineTo(9, 0);
  ctx.lineTo(0, 11);
  ctx.lineTo(-9, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.lineTo(5, 0);
  ctx.lineTo(0, 6);
  ctx.lineTo(-5, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (isSelected) {
    const bounce = Math.sin(time / 160) * 3;
    const by = y - 44 + bounce;

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(x - 52, by, 104, 22, 6);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('按 [E] 拾取晶片', x, by + 15);
  }

  ctx.restore();
}

function drawNPCSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number
) {
  const { x, y } = item;

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(x, y + 20, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const idleBob = Math.sin(time / 280) * 1.5;
  ctx.save();
  ctx.translate(x, y + idleBob);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-7, -4, 14, 16);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(-11, -6, 22, 22, 4);
  ctx.fill();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(0, -14, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.arc(0, -16, 9.5, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(-6, -14, 4, 3);
  ctx.strokeRect(2, -14, 4, 3);

  ctx.restore();

  ctx.save();
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  const label = `✦ ${item.name}`;
  const tw = ctx.measureText(label).width;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(x - tw / 2 - 6, y - 38, tw + 12, 18, 4);
  ctx.fill();

  ctx.strokeStyle = isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.fillText(label, x, y - 25);

  if (isSelected) {
    const bounce = Math.sin(time / 160) * 3;
    const by = y - 70 + bounce;

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(x - 44, by, 88, 24, 6);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('按 [E] 交談', x, by + 16);
  }
  ctx.restore();
}

function drawObjectSprite(
  ctx: CanvasRenderingContext2D,
  item: Interactable,
  isSelected: boolean,
  time: number,
  isCoreCalibrated: boolean
) {
  const { x, y } = item;

  // 特殊渲染：大溪國中 80 週年時光紀念石碑
  if (item.id === 'monument-daxi-80th') {
    ctx.save();
    // 陰影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y + 22, 28, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // 紀念碑底座 (典雅石材)
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.roundRect(x - 26, y + 6, 52, 16, 4);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 紀念碑主石 (金色至大溪科技藍漸層)
    const bob = Math.sin(time / 280) * 1.5;
    const monumentGrad = ctx.createLinearGradient(x - 20, y - 36, x + 20, y + 6);
    monumentGrad.addColorStop(0, '#fef08a');
    monumentGrad.addColorStop(0.3, '#f59e0b');
    monumentGrad.addColorStop(1, '#0284c7');

    ctx.fillStyle = monumentGrad;
    ctx.beginPath();
    ctx.moveTo(x - 20, y + 6);
    ctx.lineTo(x - 16, y - 30 + bob);
    ctx.lineTo(x, y - 44 + bob); // 尖頂
    ctx.lineTo(x + 16, y - 30 + bob);
    ctx.lineTo(x + 20, y + 6);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 旋轉微光環繞 (80 週年光輝)
    const pulse = Math.sin(time / 200) * 0.3 + 0.7;
    ctx.strokeStyle = `rgba(250, 204, 21, ${pulse})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(x, y - 16 + bob, 24, 7, Math.PI / 12, 0, Math.PI * 2);
    ctx.stroke();

    // 石碑上的標誌數字：80
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('80', x, y - 10 + bob);

    // 紀念碑漂浮抬頭標籤
    const tagY = y - 56 + bob;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(x - 68, tagY - 10, 136, 22, 6);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏛️ 溪中 80 週年紀念碑', x, tagY + 5);

    if (isSelected) {
      const bounce = Math.sin(time / 160) * 3;
      const promptY = tagY - 30 + bounce;
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(x - 85, promptY, 170, 24, 6);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('按 [E] 探索 80 週年校史', x, promptY + 16);
    }

    ctx.restore();
    return;
  }

  // 特殊渲染：操場司令台馬賽克壁畫
  if (item.id === 'object-podium-mural') {
    ctx.save();
    // 司令台藍白壁面裝飾框
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(x - 34, y - 24, 68, 38, 4);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 馬賽克金黃朝陽微縮壁畫圖示
    const muralGrad = ctx.createLinearGradient(x - 28, y - 20, x + 28, y + 10);
    muralGrad.addColorStop(0, '#f97316');
    muralGrad.addColorStop(0.5, '#facc15');
    muralGrad.addColorStop(1, '#0284c7');
    ctx.fillStyle = muralGrad;
    ctx.fillRect(x - 30, y - 20, 60, 30);

    // 壁畫內奔馳跨欄小剪影
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏃 跨越巔峰', x, y - 4);
    ctx.font = '8px system-ui, sans-serif';
    ctx.fillText('司令台壁畫', x, y + 6);

    if (isSelected) {
      const bounce = Math.sin(time / 160) * 3;
      const promptY = y - 48 + bounce;
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(x - 90, promptY, 180, 24, 6);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('按 [E] 鑑賞司令台壁畫', x, promptY + 16);
    }

    ctx.restore();
    return;
  }

  ctx.save();
  ctx.fillStyle = isCoreCalibrated ? '#10b981' : '#38bdf8';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.textAlign = 'center';

  if (isSelected) {
    const bounce = Math.sin(time / 160) * 3;
    ctx.fillStyle = isCoreCalibrated ? '#059669' : '#0284c7';
    ctx.beginPath();
    ctx.roundRect(x - 65, y - 40 + bounce, 130, 24, 6);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(
      item.promptText ? item.promptText.slice(0, 16) : isCoreCalibrated ? '按 [E] 檢視狀態' : '按 [E] 啟動校準',
      x,
      y - 24 + bounce
    );
  }
  ctx.restore();
}

function renderPlayer(
  ctx: CanvasRenderingContext2D,
  player: PlayerEntity,
  time: number,
  isCelebration: boolean = false
) {
  const { x, y, direction, isMoving, walkFrame } = player;
  const centerX = x + 16;
  const centerY = y + 24;

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(centerX, y + 44, 14, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const bobY = isMoving ? (walkFrame % 2 === 0 ? -2 : 0) : Math.sin(time / 260) * 0.8;
  ctx.save();
  ctx.translate(centerX, centerY + bobY);

  ctx.fillStyle = '#1e293b';
  const legOffset = isMoving ? (walkFrame === 1 ? -4 : walkFrame === 3 ? 4 : 0) : 0;

  if (direction === 'up' || direction === 'down') {
    ctx.fillRect(-8, 10 + legOffset, 6, 12);
    ctx.fillRect(2, 10 - legOffset, 6, 12);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(-9, 20 + legOffset, 8, 4);
    ctx.fillRect(1, 20 - legOffset, 8, 4);
  } else {
    ctx.fillRect(-5 + legOffset, 10, 10, 12);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(direction === 'right' ? -2 + legOffset : -7 + legOffset, 20, 9, 4);
  }

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(-10, -6, 20, 18, 4);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-3, -5, 6, 10);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0369a1';
  if (direction === 'down' || direction === 'up') {
    ctx.fillRect(-13, -4 - legOffset, 4, 12);
    ctx.fillRect(9, -4 + legOffset, 4, 12);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(-13, 4 - legOffset, 4, 3);
  } else if (direction === 'left') {
    ctx.fillRect(-11, -3 - legOffset, 6, 13);
  } else {
    ctx.fillRect(5, -3 + legOffset, 6, 13);
  }

  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(0, -14, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#334155';
  ctx.beginPath();
  if (direction === 'down') {
    ctx.arc(0, -16, 9.5, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-8, -17, 16, 5);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-4, -13, 2.5, 2.5);
    ctx.fillRect(1.5, -13, 2.5, 2.5);
  } else if (direction === 'up') {
    ctx.arc(0, -15, 9.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (direction === 'left') {
    ctx.arc(0, -16, 9.5, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();
    ctx.fillRect(-8, -17, 10, 5);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-5, -13, 2.5, 2.5);
  } else {
    ctx.arc(0, -16, 9.5, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();
    ctx.fillRect(-2, -17, 10, 5);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(2.5, -13, 2.5, 2.5);
  }

  ctx.restore();

  // 80 週年校慶派對帽與「80」光環 (若觸發校慶彩蛋)
  if (isCelebration) {
    ctx.save();
    ctx.translate(centerX, centerY + bobY);

    // 金色 80 旋轉光環
    const haloBob = Math.sin(time / 200) * 2;
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, -32 + haloBob, 14, 5, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 漂浮派對彩帽
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(-6, -24 + haloBob);
    ctx.lineTo(0, -36 + haloBob);
    ctx.lineTo(6, -24 + haloBob);
    ctx.closePath();
    ctx.fill();

    // 帽頂金球
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, -37 + haloBob, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  ctx.save();
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = isCelebration ? 'rgba(234, 88, 12, 0.85)' : 'rgba(15, 23, 42, 0.75)';
  const label = isCelebration ? '🎉 溪中 80 週年校慶使者' : '玩家 (探索者)';
  const tw = ctx.measureText(label).width;
  ctx.beginPath();
  ctx.roundRect(centerX - tw / 2 - 5, y - 8, tw + 10, 16, 4);
  ctx.fill();
  if (isCelebration) {
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  ctx.fillStyle = isCelebration ? '#fef08a' : '#38bdf8';
  ctx.fillText(label, centerX, y + 4);
  ctx.restore();
}

/**
 * Screen Overlay: Real-time Multi-Floor Mini-Map (Rules 88～89)
 */
function renderScreenOverlay(
  ctx: CanvasRenderingContext2D,
  viewW: number,
  viewH: number,
  player: PlayerEntity,
  map: MapDefinition,
  activeInteractables: Interactable[]
) {
  // Minimap (Top Right)
  const miniW = 160;
  const miniH = 105;
  const margin = 14;
  const mx = viewW - miniW - margin;
  const my = margin;

  const sx = miniW / map.width;
  const sy = miniH / map.height;

  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(mx, my, miniW, miniH, 8);
  ctx.fill();
  ctx.stroke();

  // Radar Header with Current Map Floor tag
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 9px system-ui, sans-serif';
  ctx.textAlign = 'left';
  const radarTitle = map.floorLevel ? `${map.name.slice(0, 10)} (${map.floorLevel}F)` : map.name.slice(0, 12);
  ctx.fillText(`🗺️ ${radarTitle}`, mx + 8, my + 14);

  // Buildings & Obstacles on radar
  ctx.fillStyle = '#334155';
  for (const obs of map.obstacles) {
    ctx.fillRect(
      mx + obs.x * sx,
      my + obs.y * sy,
      Math.max(2, obs.width * sx),
      Math.max(2, obs.height * sy)
    );
  }

  // Active items markers on radar (Stairs, Doors, Collectibles)
  for (const item of activeInteractables) {
    if (item.type === 'stairs') {
      // Stair directional icon on radar
      ctx.fillStyle = item.stairDirection === 'up' ? '#38bdf8' : '#f59e0b';
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.stairDirection === 'up' ? '▲' : '▼', mx + item.x * sx, my + item.y * sy + 3);
    } else if (item.type === 'collectible') {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(mx + item.x * sx, my + item.y * sy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (item.doorPlate) {
      ctx.fillStyle = '#67e8f9';
      ctx.fillRect(mx + item.x * sx - 2, my + item.y * sy - 2, 4, 4);
    } else {
      ctx.fillStyle = item.type === 'door' ? '#38bdf8' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(mx + item.x * sx, my + item.y * sy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Player dot with heading on radar
  const px = mx + player.x * sx;
  const py = my + player.y * sy;
  ctx.fillStyle = '#22d3ee';
  ctx.beginPath();
  ctx.arc(px, py, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Heading pointer line
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px, py);
  if (player.direction === 'up') ctx.lineTo(px, py - 6);
  else if (player.direction === 'down') ctx.lineTo(px, py + 6);
  else if (player.direction === 'left') ctx.lineTo(px - 6, py);
  else if (player.direction === 'right') ctx.lineTo(px + 6, py);
  ctx.stroke();

  ctx.restore();
}

import { firstQuest } from '../data/quest';
import { getAssetUrl } from '../utils/assets';

export function DialoguePanel({ onAccept, onLater }: { onAccept: () => void; onLater?: () => void }) {
  return <section aria-label="數字研究員對話" className="dialogue-panel"><img className="npc-portrait" src={getAssetUrl('/assets/characters/digital-researcher-v1.png')} alt="數字研究員角色立繪" /><div><p className="npc-name">數字研究員</p><h2>{firstQuest.title}</h2><p>{firstQuest.dialogue}</p><button className="primary-button" onClick={onAccept}>接受任務</button><button className="secondary-button" type="button" onClick={onLater}>稍後再說</button></div></section>;
}

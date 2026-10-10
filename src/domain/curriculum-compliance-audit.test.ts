import { describe, it, expect } from 'vitest';
import { CLASSROOM_CHALLENGES, getChallengeById } from '../data/challenges';
import { gradeChoice } from './grading';
import { MATH_TEACHERS } from '../data/teachers';
import { MAP_REGISTRY } from '../data/maps';
import { CAMPUS_STRUCTURE } from '../data/world-structure';
import fs from 'node:fs';
import path from 'node:path';

describe('獨立稽核：課程空間化、題庫品質、彩蛋與競賽合規 (Curriculum & Compliance Audit)', () => {
  // ==========================================
  // 1. 國中三年數學課程空間化映射（Rules 104～106）
  // ==========================================
  describe('1. 國中三年數學課程空間化映射與題庫教育性引導', () => {
    it('1.1 七年級新大樓空間化映射：數與數線、正負數運算、指數律、因數、質因數分解、一元一次方程式', () => {
      // 核心數學校準關卡（蔡老師研究室）
      const g7Core = getChallengeById('challenge-g7-math');
      expect(g7Core).toBeDefined();
      expect(g7Core?.grade).toBe(7);

      // 數與數線、正負數運算
      const intQ1 = g7Core?.questions.find((q) => q.concept === 'integer' && q.id === 'g7-int-01');
      expect(intQ1).toBeDefined();
      expect(intQ1?.prompt).toContain('地下 3 層');
      expect(intQ1?.hint).toBeDefined();
      expect(intQ1?.explanation).toBeDefined();

      const intQ2 = g7Core?.questions.find((q) => q.concept === 'integer' && q.id === 'g7-int-02');
      expect(intQ2).toBeDefined();
      expect(intQ2?.prompt).toContain('-7 + 12');

      // 指數律
      const expQ1 = g7Core?.questions.find((q) => q.concept === 'exponent' && q.id === 'g7-exp-01');
      expect(expQ1).toBeDefined();
      expect(expQ1?.prompt).toContain('2 的 4 次方');

      const expQ2 = g7Core?.questions.find((q) => q.concept === 'exponent' && q.id === 'g7-exp-02');
      expect(expQ2).toBeDefined();
      expect(expQ2?.prompt).toContain('3³');

      // 因數與質因數
      const facQ = g7Core?.questions.find((q) => q.concept === 'factor' && q.id === 'g7-factor-01');
      expect(facQ).toBeDefined();
      expect(facQ?.prompt).toContain('18 的因數');

      // 707 教室：一元一次方程式與移項法則
      const g7Eq = getChallengeById('challenge-g7-07');
      expect(g7Eq).toBeDefined();
      expect(g7Eq?.grade).toBe(7);
      expect(g7Eq?.questions.length).toBeGreaterThanOrEqual(3);

      const eqQ1 = g7Eq?.questions.find((q) => q.id === 'g7-eq-01');
      expect(eqQ1).toBeDefined();
      expect(eqQ1?.prompt).toContain('3x - 5 = 16');
      expect(eqQ1?.hint).toContain('移項');
      expect(eqQ1?.explanation).toContain('迷思');

      const eqQ2 = g7Eq?.questions.find((q) => q.id === 'g7-eq-02');
      expect(eqQ2).toBeDefined();
      expect(eqQ2?.prompt).toContain('2(x - 3)');

      const eqQ3 = g7Eq?.questions.find((q) => q.id === 'g7-eq-03');
      expect(eqQ3).toBeDefined();
      expect(eqQ3?.prompt).toContain('合作社');
      expect(eqQ3?.choices[eqQ3.answer]).toContain('x = 45');
    });

    it('1.2 八年級教學棟空間化映射：乘法公式、平方根化簡、畢氏定理、多項式長除法、一元二次方程式', () => {
      // 801 教室：平方根化簡
      const g8Sqrt = getChallengeById('challenge-g8-01');
      expect(g8Sqrt).toBeDefined();
      expect(g8Sqrt?.grade).toBe(8);
      const sqrtQ1 = g8Sqrt?.questions.find((q) => q.id === 'g8-sqrt-01');
      expect(sqrtQ1?.prompt).toContain('√72');
      expect(sqrtQ1?.choices[sqrtQ1.answer]).toBe('6√2');
      expect(sqrtQ1?.explanation).toContain('最簡根式');

      // 802 教室：畢氏定理
      const g8Pyth = getChallengeById('challenge-g8-02');
      expect(g8Pyth).toBeDefined();
      expect(g8Pyth?.grade).toBe(8);
      const pythQ1 = g8Pyth?.questions.find((q) => q.id === 'g8-pyth-01');
      expect(pythQ1?.prompt).toContain('5 與 12');
      expect(pythQ1?.choices[pythQ1.answer]).toBe('13');
      expect(pythQ1?.hint).toContain('畢氏定理');

      // 803 教室：多項式長除法與乘法公式
      const g8Poly = getChallengeById('challenge-g8-03');
      expect(g8Poly).toBeDefined();
      expect(g8Poly?.grade).toBe(8);
      const polyQ1 = g8Poly?.questions.find((q) => q.id === 'g8-poly-01');
      expect(polyQ1?.prompt).toContain('(2x² + 7x + 5) ÷ (2x + 1)');
      expect(polyQ1?.choices[polyQ1.answer]).toContain('商式為 x + 3，餘式為 2');

      const polyQ2 = g8Poly?.questions.find((q) => q.id === 'g8-poly-02');
      expect(polyQ2?.prompt).toContain('(2x - 3)²');
      expect(polyQ2?.choices[polyQ2.answer]).toBe('4x² - 12x + 9');

      // 804 教室：乘法公式與差平方
      const g8Diff = getChallengeById('challenge-g8-04');
      expect(g8Diff).toBeDefined();
      expect(g8Diff?.questions[0].prompt).toContain('103 × 97');
      expect(g8Diff?.questions[0].choices[0]).toContain('9991');

      // 805 教室：一元二次方程式公式解與因式分解
      const g8Quad = getChallengeById('challenge-g8-05');
      expect(g8Quad).toBeDefined();
      expect(g8Quad?.grade).toBe(8);
      const quadQ1 = g8Quad?.questions.find((q) => q.id === 'g8-quad-01');
      expect(quadQ1?.prompt).toContain('x² - 5x + 6 = 0');
      expect(quadQ1?.choices[quadQ1.answer]).toBe('x = 2 或 x = 3');

      const quadQ2 = g8Quad?.questions.find((q) => q.id === 'g8-quad-02');
      expect(quadQ2?.prompt).toContain('x² - 4x + 4 = 0');
      expect(quadQ2?.choices[quadQ2.answer]).toContain('重根');
    });

    it('1.3 九年級教學棟空間化映射：相似形、圓心角與圓周角、二次函數極值、機率與統計抽樣', () => {
      // 906 教室：相似形
      const g9Sim = getChallengeById('challenge-g9-06');
      expect(g9Sim).toBeDefined();
      expect(g9Sim?.grade).toBe(9);
      const simQ1 = g9Sim?.questions.find((q) => q.id === 'g9-sim-01');
      expect(simQ1?.prompt).toContain('2 : 3');
      expect(simQ1?.choices[simQ1.answer]).toBe('4 : 9');
      expect(simQ1?.explanation).toContain('平方比');

      const simQ2 = g9Sim?.questions.find((q) => q.id === 'g9-sim-02');
      expect(simQ2?.prompt).toContain('DE // BC');
      expect(simQ2?.choices[simQ2.answer]).toBe('10');

      // 907 教室：圓心角與圓周角
      const g9Circle = getChallengeById('challenge-g9-07');
      expect(g9Circle).toBeDefined();
      expect(g9Circle?.grade).toBe(9);
      const circleQ1 = g9Circle?.questions.find((q) => q.id === 'g9-geo-01');
      expect(circleQ1?.prompt).toContain('圓內接四邊形');
      expect(circleQ1?.choices[circleQ1.answer]).toContain('互補');

      const circleQ2 = g9Circle?.questions.find((q) => q.id === 'g9-geo-02');
      expect(circleQ2?.prompt).toContain('圓心角為 80°');
      expect(circleQ2?.choices[circleQ2.answer]).toBe('40°');

      // 901 教室：二次函數極值
      const g9Func = getChallengeById('challenge-g9-01');
      expect(g9Func).toBeDefined();
      expect(g9Func?.grade).toBe(9);
      const funcQ1 = g9Func?.questions.find((q) => q.id === 'g9-func-01');
      expect(funcQ1?.prompt).toContain('-2(x - 3)² + 8');
      expect(funcQ1?.choices[funcQ1.answer]).toContain('最大值 8');

      const funcQ2 = g9Func?.questions.find((q) => q.id === 'g9-func-02');
      expect(funcQ2?.prompt).toContain('向右平移 2 單位、再向上平移 5 單位');
      expect(funcQ2?.choices[funcQ2.answer]).toBe('y = (x - 2)² + 5');

      // 902 教室：統計抽樣與四分位數盒狀圖
      const g9Stat = getChallengeById('challenge-g9-02');
      expect(g9Stat).toBeDefined();
      expect(g9Stat?.grade).toBe(9);
      const statQ1 = g9Stat?.questions.find((q) => q.id === 'g9-stat-01');
      expect(statQ1?.prompt).toContain('Q3 = 75');
      expect(statQ1?.choices[statQ1.answer]).toBe('30 分');

      // 903 教室：機率與樣本空間
      const g9Prob = getChallengeById('challenge-g9-03');
      expect(g9Prob).toBeDefined();
      expect(g9Prob?.grade).toBe(9);
      const probQ1 = g9Prob?.questions.find((q) => q.id === 'g9-prob-01');
      expect(probQ1?.prompt).toContain('3 顆紅球與 2 顆綠球');
      expect(probQ1?.choices[probQ1.answer]).toContain('3/5');
    });

    it('1.4 會考最終戰（學生活動中心）：跨單元三年總複習大戰', () => {
      const arena = getChallengeById('challenge-grand-arena');
      expect(arena).toBeDefined();
      expect(arena?.title).toContain('會考最終戰');
      expect(arena?.roomName).toContain('學生活動中心');
      expect(arena?.isEasterEgg).toBe(true);
      expect(arena?.easterEggBadge).toContain('會考數學大宗師');
      expect(arena?.questions.length).toBe(4);

      // Round 1: G7 絕對值與乘方混和運算
      const q1 = arena!.questions[0];
      expect(q1.prompt).toContain('|-8|');
      expect(q1.choices[q1.answer]).toBe('16');
      expect(gradeChoice(q1, q1.answer).correct).toBe(true);

      // Round 2: G8 畢氏定理連續偶數
      const q2 = arena!.questions[1];
      expect(q2.prompt).toContain('連續偶數');
      expect(q2.choices[q2.answer]).toBe('6, 8, 10');
      expect(gradeChoice(q2, q2.answer).correct).toBe(true);

      // Round 3: G9 二次函數武德殿拱門建模
      const q3 = arena!.questions[2];
      expect(q3.prompt).toContain('武德殿');
      expect(q3.choices[q3.answer]).toBe('y = -1/4 x² + 4');
      expect(gradeChoice(q3, q3.answer).correct).toBe(true);

      // Round 4: 會考生活情境大溪老街豆干促銷
      const q4 = arena!.questions[3];
      expect(q4.prompt).toContain('大溪老街豆干');
      expect(q4.choices[q4.answer]).toBe('100 元');
      expect(gradeChoice(q4, q4.answer).correct).toBe(true);
    });

    it('1.5 題庫品質保證：所有題目皆具備引導、提示、解析與迷思概念說明', () => {
      const allChallenges = Object.values(CLASSROOM_CHALLENGES);
      expect(allChallenges.length).toBeGreaterThanOrEqual(15);

      allChallenges.forEach((challenge) => {
        expect(challenge.title).toBeTruthy();
        expect(challenge.roomName).toBeTruthy();
        expect(challenge.conceptTitle).toBeTruthy();

        challenge.questions.forEach((q) => {
          expect(q.prompt.length).toBeGreaterThan(5);
          expect(q.choices.length).toBeGreaterThanOrEqual(2);
          expect(q.answer).toBeGreaterThanOrEqual(0);
          expect(q.answer).toBeLessThan(q.choices.length);
          expect(q.hint).toBeTruthy();
          expect(q.hint.length).toBeGreaterThan(3);
          expect(q.explanation).toBeTruthy();
          expect(q.explanation.length).toBeGreaterThan(5);
        });
      });
    });
  });

  // ==========================================
  // 2. 趣味彩蛋題庫與成就系統
  // ==========================================
  describe('2. 趣味彩蛋題庫與成就系統', () => {
    it('2.1 幼兒園彩蛋：國小九九乘法表 (7x8, 9x9 等) 與國小基礎加法 (8+7 湊十法、28+15)', () => {
      const easter99 = getChallengeById('challenge-multiplication-easter');
      expect(easter99).toBeDefined();
      expect(easter99?.easterEggBadge).toContain('九九乘法大師');

      // 7x8 = 56
      const q7x8 = easter99?.questions.find((q) => q.prompt.includes('7 × 8'));
      expect(q7x8).toBeDefined();
      expect(q7x8?.choices[q7x8.answer]).toBe('56');

      // 9x9 = 81
      const q9x9 = easter99?.questions.find((q) => q.prompt.includes('9 × 9'));
      expect(q9x9).toBeDefined();
      expect(q9x9?.choices[q9x9.answer]).toBe('81');

      // 幼兒園小積木加法彩蛋
      const blocksAdd = getChallengeById('easter-egg-kindergarten-blocks');
      expect(blocksAdd).toBeDefined();
      expect(blocksAdd?.easterEggBadge).toContain('速算小神童');

      // 8 + 7 湊十法
      const q8plus7 = blocksAdd?.questions.find((q) => q.prompt.includes('8 + 7'));
      expect(q8plus7).toBeDefined();
      expect(q8plus7?.choices[q8plus7.answer]).toBe('15');
      expect(q8plus7?.hint).toContain('湊');

      // 28 + 15
      const q28plus15 = blocksAdd?.questions.find((q) => q.prompt.includes('28 + 15'));
      expect(q28plus15).toBeDefined();
      expect(q28plus15?.choices[q28plus15.answer]).toBe('43');
    });

    it('2.2 706 教室質數判別：包含 51, 91, 87 等典型迷思合數之質數判別題，及「2 是唯一偶數質數」觀念題', () => {
      const primeHunter = getChallengeById('challenge-prime-hunter');
      expect(primeHunter).toBeDefined();
      expect(primeHunter?.roomName).toContain('706');
      expect(primeHunter?.easterEggBadge).toContain('質數獵人');

      // 91 = 7 x 13 迷思合數
      const q91 = primeHunter?.questions.find((q) => q.id === 'prime-01');
      expect(q91).toBeDefined();
      expect(q91?.choices[q91.answer]).toBe('91');
      expect(q91?.explanation).toContain('91 = 7 × 13');

      // 51 = 3 x 17 迷思合數 (5+1=6)
      const q51 = primeHunter?.questions.find((q) => q.id === 'prime-02');
      expect(q51).toBeDefined();
      expect(q51?.choices[q51.answer]).toContain('51 = 3 × 17');
      expect(q51?.explanation).toContain('3 的倍數');

      // 2 是唯一偶數質數之觀念題
      const qEvenPrime = primeHunter?.questions.find((q) => q.id === 'prime-03');
      expect(qEvenPrime).toBeDefined();
      expect(qEvenPrime?.choices[qEvenPrime.answer]).toContain('2 是最小的質數，也是唯一的偶數質數');

      // 包含 87, 51, 9 等迷思組合題
      const q87 = primeHunter?.questions.find((q) => q.id === 'prime-04');
      expect(q87).toBeDefined();
      expect(q87?.explanation).toContain('87=3×29');
    });

    it('2.3 合作社找零與健康中心彩蛋', () => {
      // 合作社找零生活速算
      const coop = getChallengeById('challenge-coop-speed-math');
      expect(coop).toBeDefined();
      expect(coop?.roomName).toContain('員生合作社');
      expect(coop?.easterEggBadge).toContain('合作社速算之王');

      const coopChange = coop?.questions.find((q) => q.id === 'coop-01');
      expect(coopChange).toBeDefined();
      expect(coopChange?.prompt).toContain('100 元鈔票');
      expect(coopChange?.choices[coopChange.answer]).toBe('37 元');

      // 健康中心體適能與心率加總
      const health = getChallengeById('easter-egg-health-addition');
      expect(health).toBeDefined();
      expect(health?.roomName).toContain('健康中心');
      expect(health?.easterEggBadge).toContain('心算達人');

      const healthQ1 = health?.questions.find((q) => q.id === 'health-add-01');
      expect(healthQ1?.prompt).toContain('72 下與 128 下');
      expect(healthQ1?.choices[healthQ1.answer]).toBe('200');
    });
  });

  // ==========================================
  // 3. 競賽隱私與資安合規（針對桃園市 AI 好幫手競賽）
  // ==========================================
  describe('3. 競賽隱私與資安合規性 (Privacy & Offline Integrity)', () => {
    it('3.1 零真實學生個人資料洩漏 (0 學生姓名、學號、座號、個資)', () => {
      // 檢查教師清冊皆為領域師資清冊，無任何學生資料
      expect(MATH_TEACHERS.length).toBe(11);
      MATH_TEACHERS.forEach((t) => {
        expect(t.domain).toBe('數學');
        expect(t.name).not.toMatch(/\d{5,}/); // 無學號
      });

      // 檢查程式碼中完全沒有學生學號座號個資
      const srcDir = path.resolve(__dirname, '..');
      const files = fs.readdirSync(srcDir, { recursive: true }) as string[];
      const codeFiles = files.filter(
        (f) =>
          (f.endsWith('.ts') || f.endsWith('.tsx')) &&
          !f.includes('node_modules') &&
          !f.includes('.test.')
      );

      for (const file of codeFiles) {
        const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
        // 確保無學號形式的個資字串 (如 9碼學號、座號個資表)
        expect(content).not.toMatch(/studentId:\s*['"]\d+['"]/i);
        expect(content).not.toMatch(/學生學號/);
      }
    });

    it('3.2 零未授權 API Key 洩漏 (0 API Keys, 0 Secret tokens)', () => {
      const srcDir = path.resolve(__dirname, '..');
      const files = fs.readdirSync(srcDir, { recursive: true }) as string[];
      const codeFiles = files.filter(
        (f) =>
          (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.html') || f.endsWith('.json')) &&
          !f.includes('node_modules')
      );

      for (const file of codeFiles) {
        const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
        expect(content).not.toMatch(/sk-[a-zA-Z0-9]{20,}/);
        expect(content).not.toMatch(/AIza[0-9A-Za-z-_]{35}/);
        expect(content).not.toMatch(/Bearer\s+[a-zA-Z0-9\._-]{20,}/);
      }
    });

    it('3.3 純前端離線運行能力 (0 外部 CDN 斷鏈依賴)', () => {
      const rootDir = path.resolve(__dirname, '../..');
      const indexHtmlPath = path.join(rootDir, 'index.html');
      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      // index.html 不含任何外部 cdn 連結
      expect(indexHtml).not.toContain('cdn.');
      expect(indexHtml).not.toContain('cdnjs.cloudflare.com');
      expect(indexHtml).not.toContain('unpkg.com');
      expect(indexHtml).not.toContain('fonts.googleapis.com');

      // styles.css 不含任何 @import 外部字體或資源
      const stylesCssPath = path.join(rootDir, 'src/styles.css');
      const stylesCss = fs.readFileSync(stylesCssPath, 'utf-8');
      expect(stylesCss).not.toContain('@import url(http');
    });
  });
});

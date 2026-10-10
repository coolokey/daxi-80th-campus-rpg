import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  TEACHERS,
  MATH_TEACHERS,
  DOMAIN_CONVENERS,
  getTeacherById,
  getTeacherBySubject,
  getAllTeachers,
  getMathTeachers,
  getDomainConveners,
  getTeacherExpression,
} from './teachers';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

describe('Teacher Database and Asset Verification', () => {
  describe('Six Core Domain Conveners (美術規格書 Table 5)', () => {
    it('contains all 6 domain conveners with correct domains and classes', () => {
      const conveners = getDomainConveners();
      expect(conveners).toHaveLength(6);

      const math = conveners.find((c) => c.subject === 'math');
      expect(math).toBeDefined();
      expect(math?.name).toBe('蔡之民');
      expect(math?.rpgClass).toContain('數字研究員');

      const tech = conveners.find((c) => c.subject === 'tech');
      expect(tech).toBeDefined();
      expect(tech?.name).toBe('陳毅宏');
      expect(tech?.rpgClass).toBe('數位工程師');

      const science = conveners.find((c) => c.subject === 'science');
      expect(science).toBeDefined();
      expect(science?.name).toBe('張致信');
      expect(science?.rpgClass).toBe('元素研究員');

      const chinese = conveners.find((c) => c.subject === 'chinese');
      expect(chinese).toBeDefined();
      expect(chinese?.name).toBe('文明慧');
      expect(chinese?.rpgClass).toBe('文字典藏師');

      const english = conveners.find((c) => c.subject === 'english');
      expect(english).toBeDefined();
      expect(english?.name).toBe('李昱瑩');
      expect(english?.rpgClass).toBe('語言導航員');

      const social = conveners.find((c) => c.subject === 'social');
      expect(social).toBeDefined();
      expect(social?.name).toBe('黃瓘婷');
      expect(social?.rpgClass).toBe('時空檔案員');
    });

    it('verifies all 6 convener image files physically exist on disk', () => {
      for (const convener of DOMAIN_CONVENERS) {
        // Full body
        const fullDiskPath = path.join(PUBLIC_DIR, convener.sprite);
        expect(fs.existsSync(fullDiskPath), `Full sprite missing: ${convener.sprite}`).toBe(true);

        // Portrait
        const portraitDiskPath = path.join(PUBLIC_DIR, convener.portrait);
        expect(fs.existsSync(portraitDiskPath), `Portrait missing: ${convener.portrait}`).toBe(true);

        // Icon
        const iconDiskPath = path.join(PUBLIC_DIR, convener.icon);
        expect(fs.existsSync(iconDiskPath), `Icon missing: ${convener.icon}`).toBe(true);

        // 6 Expressions
        const expressionKeys = ['normal', 'smile', 'thinking', 'surprised', 'serious', 'encourage'] as const;
        for (const exp of expressionKeys) {
          const expPath = convener.expressions[exp];
          const expDiskPath = path.join(PUBLIC_DIR, expPath);
          expect(fs.existsSync(expDiskPath), `Expression ${exp} missing: ${expPath}`).toBe(true);
        }
      }
    });
  });

  describe('Full 11 Math Teachers Team (大溪國中 115-1 領域教師清冊)', () => {
    const EXPECTED_MATH_TEACHERS = [
      '蔡之民',
      '游家興',
      '張秀萍',
      '張雅琪',
      '陳小鈴',
      '游貿仁',
      '方廷榕',
      '康嘉玲',
      '潘建銘',
      '徐君萍',
      '何昶毅',
    ];

    it('contains exactly 11 math teachers in MATH_TEACHERS', () => {
      const mathTeam = getMathTeachers();
      expect(mathTeam).toHaveLength(11);

      const names = mathTeam.map((t) => t.name);
      for (const expected of EXPECTED_MATH_TEACHERS) {
        expect(names).toContain(expected);
      }
    });

    it('ensures all math teachers have subject math, theme color, badge, and dialogue', () => {
      for (const teacher of MATH_TEACHERS) {
        expect(teacher.subject).toBe('math');
        expect(teacher.domain).toBe('數學');
        expect(teacher.themeColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(teacher.badge).toBeTruthy();
        expect(teacher.introDialogue.length).toBeGreaterThan(10);
        expect(teacher.dialogues.greeting.length).toBeGreaterThan(5);
        expect(teacher.dialogues.questOffer.length).toBeGreaterThan(5);
        expect(teacher.dialogues.questComplete.length).toBeGreaterThan(5);
      }
    });

    it('verifies all 11 math teachers have full, portrait, and icon files on disk', () => {
      for (const teacher of MATH_TEACHERS) {
        const fullDiskPath = path.join(PUBLIC_DIR, teacher.sprite);
        expect(fs.existsSync(fullDiskPath), `Math sprite missing: ${teacher.sprite}`).toBe(true);

        const portraitDiskPath = path.join(PUBLIC_DIR, teacher.portrait);
        expect(fs.existsSync(portraitDiskPath), `Math portrait missing: ${teacher.portrait}`).toBe(true);

        const iconDiskPath = path.join(PUBLIC_DIR, teacher.icon);
        expect(fs.existsSync(iconDiskPath), `Math icon missing: ${teacher.icon}`).toBe(true);
      }
    });
  });

  describe('Query Helper Functions', () => {
    it('getTeacherById returns correct teacher or undefined', () => {
      expect(getTeacherById('teacher-001')?.name).toBe('蔡之民');
      expect(getTeacherById('teacher-math-001')?.name).toBe('蔡之民');
      expect(getTeacherById('teacher-math-007')?.name).toBe('方廷榕');
      expect(getTeacherById('teacher-999')).toBeUndefined();
    });

    it('getTeacherBySubject returns subject convener', () => {
      expect(getTeacherBySubject('math')?.name).toBe('蔡之民');
      expect(getTeacherBySubject('tech')?.name).toBe('陳毅宏');
      expect(getTeacherBySubject('science')?.name).toBe('張致信');
      expect(getTeacherBySubject('chinese')?.name).toBe('文明慧');
      expect(getTeacherBySubject('english')?.name).toBe('李昱瑩');
      expect(getTeacherBySubject('social')?.name).toBe('黃瓘婷');
    });

    it('getAllTeachers returns combined list without duplicates', () => {
      const all = getAllTeachers();
      const ids = all.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
      // 6 conveners + 10 other math teachers = 16 teachers total
      expect(all).toHaveLength(16);
    });

    it('getTeacherExpression returns correct expression asset path', () => {
      const normal = getTeacherExpression('teacher-001', 'normal');
      expect(normal).toBe('/assets/teachers/teacher-001-expression-normal.png');

      const smile = getTeacherExpression('teacher-001', 'smile');
      expect(smile).toBe('/assets/teachers/teacher-001-expression-smile.png');

      const fallback = getTeacherExpression('teacher-999', 'normal');
      expect(fallback).toBe('');
    });
  });
});

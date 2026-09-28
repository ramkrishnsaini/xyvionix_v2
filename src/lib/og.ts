/**
 * Build-time Open Graph images, 1200 x 630, drawn from the frozen visual
 * system: obsidian or off-white surface, thin rules, mono labels, the
 * threshold line and a monochrome state mark. No stock imagery, no gradients,
 * no metrics.
 */

import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { AssuranceState } from '../data/assurances.ts';

export interface OgInput {
  /** Mono label above the title, for example "AI ASSURANCE" or "USE CASE". */
  label: string;
  title: string;
  /** Supporting line under the title. */
  line?: string;
  state?: AssuranceState;
  surface?: 'obsidian' | 'offwhite';
}

const WIDTH = 1200;
const HEIGHT = 630;

const palettes = {
  obsidian: { bg: '#0C0C0B', tx: '#F5F4F1', mut: '#A8A7A0', fnt: '#8A8982', gst: '#4A4944', ln: 'rgba(245,244,241,0.14)' },
  offwhite: { bg: '#FAFAF8', tx: '#171715', mut: '#55544D', fnt: '#6B6A63', gst: '#CFCEC6', ln: 'rgba(23,23,21,0.18)' },
} as const;

type Palette = (typeof palettes)[keyof typeof palettes];
type Node = { type: string; props: Record<string, unknown> };

/** Element factory. Satori requires an explicit display on every div, so flex is the default. */
const h = (type: string, props: Record<string, unknown>, ...children: unknown[]): Node => {
  const style = type === 'div' ? { display: 'flex', ...((props.style as object | undefined) ?? {}) } : props.style;
  return {
    type,
    props: { ...props, ...(style ? { style } : {}), children: children.length === 1 ? children[0] : children },
  };
};

const fontFile = (pkg: string, file: string) =>
  fs.readFileSync(path.join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));

let fontCache: { name: string; data: Buffer; weight: 400 | 500 | 600; style: 'normal' }[] | undefined;

function fonts() {
  fontCache ??= [
    { name: 'Instrument Sans', data: fontFile('instrument-sans', 'instrument-sans-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Instrument Sans', data: fontFile('instrument-sans', 'instrument-sans-latin-600-normal.woff'), weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: fontFile('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: fontFile('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'), weight: 500, style: 'normal' },
  ];
  return fontCache;
}

const stateLabels: Record<AssuranceState, string> = {
  assured: 'ASSURED',
  degrading: 'DEGRADING',
  risk: 'AT RISK',
  unassured: 'UNASSURED',
};

/** State mark as SVG so stripes and dashes render identically everywhere. */
function stateMark(state: AssuranceState, p: Palette, size = 26): Node {
  const s = size;
  const common = { width: s, height: s, viewBox: `0 0 ${s} ${s}` };
  if (state === 'assured') return h('svg', common, h('rect', { x: 0, y: 0, width: s, height: s, fill: p.tx }));
  if (state === 'risk') {
    return h('svg', common, h('rect', { x: 1.5, y: 1.5, width: s - 3, height: s - 3, fill: 'none', stroke: p.tx, 'stroke-width': 3 }));
  }
  if (state === 'unassured') {
    return h(
      'svg',
      common,
      h('rect', { x: 1, y: 1, width: s - 2, height: s - 2, fill: 'none', stroke: p.fnt, 'stroke-width': 2, 'stroke-dasharray': '5 4' }),
    );
  }
  const stripes: Node[] = [];
  for (let i = -s; i < s * 2; i += 8) {
    stripes.push(h('line', { x1: i, y1: s, x2: i + s, y2: 0, stroke: p.tx, 'stroke-width': 3.5 }));
  }
  return h(
    'svg',
    common,
    ...stripes,
    h('rect', { x: 0.75, y: 0.75, width: s - 1.5, height: s - 1.5, fill: 'none', stroke: p.gst, 'stroke-width': 1.5 }),
  );
}

function logoMark(p: Palette): Node {
  return h(
    'svg',
    { width: 40, height: 40, viewBox: '0 0 24 24' },
    h('line', { x1: 0, y1: 12, x2: 24, y2: 12, stroke: p.fnt, 'stroke-width': 1.2, 'stroke-dasharray': '2.5 2.5' }),
    h('path', { d: 'M0 20 L6 18 L10 15 L14 9 L18 6 L24 4', stroke: p.tx, 'stroke-width': 1.8, fill: 'none' }),
    h('rect', { x: 9, y: 9, width: 6, height: 6, fill: p.tx }),
  );
}

/** Threshold line with a trace crossing it, the recurring evidence motif. */
function thresholdRule(p: Palette): Node {
  const w = WIDTH - 144;
  return h(
    'svg',
    { width: w, height: 46, viewBox: `0 0 ${w} 46` },
    h('line', { x1: 0, y1: 30, x2: w, y2: 30, stroke: p.fnt, 'stroke-width': 1.5, 'stroke-dasharray': '4 6' }),
    h('path', {
      d: `M0 16 C ${w * 0.15} 10, ${w * 0.28} 14, ${w * 0.4} 22 S ${w * 0.55} 40, ${w * 0.66} 24 S ${w * 0.86} 10, ${w} 8`,
      stroke: p.tx,
      'stroke-width': 2.2,
      fill: 'none',
    }),
    h('rect', { x: w * 0.2 - 5, y: 7, width: 10, height: 10, fill: p.tx }),
    h('rect', { x: w * 0.86 - 5, y: 5, width: 10, height: 10, fill: p.tx }),
    h('rect', { x: w * 0.53 - 6, y: 28, width: 12, height: 12, fill: p.bg, stroke: p.tx, 'stroke-width': 2.2 }),
  );
}

function titleSize(title: string): number {
  const n = title.length;
  if (n <= 26) return 84;
  if (n <= 40) return 72;
  if (n <= 58) return 62;
  if (n <= 80) return 52;
  return 45;
}

function template(input: OgInput): Node {
  const p = palettes[input.surface ?? 'obsidian'];
  const state = input.state ?? 'assured';

  return h(
    'div',
    {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px 56px',
        backgroundColor: p.bg,
        color: p.tx,
        fontFamily: 'Instrument Sans',
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 18 } },
        logoMark(p),
        h('div', { style: { fontSize: 34, fontWeight: 600, letterSpacing: -1.2 } }, 'Xyvionix'),
      ),
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        h('div', { style: { fontFamily: 'JetBrains Mono', fontSize: 19, letterSpacing: 2.6, color: p.mut } }, stateLabels[state]),
        stateMark(state, p),
      ),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'JetBrains Mono', fontSize: 21, letterSpacing: 3, color: p.fnt } },
        h('div', { style: { width: 40, height: 0, borderTop: `2px dashed ${p.gst}` } }),
        h('div', {}, input.label.toUpperCase()),
      ),
      h(
        'div',
        {
          style: {
            marginTop: 26,
            fontSize: titleSize(input.title),
            fontWeight: 600,
            letterSpacing: -2.4,
            lineHeight: 1.06,
            maxWidth: 1010,
          },
        },
        input.title,
      ),
      input.line
        ? h('div', { style: { marginTop: 24, fontSize: 31, lineHeight: 1.35, color: p.mut, maxWidth: 960 } }, input.line)
        : h('div', { style: { display: 'flex' } }),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
      thresholdRule(p),
      h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'JetBrains Mono',
            fontSize: 17,
            letterSpacing: 2.4,
            color: p.fnt,
          },
        },
        h('div', {}, 'CONTINUOUS TECHNOLOGY ASSURANCE'),
        h('div', {}, 'EVIDENCE · THRESHOLD · STATE'),
      ),
    ),
  );
}

export async function renderOgPng(input: OgInput): Promise<Uint8Array> {
  const svg = await satori(template(input) as never, { width: WIDTH, height: HEIGHT, fonts: fonts() });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
  return new Uint8Array(png);
}


export const colors = {
  // Background & canvas
  background:       '#fbf9f3',
  canvas:           '#faf8f2',
  onBackground:     '#1b1c19',

  // Surface scale
  surfaceDim:       '#dcdad4',
  surfaceBright:    '#fbf9f3',
  surfaceLowest:    '#ffffff',
  surfaceLow:       '#f5f3ee',
  surface:          '#f0eee8',
  surfaceHigh:      '#eae8e2',
  surfaceHighest:   '#e4e2dd',
  surfaceVariant:   '#e4e2dd',
  surfaceTint:      '#3c6a00',

  onSurface:        '#1b1c19',
  onSurfaceVariant: '#424939',
  inverseSurface:   '#30312d',
  inverseOnSurface: '#f2f1eb',

  // Outline
  outline:          '#737a68',
  outlineVariant:   '#c2c9b5',

  // Primary — Grass Green
  primary:                '#3c6a00',
  onPrimary:              '#ffffff',
  primaryContainer:       '#7cb342',
  onPrimaryContainer:     '#234100',
  inversePrimary:         '#9dd761',
  primaryFixed:           '#b8f47a',
  primaryFixedDim:        '#9dd761',
  onPrimaryFixed:         '#0e2000',
  onPrimaryFixedVariant:  '#2c5000',

  // Secondary — Sky Blue
  secondary:               '#006688',
  onSecondary:             '#ffffff',
  secondaryContainer:      '#58cafe',
  onSecondaryContainer:    '#005370',
  secondaryFixed:          '#c2e8ff',
  secondaryFixedDim:       '#75d1ff',
  onSecondaryFixed:        '#001e2b',
  onSecondaryFixedVariant: '#004d67',

  // Tertiary — Soft Pink
  tertiary:               '#964261',
  onTertiary:             '#ffffff',
  tertiaryContainer:      '#e885a7',
  onTertiaryContainer:    '#681d3c',
  tertiaryFixed:          '#ffd9e2',
  tertiaryFixedDim:       '#ffb0c9',
  onTertiaryFixed:        '#3e001e',
  onTertiaryFixedVariant: '#792b4a',

  // Error
  error:            '#ba1a1a',
  onError:          '#ffffff',
  errorContainer:   '#ffdad6',
  onErrorContainer: '#93000a',

  // Component shorthands
  card:          '#ffffff',
  cardTinted:    '#fdfbf7',
  inputBorder:   '#d1ccc0',

  // Named accents (semantic aliases)
  grass:  '#7cb342',
  sky:    '#4fc3f7',
  petal:  '#f48fb1',
  ink:    '#2b2b2b',
  inkDeep:'#212635',
} as const

export type ColorKey = keyof typeof colors
export type ColorValue = (typeof colors)[ColorKey]

// ─── Typography ──────────────────────────────────────────────────────────────

export const fontFamily = {
  sans: 'Quicksand',
  mono: 'JetBrains Mono',
} as const

export const fontSize = {
  headlineXl:         32,
  headlineLg:         24,
  headlineLgMobile:   20,
  titleMd:            18,
  bodyLg:             16,
  bodyMd:             14,
  labelMd:            12,
  price:              20,
} as const

export const lineHeight = {
  headlineXl:         40,
  headlineLg:         32,
  headlineLgMobile:   28,
  titleMd:            24,
  bodyLg:             24,
  bodyMd:             20,
  labelMd:            16,
  price:              24,
} as const

export const fontWeight = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
} as const

export const letterSpacing = {
  headlineXl: -0.02,   // em — multiply by fontSize for RN
  headlineLg: -0.01,
  labelMd:     0.05,
  default:     0,
} as const

/** Pre-composed text style objects — drop straight into StyleSheet */
export const textStyles = {
  headlineXl: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.headlineXl,
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.headlineXl,
    letterSpacing: letterSpacing.headlineXl * fontSize.headlineXl,
  },
  headlineLg: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.headlineLg,
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.headlineLg,
    letterSpacing: letterSpacing.headlineLg * fontSize.headlineLg,
  },
  headlineLgMobile: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.headlineLgMobile,
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.headlineLgMobile,
  },
  titleMd: {
    fontFamily:  fontFamily.sans,
    fontSize:    fontSize.titleMd,
    fontWeight:  fontWeight.semibold,
    lineHeight:  lineHeight.titleMd,
  },
  bodyLg: {
    fontFamily:  fontFamily.sans,
    fontSize:    fontSize.bodyLg,
    fontWeight:  fontWeight.regular,
    lineHeight:  lineHeight.bodyLg,
  },
  bodyMd: {
    fontFamily:  fontFamily.sans,
    fontSize:    fontSize.bodyMd,
    fontWeight:  fontWeight.regular,
    lineHeight:  lineHeight.bodyMd,
  },
  labelMd: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.labelMd,
    fontWeight:    fontWeight.medium,
    lineHeight:    lineHeight.labelMd,
    letterSpacing: letterSpacing.labelMd * fontSize.labelMd,
  },
  price: {
    fontFamily:  fontFamily.mono,
    fontSize:    fontSize.price,
    fontWeight:  fontWeight.bold,
    lineHeight:  lineHeight.price,
  },
} as const

// ─── Spacing (8pt grid) ───────────────────────────────────────────────────────

export const spacing = {
  base:          8,
  xs:            4,
  sm:            8,
  md:            16,
  lg:            24,
  xl:            32,
  gutter:        16,
  marginMobile:  16,
  marginDesktop: 24,
} as const

export type SpacingKey = keyof typeof spacing

// ─── Border Radius ───────────────────────────────────────────────────────────

export const radius = {
  sm:        4,    // 0.25rem
  default:   8,    // 0.5rem
  md:        12,   // 0.75rem
  lg:        16,   // 1rem
  xl:        24,   // 1.5rem
  full:      9999,
  component: 15,   // Ghibli pillowy default for cards, buttons, inputs
} as const

export type RadiusKey = keyof typeof radius

// ─── Elevation / Shadows ─────────────────────────────────────────────────────
// React Native shadow props (iOS) + elevation (Android) bundled together.
// For web / NativeWind pass the `boxShadow` string directly.

export const shadow = {
  none: {
    boxShadow:         'none',
    shadowColor:       'transparent',
    shadowOffset:      { width: 0, height: 0 },
    shadowOpacity:     0,
    shadowRadius:      0,
    elevation:         0,
  },
  level1: {
    boxShadow:         '0 4px 15px rgba(0,0,0,0.10)',
    shadowColor:       '#000000',
    shadowOffset:      { width: 0, height: 4 },
    shadowOpacity:     0.10,
    shadowRadius:      7.5,
    elevation:         3,
  },
  level2: {
    boxShadow:         '0 8px 25px rgba(0,0,0,0.15)',
    shadowColor:       '#000000',
    shadowOffset:      { width: 0, height: 8 },
    shadowOpacity:     0.15,
    shadowRadius:      12.5,
    elevation:         6,
  },
  lift: {
    // Hover / active lifted state
    boxShadow:         '0 8px 25px rgba(0,0,0,0.15)',
    shadowColor:       '#000000',
    shadowOffset:      { width: 0, height: 8 },
    shadowOpacity:     0.15,
    shadowRadius:      12.5,
    elevation:         8,
  },
  press: {
    // Tactile press feedback
    boxShadow:         '0 2px 8px rgba(0,0,0,0.08)',
    shadowColor:       '#000000',
    shadowOffset:      { width: 0, height: 2 },
    shadowOpacity:     0.08,
    shadowRadius:      4,
    elevation:         1,
  },
  inset: {
    // Sunken input style (web only)
    boxShadow:         'inset 0 2px 6px rgba(0,0,0,0.06)',
  },
  focusPrimary: {
    // Grass green focus ring (web only)
    boxShadow:         '0 0 0 3px rgba(60,106,0,0.30)',
  },
  focusSecondary: {
    // Sky blue focus ring (web only)
    boxShadow:         '0 0 0 3px rgba(0,102,136,0.28)',
  },
  focusError: {
    boxShadow:         '0 0 0 3px rgba(186,26,26,0.28)',
  },
} as const

export type ShadowKey = keyof typeof shadow

// ─── Motion ──────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    fast:     200,   // ms — hover, color shift
    standard: 300,   // ms — shadow transitions
    entry:    420,   // ms — fade + translate-Y entry
    stagger:   80,   // ms — delay between list items
    page:     200,   // ms — page fade
  },
  easing: {
    // CSS strings
    organic:  'cubic-bezier(0.0, 0.0, 0.2, 1)',  // ease-out
    standard: 'ease-out',
    linear:   'linear',
  },
  // Reanimated withTiming config shortcuts
  withTiming: {
    fast:     { duration: 200 },
    standard: { duration: 300 },
    entry:    { duration: 420 },
  },
} as const

// ─── Layout ──────────────────────────────────────────────────────────────────

export const layout = {
  maxWidthContent: 1280,       // px
  minTouchTarget:  44,         // px — WCAG 2.5.5
  breakpoints: {
    mobile:  0,
    tablet:  768,
    desktop: 1024,
    wide:    1280,
  },
  grid: {
    columns:       12,
    gutterMobile:  spacing.gutter,
    gutterDesktop: spacing.marginDesktop,
  },
} as const

// ─── Re-export everything as a single object (optional convenience) ───────────

const theme = {
  colors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  textStyles,
  spacing,
  radius,
  shadow,
  motion,
  layout,
} as const

export default theme
export const designTokens = {
  colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    surface: "var(--surface)",
    surfaceElevated: "var(--surface-elevated)",
    surfaceGlass: "var(--surface-glass)",
    borderSubtle: "var(--border-subtle)",
    borderStrong: "var(--border-strong)",
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    muted: "var(--muted)",
    mutedForeground: "var(--muted-foreground)",
  },

  gradients: {
    hero: "var(--gradient-hero)",
    card: "var(--gradient-card)",
    primary: "var(--gradient-primary)",
  },

  radius: {
    card: "var(--radius-card)",
    button: "var(--radius-button)",
  },

  shadows: {
    aetheric: "var(--shadow-aetheric)",
    cyan: "var(--shadow-cyan)",
  },
} as const;

export type DesignTokens = typeof designTokens;
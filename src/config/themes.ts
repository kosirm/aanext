export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
}

export interface ThemeInfo {
  id: string;
  name: string;
  description: string;
  lightColors: ThemeColors;
  darkColors: ThemeColors;
}

export const themes: ThemeInfo[] = [
  {
    id: 'default',
    name: 'Zadana',
    description: 'Čista i profesionalna tema',
    lightColors: {
      primary: '#1976d2',
      secondary: '#26a69a',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#212121',
    },
    darkColors: {
      primary: '#42a5f5',
      secondary: '#4db6ac',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Smirujuće plave nijanse',
    lightColors: {
      primary: '#0277bd',
      secondary: '#00acc1',
      background: '#f0f8ff',
      surface: '#e1f5fe',
      text: '#01579b',
    },
    darkColors: {
      primary: '#4fc3f7',
      secondary: '#26c6da',
      background: '#0a1929',
      surface: '#1a2332',
      text: '#e3f2fd',
    },
  },
  {
    id: 'forest',
    name: 'Šuma',
    description: 'Prirodne zelene boje',
    lightColors: {
      primary: '#2e7d32',
      secondary: '#558b2f',
      background: '#f1f8e9',
      surface: '#dcedc8',
      text: '#1b5e20',
    },
    darkColors: {
      primary: '#66bb6a',
      secondary: '#9ccc65',
      background: '#0d1f0d',
      surface: '#1a2e1a',
      text: '#e8f5e9',
    },
  },
  {
    id: 'sunset',
    name: 'Zalazak sunca',
    description: 'Topli narančasti tonovi',
    lightColors: {
      primary: '#e64a19',
      secondary: '#f57c00',
      background: '#fff3e0',
      surface: '#ffe0b2',
      text: '#bf360c',
    },
    darkColors: {
      primary: '#ff7043',
      secondary: '#ffb74d',
      background: '#1a0f0a',
      surface: '#2a1a14',
      text: '#fff3e0',
    },
  },
  {
    id: 'lavender',
    name: 'Lavanda',
    description: 'Nježne ljubičaste nijanse',
    lightColors: {
      primary: '#7b1fa2',
      secondary: '#8e24aa',
      background: '#f3e5f5',
      surface: '#e1bee7',
      text: '#4a148c',
    },
    darkColors: {
      primary: '#ba68c8',
      secondary: '#ce93d8',
      background: '#1a0f1f',
      surface: '#2a1a2f',
      text: '#f3e5f5',
    },
  },
  {
    id: 'earth',
    name: 'Zemlja',
    description: 'Prirodni smeđi tonovi',
    lightColors: {
      primary: '#5d4037',
      secondary: '#6d4c41',
      background: '#efebe9',
      surface: '#d7ccc8',
      text: '#3e2723',
    },
    darkColors: {
      primary: '#a1887f',
      secondary: '#bcaaa4',
      background: '#1a1614',
      surface: '#2a2420',
      text: '#efebe9',
    },
  },
];


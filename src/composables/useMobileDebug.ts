import { ref, onMounted, onUnmounted } from 'vue';

export interface DebugLog {
  timestamp: string;
  level: 'log' | 'warn' | 'error' | 'info';
  message: string;
  args: string;
}

/**
 * Composable for capturing console logs on mobile for debugging
 */
export const useMobileDebug = () => {
  const logs = ref<DebugLog[]>([]);
  const isDebugOpen = ref(false);
  const maxLogs = 100; // Keep only last 100 logs

  // Store original console methods
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  const addLog = (level: DebugLog['level'], args: unknown[]) => {
    const timestamp = new Date().toLocaleTimeString();
    const message = args
      .map((arg: unknown) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        // For objects
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return '[Object]';
        }
      })
      .join(' ');

    logs.value.push({
      timestamp,
      level,
      message,
      args: JSON.stringify(args),
    });

    // Keep only last maxLogs
    if (logs.value.length > maxLogs) {
      logs.value.shift();
    }
  };

  const setupConsoleCapture = () => {
    console.log = (...args: unknown[]) => {
      originalLog(...args);
      addLog('log', args);
    };

    console.warn = (...args: unknown[]) => {
      originalWarn(...args);
      addLog('warn', args);
    };

    console.error = (...args: unknown[]) => {
      originalError(...args);
      addLog('error', args);
    };

    console.info = (...args: unknown[]) => {
      originalInfo(...args);
      addLog('info', args);
    };
  };

  const restoreConsole = () => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    console.info = originalInfo;
  };

  const clearLogs = () => {
    logs.value = [];
  };

  const getLogs = (): string => {
    return logs.value
      .map((log) => `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`)
      .join('\n');
  };

  const shareLogs = async () => {
    const logsText = getLogs();
    const deviceInfo = `
Device Info:
- User Agent: ${navigator.userAgent}
- Screen: ${window.innerWidth}x${window.innerHeight}
- Viewport: ${window.innerWidth}x${window.innerHeight}
- Scroll: ${window.scrollX}, ${window.scrollY}

Logs:
${logsText}
    `.trim();

    try {
      // Try native share API first
      if (navigator.share) {
        await navigator.share({
          title: 'AA Hrvatska Debug Logs',
          text: logsText,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(deviceInfo);
        console.log('Debug logs copied to clipboard');
      }
    } catch (error) {
      console.error('Failed to share logs:', error);
    }
  };

  onMounted(() => {
    setupConsoleCapture();
  });

  onUnmounted(() => {
    restoreConsole();
  });

  return {
    logs,
    isDebugOpen,
    clearLogs,
    getLogs,
    shareLogs,
  };
};


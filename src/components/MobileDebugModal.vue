<template>
  <div v-if="isDebugOpen" class="mobile-debug-modal">
    <!-- Debug Toggle Button (always visible) -->
    <q-btn
      v-if="!isDebugOpen"
      fab
      icon="bug_report"
      color="warning"
      class="debug-toggle-btn"
      @click="isDebugOpen = true"
      title="Open debug modal"
    />

    <!-- Debug Modal -->
    <div v-if="isDebugOpen" class="debug-modal-overlay">
      <div class="debug-modal">
        <!-- Header -->
        <div class="debug-header">
          <h3>Mobile Debug</h3>
          <div class="debug-actions">
            <q-btn
              flat
              dense
              round
              icon="content_copy"
              size="sm"
              @click="copyLogs"
              title="Copy logs to clipboard"
            />
            <q-btn
              flat
              dense
              round
              icon="share"
              size="sm"
              @click="shareLogs"
              title="Share logs"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              size="sm"
              @click="clearLogs"
              title="Clear logs"
            />
            <q-btn
              flat
              dense
              round
              icon="close"
              size="sm"
              @click="isDebugOpen = false"
              title="Close"
            />
          </div>
        </div>

        <!-- Logs Container -->
        <div class="debug-logs">
          <div v-if="logs.length === 0" class="no-logs">No logs yet</div>
          <div v-for="(log, index) in logs" :key="index" class="log-entry" :class="`log-${log.level}`">
            <span class="log-time">{{ log.timestamp }}</span>
            <span class="log-level">[{{ log.level.toUpperCase() }}]</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="debug-footer">
          <small>{{ logs.length }} logs</small>
        </div>
      </div>
    </div>
  </div>

  <!-- Debug Toggle Button (when modal is closed) -->
  <q-btn
    v-if="!isDebugOpen"
    fab
    icon="bug_report"
    color="warning"
    class="debug-toggle-btn"
    @click="isDebugOpen = true"
    title="Open debug modal"
  />
</template>

<script setup lang="ts">
import { useQuasar, copyToClipboard } from 'quasar';
import { useMobileDebug } from 'src/composables/useMobileDebug';

const $q = useQuasar();
const { logs, isDebugOpen, clearLogs, shareLogs, getLogs } = useMobileDebug();

const copyLogs = () => {
  console.log('[MobileDebugModal] copyLogs called');
  const logsText = getLogs();
  console.log('[MobileDebugModal] Logs text length:', logsText.length);
  console.log('[MobileDebugModal] Logs text:', logsText);

  if (!logsText || logsText.length === 0) {
    $q.notify({
      type: 'warning',
      message: 'No logs to copy',
      position: 'top',
      timeout: 2000,
    });
    return;
  }

  copyToClipboard(logsText)
    .then(() => {
      console.log('[MobileDebugModal] Logs copied to clipboard successfully');
      $q.notify({
        type: 'positive',
        message: 'Logs copied to clipboard',
        position: 'top',
        timeout: 2000,
      });
    })
    .catch((error) => {
      console.error('[MobileDebugModal] Failed to copy logs:', error);
      $q.notify({
        type: 'negative',
        message: 'Failed to copy logs',
        position: 'top',
        timeout: 2000,
      });
    });
};
</script>

<style scoped lang="scss">
.mobile-debug-modal {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
}

.debug-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
}

.debug-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 10001;
}

.debug-modal {
  background-color: var(--bg-primary);
  width: 100%;
  max-height: 80vh;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .debug-actions {
    display: flex;
    gap: 4px;
  }
}

.debug-logs {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  line-height: 1.4;
}

.no-logs {
  color: var(--text-secondary);
  text-align: center;
  padding: 20px;
}

.log-entry {
  margin-bottom: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  word-break: break-all;

  .log-time {
    color: var(--text-secondary);
    margin-right: 8px;
  }

  .log-level {
    font-weight: 600;
    margin-right: 8px;
    min-width: 50px;
  }

  .log-message {
    color: var(--text-primary);
  }

  &.log-log {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.log-info {
    background-color: rgba(33, 150, 243, 0.1);
    .log-level {
      color: #2196f3;
    }
  }

  &.log-warn {
    background-color: rgba(255, 193, 7, 0.1);
    .log-level {
      color: #ffc107;
    }
  }

  &.log-error {
    background-color: rgba(244, 67, 54, 0.1);
    .log-level {
      color: #f44336;
    }
  }
}

.debug-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-secondary);
  font-size: 12px;
}
</style>


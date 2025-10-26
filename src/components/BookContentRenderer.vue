<template>
  <div class="book-content-renderer">
    <div v-for="(item, index) in content" :key="index" class="content-item">
      <!-- Text content -->
      <p v-if="item.type === 'text'" class="content-text">
        {{ item.value }}
      </p>

      <!-- Bold subtitle -->
      <h4 v-else-if="item.type === 'subtitleBold'" class="content-subtitle-bold">
        {{ item.value }}
      </h4>

      <!-- Regular subtitle -->
      <h5 v-else-if="item.type === 'subtitle'" class="content-subtitle">
        {{ item.value }}
      </h5>

      <!-- Letter/Quote -->
      <blockquote v-else-if="item.type === 'letter'" class="content-letter">
        {{ item.value }}
      </blockquote>

      <!-- Table -->
      <div v-else-if="item.type === 'table'" class="content-table-wrapper">
        <table class="content-table">
          <thead v-if="item.headers && item.headers.length > 0">
            <tr>
              <th v-for="(header, idx) in item.headers" :key="`header-${idx}`">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody v-if="item.rows && item.rows.length > 0">
            <tr v-for="(row, rowIdx) in item.rows" :key="`row-${rowIdx}`">
              <td v-for="(cell, cellIdx) in row" :key="`cell-${rowIdx}-${cellIdx}`">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookContent } from 'src/types/book';

defineProps<{
  content: BookContent[];
}>();
</script>

<style scoped lang="scss">
.book-content-renderer {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.content-item {
  display: flex;
  flex-direction: column;
}

.content-text {
  margin: 0;
  line-height: 1.8;
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.content-subtitle-bold {
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.content-subtitle {
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-primary);
}

.content-letter {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-lg);
  border-left: 4px solid var(--color-primary);
  background-color: var(--bg-secondary);
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.8;

  &::before {
    content: '"';
    font-size: 2em;
    color: var(--color-primary);
    opacity: 0.3;
  }
}

.content-table-wrapper {
  overflow-x: auto;
  margin: var(--spacing-lg) 0;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);

  thead {
    background-color: var(--bg-secondary);
    border-bottom: 2px solid var(--border-color);
  }

  th {
    padding: var(--spacing-md);
    text-align: left;
    font-weight: 700;
    color: var(--text-primary);
  }

  td {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
  }

  tbody tr:hover {
    background-color: var(--bg-secondary);
  }
}
</style>


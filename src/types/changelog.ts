export interface ChangelogUpdate {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export interface Changelog {
  currentVersion: string;
  updates: ChangelogUpdate[];
}


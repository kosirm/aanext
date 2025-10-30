import { differenceInDays, intervalToDuration } from 'date-fns';
import confetti from 'canvas-confetti';

export interface SobrietyData {
  name: string;
  firstDay: string; // ISO date string
  coinType: string;
}

export interface SobrietyDuration {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
}

export interface SobrietyMilestone {
  isFullMonth: boolean;
  isFullYear: boolean;
  isRoundedHundred: boolean;
  isRoundedThousand: boolean;
  monthNumber: number | undefined;
  yearNumber: number | undefined;
}

export function useSobrietyCalculator() {
  const calculateDuration = (firstDay: string): SobrietyDuration | null => {
    if (!firstDay) return null;

    const startDate = new Date(firstDay);
    const today = new Date();

    // Set time to start of day for accurate calculation
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Adjust start date to the day before (last drunk day)
    // This way the first day of sobriety counts as day 1, not day 0
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate() - 1);

    const interval = intervalToDuration({
      start: adjustedStartDate,
      end: today,
    });

    const years = interval.years || 0;
    const months = interval.months || 0;
    const days = interval.days || 0;
    // Add 1 to totalDays because we're counting from the last drunk day
    const totalDays = differenceInDays(today, startDate) + 1;
    const totalHours = totalDays * 24;

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
    };
  };

  const calculateMilestone = (duration: SobrietyDuration): SobrietyMilestone => {
    const { years, months, days, totalDays } = duration;

    const haveYears = years > 0;
    const haveMonths = months > 0;
    const haveDays = days > 0;

    // Full month anniversary (e.g., exactly 1 month, 2 months, etc.)
    const isFullMonth = haveMonths && !haveDays && !haveYears;
    const monthNumber = isFullMonth ? months : undefined;

    // Full year anniversary (e.g., exactly 1 year, 2 years, etc.)
    const isFullYear = haveYears && !haveMonths && !haveDays;
    const yearNumber = isFullYear ? years : undefined;

    // Rounded hundreds (100, 200, 300, etc.)
    const isRoundedHundred = totalDays > 0 && totalDays % 100 === 0 && totalDays % 1000 !== 0;

    // Rounded thousands (1000, 2000, 3000, etc.)
    const isRoundedThousand = totalDays > 0 && totalDays % 1000 === 0;

    return {
      isFullMonth,
      isFullYear,
      isRoundedHundred,
      isRoundedThousand,
      monthNumber,
      yearNumber,
    };
  };

  const getGreetingMessage = (name: string, duration: SobrietyDuration, milestone: SobrietyMilestone): string => {
    const { years, months, days, totalDays } = duration;

    if (milestone.isFullYear && milestone.yearNumber !== undefined) {
      if (milestone.yearNumber === 1) {
        return `Čestitamo ${name}! Danas slaviš prvu godinu trijeznosti! 🎉`;
      }
      return `Čestitamo ${name}! Danas slaviš ${milestone.yearNumber} ${getYearWord(milestone.yearNumber)} trijeznosti! 🎉`;
    }

    if (milestone.isFullMonth && milestone.monthNumber !== undefined) {
      if (milestone.monthNumber === 1) {
        return `Čestitamo ${name}! Danas slaviš prvi mjesec trijeznosti! 🎊`;
      }
      return `Čestitamo ${name}! Danas slaviš ${milestone.monthNumber} ${getMonthWord(milestone.monthNumber)} trijeznosti! 🎊`;
    }

    if (milestone.isRoundedThousand) {
      return `Nevjerojatno ${name}! Danas slaviš ${totalDays} dana trijeznosti! 🎆`;
    }

    if (milestone.isRoundedHundred) {
      return `Bravo ${name}! Danas slaviš ${totalDays} dana trijeznosti! 👏`;
    }

    // Regular greeting
    let message = `Pozdrav ${name}! `;
    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} ${getYearWord(years)}`);
    }
    if (months > 0) {
      parts.push(`${months} ${getMonthWord(months)}`);
    }
    if (days > 0) {
      parts.push(`${days} ${getDayWord(days)}`);
    }

    message += `Tvoja trijeznost traje ${parts.join(', ')}.`;
    return message;
  };

  /**
   * Get correct Croatian word form for years (1-50)
   * 5-20, 25-30, 35-40, 45-50: godina
   * 1, 21, 31, 41: godinu
   * 2-4, 22-24, 32-34, 42-44: godine
   */
  const getYearWord = (count: number): string => {
    // 5-20, 25-30, 35-40, 45-50: godina
    if ((count >= 5 && count <= 20) ||
        (count >= 25 && count <= 30) ||
        (count >= 35 && count <= 40) ||
        (count >= 45 && count <= 50)) {
      return 'godina';
    }

    // 1, 21, 31, 41: godinu
    if (count === 1 || count === 21 || count === 31 || count === 41) {
      return 'godinu';
    }

    // 2-4, 22-24, 32-34, 42-44: godine
    return 'godine';
  };

  /**
   * Get correct Croatian word form for months (1-11)
   * 1: mjesec
   * 2,3,4: mjeseca
   * 5-11: mjeseci
   */
  const getMonthWord = (count: number): string => {
    if (count === 1) return 'mjesec';
    if (count >= 2 && count <= 4) return 'mjeseca';
    return 'mjeseci';
  };

  /**
   * Get correct Croatian word form for days (1-30)
   * 1, 21: dan
   * 2-20, 22-30: dana
   */
  const getDayWord = (count: number): string => {
    if (count === 1 || count === 21) return 'dan';
    return 'dana';
  };

  /**
   * Get the duration text with correct grammar
   * Example: "1 godinu, 4 mjeseca i 13 dana"
   */
  const getDurationText = (duration: SobrietyDuration): string => {
    const { years, months, days } = duration;
    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} ${getYearWord(years)}`);
    }
    if (months > 0) {
      parts.push(`${months} ${getMonthWord(months)}`);
    }
    if (days > 0) {
      parts.push(`${days} ${getDayWord(days)}`);
    }

    // Join with commas and "i" before the last item
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0] || '';
    if (parts.length === 2) return `${parts[0] || ''} i ${parts[1] || ''}`;

    const lastPart = parts.pop() || '';
    return `${parts.join(', ')} i ${lastPart}`;
  };

  /**
   * Get correct Croatian word form for celebration years (1-50)
   * 1, 5-21, 25-31, 35-41, 45-50: godina
   * 2-4, 22-24, 32-34, 42-44: godine
   */
  const getCelebrationYearWord = (count: number): string => {
    // 2-4, 22-24, 32-34, 42-44: godine
    if ((count >= 2 && count <= 4) ||
        (count >= 22 && count <= 24) ||
        (count >= 32 && count <= 34) ||
        (count >= 42 && count <= 44)) {
      return 'godine';
    }

    // 1, 5-21, 25-31, 35-41, 45-50: godina
    return 'godina';
  };

  /**
   * Get correct Croatian word form for celebration months (1-11)
   * 1: mjesec
   * 2,3,4: mjeseca
   * 5-11: mjeseci
   */
  const getCelebrationMonthWord = (count: number): string => {
    if (count === 1) return 'mjesec';
    if (count >= 2 && count <= 4) return 'mjeseca';
    return 'mjeseci';
  };

  /**
   * Get celebration message for milestones
   */
  const getCelebrationMessage = (milestone: SobrietyMilestone, totalDays: number): string => {
    if (milestone.isFullYear && milestone.yearNumber) {
      return `Danas ti je okruglo ${milestone.yearNumber} ${getCelebrationYearWord(milestone.yearNumber)}!`;
    }
    if (milestone.isFullMonth && milestone.monthNumber) {
      return `Danas ti je okruglo ${milestone.monthNumber} ${getCelebrationMonthWord(milestone.monthNumber)}!`;
    }
    if (milestone.isRoundedThousand || milestone.isRoundedHundred) {
      return `Danas ti je okruglo ${totalDays} dana!`;
    }
    return '';
  };

  const getBadgeText = (duration: SobrietyDuration): string => {
    const { years, months, days } = duration;
    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} 🅶`);
    }
    if (months > 0) {
      parts.push(`${months} 🅼`);
    }
    if (days > 0) {
      parts.push(`${days} 🅳`);
    }

    return parts.join(' ');
  };

  // Confetti animations
  // You can adjust the confettiMultiplier to control the amount of confetti (0.5 = half, 1 = normal, 2 = double)
  const confettiValentine = (confettiMultiplier = 0.5) => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration) * confettiMultiplier;
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ff1493'],
      });
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ff1493'],
      });
    }, 250);
  };

  const confettiStars = (confettiMultiplier = 0.5) => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
      zIndex: 9999,
    };

    const shoot = () => {
      void confetti({
        ...defaults,
        particleCount: 40 * confettiMultiplier,
        scalar: 1.2,
        shapes: ['star'],
      });

      void confetti({
        ...defaults,
        particleCount: 10 * confettiMultiplier,
        scalar: 0.75,
        shapes: ['circle'],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  const confettiSchool = (confettiMultiplier = 0.5) => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration) * confettiMultiplier;
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const confettiFireworks = (confettiMultiplier = 0.5) => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration) * confettiMultiplier;
      void confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const triggerCelebration = (milestone: SobrietyMilestone, confettiMultiplier = 0.5) => {
    if (milestone.isFullYear) {
      confettiFireworks(confettiMultiplier);
    } else if (milestone.isFullMonth) {
      confettiValentine(confettiMultiplier);
    } else if (milestone.isRoundedThousand) {
      confettiFireworks(confettiMultiplier);
    } else if (milestone.isRoundedHundred) {
      confettiSchool(confettiMultiplier);
    }
  };

  return {
    calculateDuration,
    calculateMilestone,
    getGreetingMessage,
    getBadgeText,
    getDurationText,
    getCelebrationMessage,
    triggerCelebration,
    confettiValentine,
    confettiStars,
    confettiSchool,
    confettiFireworks,
  };
}


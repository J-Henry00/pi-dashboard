export function cpuTemp(temp, dark) {
  if (temp <= 60) return 'text-green-800 dark:text-green-400';
  if (60 < temp && temp < 80) return 'text-yellow-800 dark:text-yellow-400';
  if (temp >= 80) return 'text-red-800 dark:text-red-400';
  return dark
    ? 'text-white dark:text-white'
    : 'text-gray-900 dark:text-gray-900';
}

export function ramUsage(percent, dark) {
  if (percent <= 60) return 'text-green-800 dark:text-green-400';
  if (60 < percent && percent < 85)
    return 'text-yellow-800 dark:text-yellow-400';
  if (percent >= 85) return 'text-red-800 dark:text-red-400';
  return dark
    ? 'text-white dark:text-white'
    : 'text-gray-900 dark:text-gray-900';
}

export function cpuUsage(percent, dark) {
  if (percent <= 30) return 'text-green-800 dark:text-green-400';
  if (30 < percent && percent <= 70)
    return 'text-yellow-800 dark:text-yellow-400';
  if (percent > 70) return 'text-red-800 dark:text-red-400';
  return dark
    ? 'text-white dark:text-white'
    : 'text-gray-900 dark:text-gray-900';
}

export function diskUsage(percent, dark) {
  if (percent <= 70) return 'text-green-800 dark:text-green-400';
  if (70 < percent && percent <= 89)
    return 'text-yellow-800 dark:text-yellow-400';
  if (percent > 89) return 'text-red-800 dark:text-red-400';
  return dark
    ? 'text-white dark:text-white'
    : 'text-gray-900 dark:text-gray-900';
}

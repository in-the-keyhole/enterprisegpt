/**
 * Formats a date and time representation in a relative manner based on the input date.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date and time representation.
 *
 * @example
 * const currentDate: Date = new Date();
 * const todayFormatted: string = formatRelativeDateTime(currentDate);
 * console.log(`Formatted Date and Time (Today): ${todayFormatted}`);
 *
 * const yesterday: Date = new Date();
 * yesterday.setDate(currentDate.getDate() - 1);
 * const yesterdayFormatted: string = formatRelativeDateTime(yesterday);
 * console.log(`Formatted Date and Time (Yesterday): ${yesterdayFormatted}`);
 *
 * const lastWeek: Date = new Date();
 * lastWeek.setDate(currentDate.getDate() - 7);
 * const lastWeekFormatted: string = formatRelativeDateTime(lastWeek);
 * console.log(`Formatted Date and Time (Last Week): ${lastWeekFormatted}`);
 */
export function formatRelativeDateTime(date: Date): string {
    const today: Date = new Date();
    const oneDay: number = 24 * 60 * 60 * 1000; // One day in milliseconds
    const oneWeek: number = 7 * oneDay; // One week in milliseconds

    if (isSameDay(date, today)) {
        // Format as US time if it's today
        return formatToTime(date);
    } else if (date.getTime() < today.getTime() + oneWeek) {
        // Display day of the week if within a week
        return formatToDayOfWeek(date);
    } else {
        // Display month and day number for other cases
        return formatToMonthAndDay(date);
    }
}

/**
 * Checks if two dates represent the same day.
 *
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} - True if the dates represent the same day, false otherwise.
 */
function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * Formats the time of the given date.
 *
 * @param {Date} date - The date to extract the time from.
 * @returns {string} - The formatted time.
 */
function formatToTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
}

/**
 * Formats the day of the week of the given date.
 *
 * @param {Date} date - The date to extract the day of the week from.
 * @returns {string} - The formatted day of the week.
 */
function formatToDayOfWeek(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Formats the month and day of the given date.
 *
 * @param {Date} date - The date to extract the month and day from.
 * @returns {string} - The formatted month and day.
 */
function formatToMonthAndDay(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

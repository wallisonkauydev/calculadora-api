export const calculationService = {
  mediana: (numbers: number[]): number => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  },

  maior_numero: (numbers: number[]): number => {
    return Math.max(...numbers);
  },

  menor_numero: (numbers: number[]): number => {
    return Math.min(...numbers);
  },

  media: (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  },

  soma: (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
  },

  moda: (numbers: number[]): number => {
    const frequency: { [key: number]: number } = {};
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    let maxFreq = 0;
    let moda = numbers[0];

    for (const [num, freq] of Object.entries(frequency)) {
      if (freq > maxFreq) {
        maxFreq = freq;
        moda = Number(num);
      }
    }

    return moda;
  },
};

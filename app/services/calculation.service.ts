export const calculationService = {
  // Calcula a mediana — valor central após ordenar a lista
  mediana: (numbers: number[]): number => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2 // média dos dois do meio (lista par)
      : sorted[mid]; // valor central (lista ímpar)
  },

  // Retorna o maior número do conjunto
  maior_numero: (numbers: number[]): number => {
    return Math.max(...numbers);
  },

  // Retorna o menor número do conjunto
  menor_numero: (numbers: number[]): number => {
    return Math.min(...numbers);
  },

  // Calcula a média aritmética simples
  media: (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  },

  // Soma todos os números do conjunto
  soma: (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
  },

  // Calcula a moda — número que mais se repete
  moda: (numbers: number[]): number => {
    const frequency: { [key: number]: number } = {};
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1; // conta ocorrências
    });

    let maxFreq = 0;
    let moda = numbers[0];

    // Encontra o número com maior frequência
    for (const [num, freq] of Object.entries(frequency)) {
      if (freq > maxFreq) {
        maxFreq = freq;
        moda = Number(num);
      }
    }

    return moda;
  },
   pegarNumeroQueMaisAparece: (nums: any): any => {
    let obj: any = {};
    let maior = 0;
    let valor: any = null;
    let temp = 0;

    for (let i in nums) {
      if (!obj[nums[i]]) {
        obj[nums[i]] = 1;
      } else {
        obj[nums[i]]++;
      }
    }

    Object.keys(obj).map((k) => {
      if (obj[k] >= maior) {
        maior = obj[k];
        valor = k;
      } else {
        temp = obj[k] - 1;
      }
    });

    if (valor === undefined) {
      return 'nada';
    }

    return +valor; 
  },
};

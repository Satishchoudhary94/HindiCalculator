export const hindiNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const hindiOperators = {
  '+': '+',
  '-': '-',
  '×': '×',
  '÷': '÷',
  '=': '=',
  'C': 'C',
};

export const toHindi = (num: string): string => {
  return num.split('').map(char => {
    if (char >= '0' && char <= '9') {
      return hindiNumerals[parseInt(char)];
    }
    return char;
  }).join('');
};

export const toEnglish = (num: string): string => {
  return num.split('').map(char => {
    const index = hindiNumerals.indexOf(char);
    if (index !== -1) {
      return index.toString();
    }
    return char;
  }).join('');
}; 
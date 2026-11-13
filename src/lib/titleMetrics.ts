/** Largeur approchée d’un titre en em (Archivo 900, largeur 68 %, capitales) : le « I » et l’espace sont étroits. */
export function titleEm(title: string): number {
  return [...title.toUpperCase()].reduce((width, char) => width + (char === 'I' ? 0.23 : char === ' ' ? 0.2 : 0.53), 0);
}

/**
 * Taille (en cqw) pour qu’un titre tienne dans une largeur donnée, sur une ligne si la taille reste
 * au-dessus de `minOneLine`, sinon sur deux lignes coupées au meilleur endroit.
 */
export function fitTitle(title: string, width: number, max: number, minOneLine = 0): number {
  const oneLine = titleEm(title);
  if (width / oneLine >= minOneLine) return Math.min(max, width / oneLine);
  const words = title.split(' ');
  let longest = oneLine;
  for (let i = 1; i < words.length; i += 1) {
    longest = Math.min(longest, Math.max(titleEm(words.slice(0, i).join(' ')), titleEm(words.slice(i).join(' '))));
  }
  return Math.min(max, width / longest);
}

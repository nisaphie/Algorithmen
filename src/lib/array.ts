export function neueZufallsliste(n: number) {
  const liste = [];
  for (let i = 0; i < n; i++) {
    liste.push({ value: Math.floor(Math.random() * 100), fill: "hsl(var(--primary))"});
  }
  return liste;
}

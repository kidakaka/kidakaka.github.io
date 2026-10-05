export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthIdx = parseInt(month, 10) - 1;
  const monthName = months[monthIdx] || month;
  const dayNum = parseInt(day, 10);
  return `${dayNum} ${monthName} ${year}`;
}

export function formatCategory(cat: string): string {
  if (!cat) return '';
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export function getPostUrl(post: { data: { year: string; month: string; day: string; slug: string } }): string {
  return `/${post.data.year}/${post.data.month}/${post.data.day}/${post.data.slug}/`;
}

export function workThumb(folder?: string | null) {
  return folder ? `/images/work/${folder}/thumbnail.jpg` : null;
}

export function workCover(folder?: string | null) {
  return folder ? `/images/work/${folder}/cover.jpg` : null;
}

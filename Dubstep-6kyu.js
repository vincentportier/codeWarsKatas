function songDecoder(song) {
  return song.replace(/WUB/g, " ").replace(/\s+/g, " ").trim();
}

export const approveFileSize = (file) => {
  if (file) {
    if (file.size < 15728640) {
      //15 MB max załącznik
      return true;
    } else {
      return false;
    }
  }
};

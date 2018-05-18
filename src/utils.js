function parseTimeToMillisecond(s) {
  let val = s.match(/\d*\.?\d+/g);

  if (val) {
    val = parseFloat(val.pop());
  }
  else {
    return 0;
  }

  if (s.indexOf('ms') === -1) {
    return parseInt(`${val * 1000}`);
  }
  else {
    return parseInt(`${val}`);
  }
}

export default {
  parseTimeToMillisecond
}

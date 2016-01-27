function yesNo(booleanValue) {
  var tempLabel = "<label class=";
  if (booleanValue === true) {
    tempLabel += "\"green\">Yes</label>";
  } else {
    tempLabel += "\"red\">No</label>";
  }
  return tempLabel;
}
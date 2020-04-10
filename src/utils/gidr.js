function gidr(input_data) {
  let rashods = "";
  switch (input_data.tipe) {
    case "showCoForm":
      rashods = "";
      break;
    case "showVentForm":
      rashods = "rashod_co(input_data);";
      break;
    case "showGvsForm":
      rashods = "rashod_gvs(input_data);";
      break;
    default:
      break;
  }
  // console.log('input_data', input_data);

  return rashods;
}

export default gidr;

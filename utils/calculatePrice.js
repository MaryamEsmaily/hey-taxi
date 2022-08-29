function calculatePrice(markers, passesNum) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(markers?.[1]?.lat - markers?.[0]?.lat); // deg2rad below
  var dLon = deg2rad(markers?.[1]?.lng - markers?.[0]?.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(markers?.[0]?.lat)) *
      Math.cos(deg2rad(markers?.[1]?.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  const totalPrice = d * 2.66;
  const individualPrice = totalPrice / 3;
  const finalPrice = (Math.round(individualPrice * passesNum * 2) / 2).toFixed(
    1
  );
  return finalPrice;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default calculatePrice;

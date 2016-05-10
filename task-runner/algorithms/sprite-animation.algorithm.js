// Add in left-right algorithm
exports.sort = function (items) {
  return items;
};

exports.placeItems = function (items) {
  // Iterate over each of the items
  var x = 0;
  var y = 0;

  var inc = 0;

  var height = items[0].height;
  var width = items[0].width;

  items.forEach(function (item) {
    // Update the x to the current width
    item.x = x;
    item.y = y;

    // Increment the x by the item's width
    x += width;
    inc++;

    if (inc % 6 === 0) {
      x = 0;
      y += height;
    }
  });

  // Return the items
  return items;
};

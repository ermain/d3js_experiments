import Quad from "./quad";

export default function(x, y, k, radius) {
  var data = [],
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  let visited = {}
  while (q = quads.pop()) {
    if(data.length >= k) {
      break;
    }


    // Stop searching if this quadrant doesn't contain any nodes
    if (!(node = q.node))
      continue;

    if (node.length) {
      x1 = q.x0,
      y1 = q.y0,
      x2 = q.x1,
      y2 = q.y1;

      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point and coincident points
    else {
      if(visited[node.data.index]) continue;
      visited[node.data.index] = true;
      do {
        var dx = x - +this._x.call(null, node.data),
            dy = y - +this._y.call(null, node.data),
            d2 = dx * dx + dy * dy;
        if (d2 < radius) {
          var d = Math.sqrt(d2);
          x0 = x - d, y0 = y - d;
          x3 = x + d, y3 = y + d;
          data.push(node.data);
        }
      } while(node = node.next && data.length < k)
    }
  }
  return data;
}

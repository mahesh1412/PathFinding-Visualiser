const drs = [0, 0, 1, -1];
const dcs = [1, -1, 0, 0];

export const BFSAlgo = (grid, start, end) => {
  const visitedNodes = [];
  const queue = [];
  queue.push(start);
  start.visited = true;
  while (queue.length > 0) {
    const node = queue.shift();
    if (node.row === end.row && node.col === end.col) {
      visitedNodes.push(node);
      return visitedNodes;
    }
    visitedNodes.push(node);
    for (let i = 0; i < 4; i++) {
      let r = node.row + drs[i];
      let c = node.col + dcs[i];
      if (
        r >= 0 &&
        c >= 0 &&
        r < grid.length &&
        c < grid[0].length &&
        grid[r][c].visited === false &&
        grid[r][c].isWall === false
      ) {
        grid[r][c].visited = true;
        grid[r][c].prev = node;
        queue.push(grid[r][c]);
      }
    }
  }
  return visitedNodes;
};
export const shortestPathNodesBFS = (end) => {
  const array = [];
  while (end) {
    array.push(end);
    end = end.prev;
  }
  return array;
};

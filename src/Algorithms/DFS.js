const drs = [0, 0, 1, -1];
const dcs = [-1, 1, 0, 0];

export const DFSAlgo = (grid, start, end) => {
  const visitedNodes = [];
  DFS(grid, start, visitedNodes, end);
  return visitedNodes;
};

function DFS(grid, start, visitedNodes, end) {
  if (start.row === end.row && start.col === end.col) {
    console.log("kjhj");
    start.visited = true;
    return true;
  }
  if (start.isWall === true) return false;
  start.visited = true;
  visitedNodes.push(start);

  for (let i = 0; i < 4; i++) {
    let r = start.row + drs[i];
    let c = start.col + dcs[i];
    if (
      r >= 0 &&
      c >= 0 &&
      r < grid.length &&
      c < grid[0].length &&
      grid[r][c].visited === false
    ) {
      grid[r][c].prev = start;
      if (DFS(grid, grid[r][c], visitedNodes, end)) return true;
    }
  }
}

export const shortestPathNodesDFS = (endNode) => {
  const pathNodes = [];
  while (endNode != null) {
    pathNodes.push(endNode);
    endNode = endNode.prev;
  }
  return pathNodes;
};

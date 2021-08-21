export const DijkstraAlgo = (grid, start, end) => {
  const visitedNodes = [];
  const Nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) Nodes.push(grid[i][j]);
  }
  dijkstra(grid, start, end, visitedNodes, Nodes);
  return visitedNodes;
};

function dijkstra(grid, start, end, visitedNodes, Nodes) {
  start.distance = 0;
  while (Nodes.length) {
    const curNode = minDistance(Nodes);
    if (curNode.distance === 10000000) return;
    if (curNode.isWall) continue;
    curNode.visited = true;
    visitedNodes.push(curNode);
    if (curNode === end) {
      return;
    }
    updateDistance(grid, curNode, Nodes);
  }
}

function minDistance(Nodes) {
  Nodes.sort(function (a, b) {
    return a.distance - b.distance;
  });
  return Nodes.shift();
}
function updateDistance(grid, curNode) {
  const adjNodes = getAdjUnvisitedNodes(curNode, grid);
  for (let i = 0; i < adjNodes.length; i++) {
    adjNodes[i].distance = curNode.distance + 1;
    adjNodes[i].prev = curNode;
  }
}

function getAdjUnvisitedNodes(curNode, grid) {
  const array = [];
  const { row, col } = curNode;
  if (row > 0) array.push(grid[row - 1][col]);
  if (col > 0) array.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) array.push(grid[row][col + 1]);
  if (row < grid.length - 1) array.push(grid[row + 1][col]);
  return array.filter((node) => node.visited === false);
}

export const shortestPathNodes = (node) => {
  const array = [];
  while (node != null) {
    array.push(node);
    node = node.prev;
  }
  console.log(array);
  return array;
};

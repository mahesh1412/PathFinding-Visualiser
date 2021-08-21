/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import { DijkstraAlgo, shortestPathNodes } from "../Algorithms/DijkstrasAlgo";
import { DFSAlgo, shortestPathNodesDFS } from "../Algorithms/DFS";
import { BFSAlgo, shortestPathNodesBFS } from "../Algorithms/BFS";

const LocalStorageKey = "StartAndEndlocation";

export default function PathfindingVisualiser() {
  const [grid, setGrid] = useState([]);
  const [speed, setSpeed] = useState(-10);
  const [algo, setAlgo] = useState("");
  const [StartRow, setStartRow] = useState(10);
  const [StartCol, setStartCol] = useState(15);
  const [EndRow, setEndRow] = useState(10);
  const [EndCol, setEndCol] = useState(45);

  const gridRef = useRef([]);
  const [mouseMove, setMouseMove] = useState(false);
  const [HashMap, setHashMap] = useState(null);
  const hashMap = new Map();
  useEffect(() => {
    console.log(typeof StartRow);
    const curLocation = localStorage.getItem(LocalStorageKey);
    const CurLocation = JSON.parse(curLocation);
    const sRow = parseInt(CurLocation[0]);
    const sCol = parseInt(CurLocation[1]);
    const eRow = parseInt(CurLocation[2]);
    const eCol = parseInt(CurLocation[3]);
    if (sRow !== undefined) setStartCol(sCol);
    if (sCol !== undefined) setStartRow(sRow);
    if (eRow !== undefined) setEndCol(eCol);
    if (eCol !== undefined) setEndRow(eRow);
    console.log(sRow, sCol, eRow, eCol);
    initializeGrid();
  }, []);

  useEffect(() => {
    const location = [StartRow, StartCol, EndRow, EndCol];
    localStorage.setItem(LocalStorageKey, JSON.stringify(location));
  }, [StartRow, StartCol, EndRow, EndCol]);

  const initializeGrid = () => {
    const tempGrid = [];
    for (let i = 0; i < 24; i++) {
      const rows = [];
      for (let j = 0; j < 65; j++) {
        rows.push(buildNode(i, j));
      }
      tempGrid.push(rows);
    }
    setGrid(tempGrid);
  };
  const buildNode = (row, col) => {
    const Node = {
      row,
      col,
      isWall: false,
      start: row === StartRow && col === StartCol,
      end: row === EndRow && col === EndCol,
      visited: false,
      distance: 10000000,
      prev: null,
    };
    return Node;
  };

  const handleOnMouseDownEvent = (e) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const curref = gridRef.current[i * grid[0].length + j];
        hashMap.set(curref, [i, j]);
      }
    }
    setHashMap(hashMap);
    setMouseMove(true);
    const location = hashMap.get(e.target);
    e.target.style.backgroundColor = "#ffc600";
    grid[location[0]][location[1]].isWall = true;
  };
  const handleOnMouseMoveEvent = (e) => {
    if (mouseMove) {
      const location = HashMap.get(e.target);
      e.target.style.backgroundColor = "#ffc600";
      if (location !== undefined) {
        grid[location[0]][location[1]].isWall = true;
      }
    }
  };
  const handleOnMouseUpEvent = (e) => {
    setMouseMove(false);
  };

  const DijkstraVisualisation = () => {
    const startNode = grid[StartRow][StartCol];
    const endNode = grid[EndRow][EndCol];
    const animations = DijkstraAlgo(grid, startNode, endNode);
    for (let i = 0; i < animations.length; i++) {
      const { row, col } = animations[i];
      setTimeout(() => {
        const curRef = gridRef.current[row * grid[0].length + col];
        curRef.style.backgroundColor = "gray";
        curRef.style.backgroundColor = "hsl(277, 96%, 49%)";
        if (i === animations.length - 1) {
          const shortestPathArray = shortestPathNodes(endNode);
          for (let j = 0; j < shortestPathArray.length; j++) {
            const { row, col } = shortestPathArray[j];
            setTimeout(() => {
              const curRef = gridRef.current[row * grid[0].length + col];
              curRef.style.backgroundColor = "hsl(194, 86%, 51%)";
            }, j * -speed);
          }
        }
      }, i * -speed);
    }
  };

  const DFSvisualisation = () => {
    const startNode = grid[StartRow][StartCol];
    const endNode = grid[EndRow][EndCol];
    const animations = DFSAlgo(grid, startNode, endNode);
    for (let i = 0; i < animations.length; i++) {
      const { row, col } = animations[i];
      setTimeout(() => {
        const curRef = gridRef.current[row * grid[0].length + col];
        curRef.style.backgroundColor = "gray";
        curRef.style.backgroundColor = "hsl(277, 96%, 49%)";
        if (i === animations.length - 1) {
          const shortestPathArray = shortestPathNodesDFS(endNode);
          for (let j = 0; j < shortestPathArray.length; j++) {
            const { row, col } = shortestPathArray[j];
            setTimeout(() => {
              const curRef = gridRef.current[row * grid[0].length + col];
              curRef.style.backgroundColor = "hsl(194, 86%, 51%)";
            }, j * -speed);
          }
        }
      }, i * -speed);
    }
  };
  const BFSvisualisation = () => {
    const startNode = grid[StartRow][StartCol];
    const endNode = grid[EndRow][EndCol];
    const animations = BFSAlgo(grid, startNode, endNode);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const { row, col } = animations[i];
      setTimeout(() => {
        const curRef = gridRef.current[row * grid[0].length + col];
        curRef.style.backgroundColor = "gray";
        curRef.style.backgroundColor = "hsl(277, 96%, 49%)";
        if (i === animations.length - 1) {
          const shortestPathArray = shortestPathNodesBFS(endNode);
          for (let j = 0; j < shortestPathArray.length; j++) {
            const { row, col } = shortestPathArray[j];
            setTimeout(() => {
              const curRef = gridRef.current[row * grid[0].length + col];
              curRef.style.backgroundColor = "hsl(194, 86%, 51%)";
            }, j * -speed);
          }
        }
      }, i * -speed);
    }
  };
  const handleOnClickEvent = () => {
    switch (algo) {
      case "Dijkstra":
        return DijkstraVisualisation();
      case "DFS":
        return DFSvisualisation();
      case "BFS":
        return BFSvisualisation();
      default:
        toast("Please select an algorithm to visualise", { type: "warning" });
        break;
    }
  };
  const handleOnChangeEvent = (e) => {
    if (e.target.checked) {
      setAlgo(e.target.value);
    }
  };

  const handleInputStartRow = (e) => {
    setStartRow(e.target.value);
    window.location.reload();
  };
  const handleInputStartCol = (e) => {
    setStartCol(e.target.value);
    window.location.reload();
  };
  const handleInputEndRow = (e) => {
    setEndRow(e.target.value);
    window.location.reload();
  };
  const handleInputEndCol = (e) => {
    setEndCol(e.target.value);
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="header">
        <div className="instructions">
          <h2>Instructions</h2>
          <ul>
            <li>Select an Algorithm, Set Start and End points</li>
            <li>Click and drag on grid to create obstacles if any</li>
            <li>Adjust the speed and Click on visualise</li>
          </ul>
        </div>
        <div className="algo-section">
          <p>Select An Algorithm</p>
          <label>
            <input
              id="Dijkstra"
              type="radio"
              name="algo"
              value="Dijkstra"
              onChange={(e) => handleOnChangeEvent(e)}
            />
            <span>Dijkstra</span>
          </label>
          <label>
            <input
              id="DFS"
              type="radio"
              name="algo"
              value="DFS"
              onChange={(e) => handleOnChangeEvent(e)}
            />
            <span>DFS</span>
          </label>
          <label>
            <input
              id="BFS"
              type="radio"
              name="algo"
              value="BFS"
              onChange={(e) => handleOnChangeEvent(e)}
            />
            <span>BFS</span>
          </label>
        </div>
        <div className="custom-section">
          <div className="locations">
            <label>Start Row</label>
            <input
              value={StartRow}
              onChange={(e) => handleInputStartRow(e)}
              type="number"
              min="0"
              max="23"
            />
            <label>Start Col</label>
            <input
              value={StartCol}
              onChange={(e) => handleInputStartCol(e)}
              type="number"
              min="0"
              max="64"
            />
          </div>
          <div className="locations">
            <label>End Row</label>
            <input
              value={EndRow}
              onChange={(e) => handleInputEndRow(e)}
              type="number"
              min="0"
              max="23"
            />
            <label>End Col</label>
            <input
              value={EndCol}
              onChange={(e) => handleInputEndCol(e)}
              type="number"
              min="0"
              max="64"
            />
          </div>
          <div className="speed">
            <label>Speed</label>
            <input
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              type="range"
              min={-20}
              max={-1}
            />
          </div>
        </div>
        <div>
          <button onClick={handleOnClickEvent}>Visualize</button>
          <button onClick={() => window.location.reload()}>Clear All</button>
        </div>
      </div>
      <div className="grid">
        {grid.map((row, rowInd) => (
          <div className="grid-rows" key={rowInd}>
            {row.map((node, colInd) =>
              rowInd === StartRow && colInd === StartCol ? (
                <div
                  className="grid-node"
                  ref={(el) => {
                    gridRef.current.push(el);
                  }}
                  onMouseDown={(e) => handleOnMouseDownEvent(e)}
                  onMouseMove={(e) => handleOnMouseMoveEvent(e)}
                  onMouseUp={(e) => handleOnMouseUpEvent(e)}
                  key={colInd}
                >
                  <FaArrowRight className="icons" />
                </div>
              ) : rowInd === EndRow && colInd === EndCol ? (
                <div
                  className="grid-node"
                  ref={(el) => {
                    gridRef.current.push(el);
                  }}
                  onMouseDown={(e) => handleOnMouseDownEvent(e)}
                  onMouseMove={(e) => handleOnMouseMoveEvent(e)}
                  onMouseUp={(e) => handleOnMouseUpEvent(e)}
                  key={colInd}
                >
                  <FaMapMarker className="icons" />
                </div>
              ) : (
                <div
                  className="grid-node"
                  ref={(el) => {
                    gridRef.current.push(el);
                  }}
                  onMouseDown={(e) => handleOnMouseDownEvent(e)}
                  onMouseMove={(e) => handleOnMouseMoveEvent(e)}
                  onMouseUp={(e) => handleOnMouseUpEvent(e)}
                  key={colInd}
                ></div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

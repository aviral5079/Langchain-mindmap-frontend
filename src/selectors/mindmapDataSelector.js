const adjList = {};
let levelCount = [];
const parent = {};

const createAdjacencyList = (nodes, edges) => {
  for (const key of Object.keys(nodes)) {
    adjList[key] = [];
  }

  for (let index = 0; index < edges.length; index++) {
    const { child_id, parent_id } = edges[index];
    if (adjList[parent_id]) {
      adjList[parent_id].push(child_id);
      parent[child_id] = parent_id;
    }
  }
};

const setAdjacencyList = (nodes, edges) => {
  if (Object.keys(adjList).length === 0) {
    createAdjacencyList(nodes, edges);
  }
};

export const getVisibleNodes = (GraphNodes, GraphEdges, rootId) => {
  setAdjacencyList(GraphNodes, GraphEdges);
  let startingIndex = rootId;
  let visited = {};
  let queue = [startingIndex];
  visited[startingIndex] = true;
  let count = 1;
  levelCount = [];

  while (queue.length) {
    levelCount.push(count);
    count = 0;
    const size = queue.length;
    for (let index = 0; index < size; index++) {
      const currentVertex = queue.shift();
      adjList[currentVertex]?.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
          if (adjList[neighbor] && adjList[neighbor].length > 0) {
            count++;
          }
        }
      });
    }
  }

  startingIndex = rootId;
  visited = {};
  queue = [startingIndex];
  visited[startingIndex] = true;
  let level = 0;
  const radii = [0, 1000, 2000, 3000, 4000, 5000];
  const tempNodes = [];

  while (queue.length) {
    const size = queue.length;
    let theta = 0;
    if (level === 2) break;
    const thetaDiff = 360 / levelCount[level];
    for (let index = 0; index < size; index++) {
      const currentVertex = queue.shift();
      const position = {
        x: radii[level] * Math.cos((theta * Math.PI) / 180),
        y: radii[level] * Math.sin((theta * Math.PI) / 180),
      };
      if (adjList[currentVertex] && adjList[currentVertex].length > 0) {
        tempNodes.push({
          id: currentVertex,
          type: "customNode",
          position: position,
          data: {
            label: GraphNodes[currentVertex]?.data?.title,
            key: currentVertex,
            position: position,
            positionAngle: theta,
            firstChildPositionAngle: theta,
            parentRadialDistance: level - 1 >= 0 ? radii[level - 1] : 0,
            childRadialDistance:
              level + 1 < radii.length ? radii[level + 1] - radii[level] : 0,
            parentId: parent[currentVertex],
          },
        });

        adjList[currentVertex].forEach((neighbor) => {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
            parent[neighbor] = currentVertex;
          }
        });
        theta += thetaDiff;
      }
    }
    level++;
  }
  return tempNodes;
};

export const getVisibleEdges = (nodes, edges, rootId) => {
  setAdjacencyList(nodes, edges);
  const startingIndex = rootId;
  const visited = {};
  const queue = [startingIndex];
  visited[startingIndex] = true;
  let level = 1;
  const tempEdges = [];

  while (queue.length) {
    let t = 0;
    const td = 360 / levelCount[level];
    const size = queue.length;

    if (level === 2) break;
    for (let index = 0; index < size; index++) {
      const currentVertex = queue.shift();
      adjList[currentVertex]?.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
          tempEdges.push({
            id: `${currentVertex}-${neighbor}`,
            source: `${currentVertex}`,
            target: `${neighbor}`,
            sourceHandle:
              (t >= 270 && t < 360) || (t >= 0 && t <= 90) ? "b" : "a",
          });

          if (adjList[neighbor] && adjList[neighbor].length > 0)
            t = (t + td) % 360;
        }
      });
    }
    level++;
  }
  return tempEdges;
};

const helper = (GraphNodes, id, visited, content) => {
  visited[id] = true;
  if (GraphNodes[id]?.data?.title) {
    const temp = {
      title: GraphNodes[id]?.data?.title || `Default Title ${id}`,
    };
    content?.push(temp);
    adjList[id]?.forEach((neighbor) => {
      if (!visited[neighbor]) {
        helper(GraphNodes, neighbor, visited, content);
      }
    });
  } else {
    const temp = {
      text: GraphNodes[id]?.data?.text || `Default Text: ${id}`,
    };
    content?.push(temp);
  }
};

export const getContent = (nodes, nodeId) => {
  const content = [];
  const visited = {};
  helper(nodes, nodeId, visited, content);
  return content;
};

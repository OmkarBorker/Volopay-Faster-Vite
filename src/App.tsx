import React, { useState } from 'react';
import './App.css';

type Node = {
  id: number;
  x: number;
  y: number;
  children: number[];
};

type Graph = {
  [id: number]: Node;
};

type Props = {
  data: Graph;
};

const GraphNetwork: React.FC<Props> = ({ data }) => {
  const [highlightedEdges, setHighlightedEdges] = useState<string[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<[number, number] | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleEdgeClick = (edgeId: string, source: number, target: number) => {
    setHighlightedEdges([edgeId]);
    setSelectedNodes([source, target]);
    setSelectedEdge(edgeId);
    setSelectedNode(null);
    setAdditionalInfo('');
  };

  const handleNodeClick = (id: number) => {
    setSelectedNode(data[id]);
    setSelectedEdge(null);
    setAdditionalInfo('');
  };

  const handleAdditionalInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalInfo(event.target.value);
  };

  return (
    <div className="graph-container">
      <svg className="graph-svg">
        {Object.entries(data).map(([id, node]) => (
          <g key={id}>
            {node.children.map((childId) => {
              const edgeId = `${id}-${childId}`;
              return (
                <line
                  key={edgeId}
                  x1={node.x}
                  y1={node.y}
                  x2={data[childId].x}
                  y2={data[childId].y}
                  className={`edge ${highlightedEdges.includes(edgeId) ? 'highlighted' : ''}`}
                  onClick={() => handleEdgeClick(edgeId, +id, childId)}
                />
              );
            })}
            <g className="node-group" onClick={() => handleNodeClick(node.id)}>
            <circle
              cx={node.x}
              cy={node.y}
              r={10}
              className="node"
              onClick={() => handleNodeClick(node.id)}
            />
            <text
              x={node.x}
              y={node.y + 3} // Adjust the y-coordinate for proper placement
              className="node-number"
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#fff"
            >
              {id}
            </text>
            </g>
          </g>
        ))}
      </svg>
      <div className="additional-info">
        {selectedNodes && (
          <div className="selected-nodes">
            Nodes: {selectedNodes[0]} - {selectedNodes[1]}
          </div>
        )}
        {selectedNode && (
          <div className="selected-node">
            <h3>Node {selectedNode.id}</h3>
            <p>X: {selectedNode.x}</p>
            <p>Y: {selectedNode.y}</p>
            <p>Children: {selectedNode.children.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState('');
  const [data, setData] = useState<Graph | null>(null);

  const handleJsonSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      setData(parsedData);
    } catch (error) {
      alert('Invalid JSON data');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 style={{textAlign:'center'}}>Graph Network </h1>
        <div className="json-input">
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder="Enter JSON data"
          />
          <button onClick={handleJsonSubmit}>Submit</button>
        </div>
      </header>
      <main className="main">
        {data ? (
          <GraphNetwork data={data} />
        ) : (
          <div className="no-data">No data available</div>
        )}
      </main>
      <footer className="footer">Powered by React + TSX and Vite</footer>
    </div>
  );
};

export default App;

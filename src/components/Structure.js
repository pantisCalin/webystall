import { useRef, useEffect } from "react";
import "./Structure.css";

const Structure = ({
  stretches,
  matrixMultiplication,
  removedData,
  selectedPoint,
  species,
  state,
  angles,
  changeOnListener,
  releaseClick,
  performClick,
  visualDistance,
  zoomInOut,
  allMultiSpec,
  dataX,
  dataY,
  dataZ,
}) => {
  const colors = [
    "#0cc202",
    "#092d5d",
    "#0c808c",
    "#069bcf",
    "#0031d3",
    "#0223b8",
    "#04d318",
    "#01a383",
    "#0662cb",
    "#0584a1",
    "#0c51c0",
    "#0dee70",
    "#0e2d9e",
    "#0790ae",
    "#0b602d",
    "#0c9ea0",
    "#072938",
    "#086696",
    "#09d986",
    "#0737b8",
    "#0a4094",
    "#06813a",
    "#0d8be6",
    "#03cd6e",
    "#019508",
    "#0d0dd3",
    "#081db8",
    "#0d3a87",
    "#08e56b",
    "#03aebd",
    "#007f05",
    "#0a05b9",
    "#0ab740",
    "#01eb99",
    "#0089f6",
    "#085e0f",
    "#07a0f4",
    "#05b2cc",
    "#0293a7",
    "#0c7e6a",
    "#0ae78c",
    "#0afa6e",
    "#03c3de",
    "#0778d5",
    "#02503a",
    "#0de639",
    "#0175e3",
    "#099b88",
    "#0c3b6e",
    "#087132",
    "#026a65",
    "#033b21",
    "#0e7e49",
    "#09e4b3",
    "#0046f9",
    "#0d5a6f",
    "#02965a",
    "#0686f9",
    "#08a1f4",
    "#050b34",
    "#0983af",
    "#0e20b8",
    "#0a5ab4",
    "#0c671b",
    "#0b1026",
    "#078049",
    "#0d668c",
    "#05753a",
    "#0abfcf",
    "#075989",
    "#02a87d",
    "#0dd1cc",
    "#06bb46",
    "#0c5ea8",
    "#09750b",
    "#08b0e3",
    "#0e0c93",
    "#04b0e7",
    "#0a434c",
    "#0b7854",
    "#01afba",
    "#0c134e",
    "#072783",
    "#00dcd6",
    "#0e257f",
    "#02145f",
    "#0b1396",
    "#0bbc51",
    "#0be1c7",
    "#0a7a12",
    "#0bfa29",
    "#06ad45",
    "#04efb7",
    "#075684",
    "#03d3f6",
    "#09745f",
    "#07f9b2",
    "#0515c4",
    "#024522",
    "#09702d",
    "#0355eb",
    "#0b5c3a",
    "#074907",
    "#0833a5",
    "#05411f",
    "#0758af",
    "#094c70",
    "#01ca27",
    "#0ea7a5",
    "#072371",
    "#0d9ee3",
    "#03d90f",
    "#03ce85",
    "#0b6186",
    "#05499c",
    "#099f3d",
    "#088c0f",
    "#0807c2",
    "#0b0cbd",
    "#003ba5",
  ];
  const atomDimensions =
    "0.53	0.31	1.67	1.12	0.87	0.67	0.56	0.48	0.42	0.38	1.9	1.45	1.18	1.11	0.98	0.88	0.79	0.71	2.43	1.94	1.84	1.76	1.71	1.66	1.61	1.56	1.52	1.49	1.45	1.42	1.36	1.25	1.14	1.03	0.94	0.88	2.65	2.19	2.12	2.06	1.98	1.9	1.83	1.78	1.73	1.69	1.65	1.61	1.56	1.45	1.33	1.23	1.15	1.08	2.98	2.53	1.95	1.85	2.47	2.06	2.05	2.38	2.31	2.33	2.25	2.28	2.26	2.26	2.22	2.22	2.17	2.08	2	1.93	1.88	1.85	1.8	1.77	1.74	1.71	1.56	1.54	1.43	1.35	1.27	1.2			1.95	1.8	1.8	1.75	1.75	1.75	1.75".split(
      "\t"
    );
  let heightCanvas = 800;
  let widthCanvas = 800;
  let minimumOfXAxis = -visualDistance;
  let minimumOfYAxis = -visualDistance;
  let maximumOfXAxis = visualDistance;
  let maximumOfYAxis = visualDistance;

  const xyPosition = (coordinates) => {
    const canvasXCoordinate =
      ((coordinates[0] - minimumOfXAxis) * widthCanvas) /
      (maximumOfXAxis - minimumOfXAxis);
    const canvasYCoordinate =
      heightCanvas -
      ((coordinates[1] - minimumOfYAxis) * heightCanvas) /
        (maximumOfYAxis - minimumOfYAxis);
    return [canvasXCoordinate, canvasYCoordinate];
  };

  const projectionFunction = (coordinates) => {
    let Rx = [
      [1, 0, 0],
      [
        0,
        Math.cos((angles[1] * Math.PI) / 180),
        -Math.sin((angles[1] * Math.PI) / 180),
      ],
      [
        0,
        Math.sin((angles[1] * Math.PI) / 180),
        Math.cos((angles[1] * Math.PI) / 180),
      ],
    ];
    let Rz = [
      [
        Math.cos((angles[0] * Math.PI) / 180),
        -Math.sin((angles[0] * Math.PI) / 180),
        0,
      ],
      [
        Math.sin((angles[0] * Math.PI) / 180),
        Math.cos((angles[0] * Math.PI) / 180),
        0,
      ],
      [0, 0, 1],
    ];

    let vector = [];
    coordinates.forEach((element) => {
      vector.push([element]);
    });
    let resultant = matrixMultiplication(Rz, Rx);
    let [xReturn, yReturn, zReturn] = matrixMultiplication(
      resultant,
      vector
    )[0];
    return [xReturn, yReturn, zReturn];
  };

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = widthCanvas;
    canvas.height = heightCanvas;
    if (state.showAxis) {
      ctx.lineWidth = 2;
      let center = xyPosition(projectionFunction([0, 0, 0]));
      let pointsAxis = [
        [visualDistance / 1.6, 0, 0],
        [0, visualDistance / 1.6, 0],
        [0, 0, visualDistance / 1.6],
      ];
      ctx.beginPath();
      pointsAxis.forEach((element) => {
        let pCor = xyPosition(projectionFunction(element));
        ctx.moveTo(center[0], center[1]);
        ctx.lineTo(pCor[0], pCor[1]);
        ctx.stroke();
      });
    }
    let transposeMatrix = [];
    for (let tr = 0; tr < dataX.length; tr++) {
      let onProjectionData = projectionFunction([
        dataX[tr],
        dataY[tr],
        dataZ[tr],
      ]);
      transposeMatrix = [
        ...transposeMatrix,
        [onProjectionData, allMultiSpec[tr], tr],
      ];
    }
    let sortedPoints = transposeMatrix.sort((a, b) => {
      return b[0][2] - a[0][2];
    });

    for (let i = 0; i < dataX.length; i++) {
      if (removedData.includes(sortedPoints[i][2])) {
        continue;
      } else {
        let canvasCoordinates = xyPosition(sortedPoints[i][0]);
        let atomDimension = 1;

        if (sortedPoints[i][2] === selectedPoint) {
          atomDimension = 300 * atomDimensions[parseInt(sortedPoints[i][1])];
        } else {
          atomDimension = 200 * atomDimensions[parseInt(sortedPoints[i][1])];
        }

        let atomRadius = atomDimension / visualDistance || 2;
        let grd = ctx.createRadialGradient(
          canvasCoordinates[0],
          canvasCoordinates[1],
          atomRadius / 1,
          canvasCoordinates[0] + atomRadius / 2,
          canvasCoordinates[1] - atomRadius / 2,
          atomRadius / 1000
        );

        grd.addColorStop(1, "wheat");

        if (sortedPoints[i][2] === selectedPoint) {
          grd.addColorStop(0, "black");
        } else {
          let currentColor = colors[parseInt(sortedPoints[i][1])] || "blue";
          grd.addColorStop(0, currentColor);
        }

        ctx.fillStyle = grd;
        ctx.lineWidth = 10 / visualDistance;
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(
          canvasCoordinates[0],
          canvasCoordinates[1],
          atomRadius,
          0,
          10 * Math.PI
        );
        ctx.fill();

        for (let j = i; j < dataX.length; j++) {
          if (removedData.includes(sortedPoints[j][2])) {
            continue;
          } else {
            let realDistance = Math.sqrt(
              (sortedPoints[i][0][0] - sortedPoints[j][0][0]) ** 2 +
                (sortedPoints[i][0][1] - sortedPoints[j][0][1]) ** 2 +
                (sortedPoints[i][0][2] - sortedPoints[j][0][2]) ** 2
            );
            if (realDistance < state.maxBound) {
              ctx.lineWidth = 100 / visualDistance;
              let projectedPoint = xyPosition(sortedPoints[j][0]);
              ctx.beginPath();
              ctx.lineCap = "round";
              ctx.strokeStyle = ctx.fillStyle;
              ctx.moveTo(canvasCoordinates[0], canvasCoordinates[1]);

              if (sortedPoints[i][1] !== sortedPoints[j][1]) {
                let theHalf = xyPosition([
                  (sortedPoints[i][0][0] + sortedPoints[j][0][0]) / 2,
                  (sortedPoints[i][0][1] + sortedPoints[j][0][1]) / 2,
                  (sortedPoints[i][0][2] + sortedPoints[j][0][2]) / 2,
                ]);
                ctx.lineTo(theHalf[0], theHalf[1]);
                ctx.stroke();
                ctx.beginPath();
                if (sortedPoints[j][2] === selectedPoint) {
                  ctx.strokeStyle = "black";
                } else {
                  let currentColor =
                    colors[parseInt(sortedPoints[j][1])] || "blue";
                  ctx.strokeStyle = currentColor;
                }
                ctx.moveTo(theHalf[0], theHalf[1]);
              }
              ctx.lineTo(projectedPoint[0], projectedPoint[1]);
              ctx.stroke();
            }
          }
        }
      }
    }
  }, [
    species,
    angles,
    visualDistance,
    state,
    dataX,
    selectedPoint,
    removedData,
  ]);
  return (
    <div className="canvasDiv">
      <canvas
        ref={canvasRef}
        onMouseDown={performClick}
        onMouseMove={changeOnListener}
        onMouseUp={releaseClick}
        onWheel={zoomInOut}
      />
    </div>
  );
};

export default Structure;

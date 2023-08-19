import Plotly from "plotly.js";
import Plot from "react-plotly.js"

const generateDummyData = (nRows = 10, nCols = 5) => {
  const sampleAnnotationLabels = Array.from({ length: nCols }).map((_, i) => `Sample ${i + 1}`);
  const geneLabels = Array.from({ length: nRows }).map((_, i) => `Gene ${i + 1}`);
  const tpmMatrix = Array(geneLabels.length)
    .fill(null)
    .map((_, i) =>
      Array(sampleAnnotationLabels.length)
        .fill(null)
        .map((_, j) => (i + j) % 7 ? (Math.random() * 100).toFixed(3) : 0)
    );

  return [sampleAnnotationLabels, geneLabels, tpmMatrix];
}

const ExpressionHeatmap = ({ hideLoader }) => {

  const [sampleAnnotationLabels, geneLabels, tpmMatrix] = generateDummyData(100, 20);
  // const height = geneLabels.length > 50 ? 900 : 600;
  const height = 600 + Math.max(0, geneLabels.length - 40) * 10;

  const downloadIcon = {
    width: 500,
    height: 600,
    path: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z",
  };

  return (
    <div className="my-4">
      {/* <pre>{JSON.stringify(tpmMatrix)}</pre> */}
      <Plot
        className="overflow-hidden border border-stone-300 rounded-2xl shadow-lg min-h-[600px] w-full"
        data={[
          {
            type: "heatmap",
            z: tpmMatrix,
            x: sampleAnnotationLabels,
            y: geneLabels,
          },
        ]}
        layout={{
          xaxis: { automargin: true, tickangle: 45 },
          yaxis: { automargin: true, },
          height: height,
          autosize: true,
          modebar: { orientation: "v" },
          dragmode: "pan",
        }}
        config={{
          responsive: true,
          displaylogo: false,
          displayModeBar: true,
          modeBarButtonsToAdd: [
            {
              title: "Download as svg",
              name: "Download as svg",
              icon: downloadIcon,
              click: (gd) => {
                Plotly.downloadImage(gd, {
                  format: "svg",
                  width: 800,
                  height: 600,
                  scale: 4,
                  filename: `heatmap`,
                });
              },
            },
            {
              title: "Download as png",
              name: "Download as png",
              icon: downloadIcon,
              click: (gd) => {
                Plotly.downloadImage(gd, {
                  format: "png",
                  width: 800,
                  height: 600,
                  scale: 4,
                  filename: `heatmap`,
                });
              },
            },
          ],
          modeBarButtonsToRemove: [
            "select2d",
            "lasso2d",
            "zoomIn2d",
            "zoomOut2d",
            "autoScale2d",
            "toImage",
          ],
          scrollZoom: true,
        }}
        onInitialized={hideLoader}
      ></Plot>
    </div>
  );
}

export default ExpressionHeatmap

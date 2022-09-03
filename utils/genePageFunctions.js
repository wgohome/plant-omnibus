// This JS file contains functions and constants that are to be used in the creation of
// gene expression plots

// == CONSTANTS ==
// Just like my repo, I assume that there are six different colors for six
// different possible groupings:
const groupColors = [
  {r : 170, g : 221, b : 255},
  {r : 171, g : 255, b : 205},
  {r : 255, g : 203, b : 171},
  {r : 219, g : 171, b : 255},
  {r : 255, g : 171, b : 233},
  {r : 255, g : 171, b : 171}
]

// Save the camera's SVG image as a list of numbers:
const camera = {
    'width': 1000,
    'height': 1000,
    'path': 'm500 450c-83 0-150-67-150-150 0-83 67-150 150-150 83 0 150 67 150 150 0 83-67 150-150 150z m400 150h-120c-16 0-34 13-39 29l-31 93c-6 15-23 28-40 28h-340c-16 0-34-13-39-28l-31-94c-6-15-23-28-40-28h-120c-55 0-100-45-100-100v-450c0-55 45-100 100-100h800c55 0 100 45 100 100v450c0 55-45 100-100 100z m-400-550c-138 0-250 112-250 250 0 138 112 250 250 250 138 0 250-112 250-250 0-138-112-250-250-250z m365 380c-19 0-35 16-35 35 0 19 16 35 35 35 19 0 35-16 35-35 0-19-16-35-35-35z',
    'transform': 'matrix(1 0 0 -1 0 850)'
}

// We will use these plotly options to generate the boxplots:
const imageOptions = {
  modeBarButtonsToAdd: [{
    name: "Download as SVG",
    icon: camera,
    click: function(gd) {
      Plotly.downloadImage(gd, {format : "svg"})
    }
  },
  {
    name: "Download as JPEG",
    icon: camera,
    click: function(gd) {
      Plotly.downloadImage(gd, {format: "jpeg"})
    }
  }]
}

// == FUNCTIONS ==

// Fetches the relevant information that is needed to display onto the tables;
// this function also takes in a JSON payload that has been stored in an array
// and the kind of information to be extracted.
function fetchTableInfo(payload, infoType) {
  let dataToShow = [];

  payload.forEach(entry => {
      if (infoType === 'po') {
        dataToShow.push({
          domain: 'Test domain',
          desc: 'Test desc',
          start: '0',
          stop: '0'
        });
      } else if (infoType === "go") {
        dataToShow.push({
          type : 'Test',
          go : "Test GO",
          name : "Test name"
        });
      } else if (infoType === "gene family") {
        dataToShow.push({
          family : "family",
          desc : "desc"
        });
      } else if (infoType === "mapman gene annotations") {
        dataToShow.push({
          type : "anno",
          go : "go",
          evidence : "???"
        });
      } else if (infoType === "mapman terms") {
        dataToShow.push({
          term : "Test term",
          description: "Test desc"
        });
      } else {
        throw new Error("Unable to extract the data requested - has infoType been misspelled?");
      }
    })

  return dataToShow;
}

// Assigns a random color as of now - used to color the boxplots.  For now,
// this function just generates a random in the range [0, 5].
function assignColors(label) {
  // TODO: CHANGE THIS LATER!
  return 0;
}

// Fetches the data for the plots that we are the most interested in.  Like
// fetchTableInfo, this function also takes in a JSON payload stored in an array
// and returns a map of values that can then be used to make graphs with.
function fetchPlotData(payload, type) {
  let dataToShow = [];

  if (type === 'boxplot') {
    payload.forEach(dp => {
      let labelData = [];
      let colorGroup = assignColors(dp.label);

      dataToShow.push({
        y : (function(dp) {
          let data = [];
          dp.samples.forEach(sample => data.push(sample.tpm));
          return data;
        })(dp),
        type : "box",
        name : dp.label,
        showlegend: false,
        line: {width: 2, color: `rbga(${groupColors[colorGroup].r}, ${groupColors[colorGroup].g}, ${groupColors[colorGroup].b}, 1)`},
        fillcolor: `rbga(${groupColors[colorGroup].r}, ${groupColors[colorGroup].g}, ${groupColors[colorGroup].b}, 0.5)`,
        boxpoints: undefined,
        jitter : undefined,
        pointpos: undefined,
        marker: {opacity : 0}
      });
    });
  } else if (type === "heatmap") {
    console.log('Do something here!');
    // TODO: Write up some code for this bit!
  } else {
    throw new Error("Unable to fetch the data - has the type been misspelled?");
  }

  return dataToShow;
}

export { fetchTableInfo, fetchPlotData, imageOptions, assignColors, groupColors }

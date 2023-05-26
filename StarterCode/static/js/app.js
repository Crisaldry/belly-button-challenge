// init - initial page
function innit(){
    // Load the data and populate the dropdown menu when the page loads
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    console.log(data);
    console.log(data.names[0])
  
     // Populate the dropdown menu with sample names
     var dropdown = d3.select("#selDataset");
     data.names.forEach(function(name) {
       dropdown.append("option").text(name).property("value", name);
     });
  
     // Populate the dropdown menu with sample names
    var dropdown = d3.select("#selDataset");
    data.names.forEach(function(name) {
      dropdown.append("option").text(name).property("value", name);
    });

    dropdown.on("change", function() {
        var selectedSample = dropdown.property("value");
        buildCharts(selectedSample);
        buildpanel(selectedSample);
        buildBubbleChart(selectedSample);
      });
  
    // Call the buildCharts function with the first sample ID when the page loads
    buildCharts(data.names[0]);
    // }).catch(function(error) {
    // console.log(error);
    //});
  
    buildpanel(data.names[0])

    buildBubbleChart(data.names[0]);
  
  })
  }  
  // Define the buildCharts function to generate the bar graph
  function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    // console.log(data);
      // Create variables to store the top 10 OTUs found in the sample
      var sampleData = data.samples.find(s => s.id === sample);
      if (!sampleData) {
        console.error(`No data found for sample ID ${sample}`);
        return;
      }

      // Filter function that filters so that the ID matches the sample -- what ever sample is is the number we want the data to populate for
      var sampleValues = sampleData;
      var otuIDs = sampleValues.otu_ids;
      var otuLabels = sampleValues.otu_labels;
      var sample_values = sampleValues.sample_values;

      //console.log(sampleValues)
      // console.log(sample) 
      console.log(sampleData)
  
      // Use the `slice()` method to select the top 10 OTUs and reverse the order
      var top10samples = sample_values.slice(0,10).reverse();
      var top10OTUIDs = otuIDs.slice(0, 10).reverse();
      var top10OTULabels = otuLabels.slice(0, 10).reverse();
  
      // Create a trace for the horizontal bar chart
      var trace = {
        x: top10samples,
        y: top10OTUIDs.map(id => `OTU ${id}`),
        text: top10OTULabels,
        type: "bar",
        orientation: "h"
      };
  
      // Create a data array for the plot
      var data = [trace];
  
      // Define the plot layout
      var layout = {
        title: "Top 10 OTUs Found in Sample",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
      };
  
      // Use `Plotly.newPlot()` to create the plot
      Plotly.newPlot("bar", data, layout);
    });
  }
  
  function buildpanel(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
      var metadata = data.metadata.find(m => m.id.toString() === sample);
  
      const metadataElement = document.getElementById("sample-metadata");

      metadataElement.innerHTML = "";
  
      // Loop through each key-value pair 
      Object.entries(metadata).forEach(([key, value]) => {
        // Create a new paragraph element
        const paragraph = document.createElement("p");
        // Set the text content of the paragraph to the key-value pair
        paragraph.textContent = `${key}: ${value}`;
        // Append the paragraph to the metadata element
        metadataElement.appendChild(paragraph);
      });
    });
  }
  
  function buildBubbleChart(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
      console.log(data);
      var sampleData = data.samples.find(s => s.id === sample);
      if (!sampleData) {
        console.error(`No data found for sample ID ${sample}`);
        return;
      }
      var otuIDs = sampleData.otu_ids;
      var sampleValues = sampleData.sample_values;
      var otuLabels = sampleData.otu_labels;
  
      // Create a trace for the bubble chart
      var trace = {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIDs
        }
      };
  
      // Create a data array for the plot
      var data = [trace];
  
      // Define the plot layout
      var layout = {
        title: "Sample Values vs. OTU IDs",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
      };
  
      // Use `Plotly.newPlot()` to create the plot
      Plotly.newPlot("bubble", data, layout);
    });
  }
  

  // Call the buildCharts function whenever the user selects a new sample from the dropdown menu
    d3.selectAll("#selDataset").on("change", function() {
    var selectedSample = d3.select(this).property("value");
    buildCharts(selectedSample);
    buildpanel(selectedSample);
  });
  
  // Call the buildBubbleChart function whenever the user selects a new sample from the dropdown menu
    d3.selectAll("#selDataset").on("change", function() {
    var selectedSample = d3.select(this).property("value");
    buildCharts(selectedSample);
    buildBubbleChart(selectedSample);
  });
  
  
  innit()
  
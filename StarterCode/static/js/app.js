function getData(id) {
    d3.json("StarterCode/samples.json").then((incomingData) => {
        console.log(incomingData);
        var data = incomingData
    
    //IDs
        var bioidList = incomingData.bioidList.filter(b => b.id.toString() === id)[0];
        console.log(bioidList);

        var sliceddata = bioidList.sliced_data.slice(0, 10).reverse();

        var OTU = (bioidList.otu_ids.slice(0, 10)).reverse();

        var OTU_reverse_id = OTU.map(m => "OTU " + m)

        var labels = bioidList.otu_labels.slice(0, 10);

        var trace1 = {
            x: sliceddata,
            y: OTU_reverse_id,
            text: labels,
            type: "bar",
            orientation: "h",
        };

        var t1data = [trace1];

        var layout = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        Plotly.newPlot("bar", t1data, layout);

        var trace2 = {
            x: bioidList.otu_ids,
            y: bioidList.sliced_data, 
            mode: "markers",
            marker: {
                size: bioidList.sliced_data,
                color: bioidList.otu_ids
            },
            text: bioidList.otu_labels
        };

        var layout_t = {
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 900
        };

        var t2data = [trace2];

        Plotly.newPlot("bubble", t2data, layout_t);

    d3.selectAll("#selDataset").on("change", refreshData);

    function updateData() {
        var dropMenu = d3.select("#selDataset");

        var peopleID = dropMenu.property("value");
        console.log(peopleID);

        console.log(data)

        for (var i = 0; i < data.names.length; i++) {
            if (peopleID === data.names[i]) {
              updatePlots(i);
              return
            }
        }

    }
    });
}
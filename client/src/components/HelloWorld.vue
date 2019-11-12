<template>
  <div class="hello">
    <div id="viz"></div>
    <button @click="drawSvg" color="primary">text</button>
    <button @click="saveImg" color="primary">to imag</button>
    <h1>{{ msg }}</h1>

    <div>
      {{ name }} - {{ variant2 }}
      <input type="text" placeholder="name" v-model="name" />
      <input type="text" placeholder="receiptId" v-model="receiptId" />
      <input type="text" placeholder="variant1" v-model="variant1" />
      <input type="text" placeholder="variant2" v-model="variant2" />
      <input type="text" placeholder="gene1" v-model="gene1" />
      <input type="text" placeholder="gene2" v-model="gene2" />
    </div>
    <button color="primary" @click="createAndDownloadPDF">Download pdf</button>

    <br><br>

    <button color="primary" @click="createAnalysisPDF">Analysis pdf</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
  </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios';
import { saveAs } from 'file-saver';
import Analysis_platinum from '../data/analysis_platinum.json';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      name: "",
      receiptId: 0,
      variant1: 0,
      variant2: 0,
      gene1: "",
      gene2: "",
      imageSrc: "",
      Analysis_platinum_sample: null,
    }
  },
  methods: {
    drawSvg(){
      // var sampleSVG = d3.select("#viz")
      //     .append("svg")
      //     .attr("width", 100)
      //     .attr("height", 100);
      //
      // sampleSVG.append("circle")
      //     .style("stroke", "gray")
      //     .style("fill", "white")
      //     .attr("r", 40)
      //     .attr("cx", 50)
      //     .attr("cy", 50)
      //     .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
      //     .on("mouseout", function(){d3.select(this).style("fill", "white");});

      // set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 250 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svG = d3.select("#viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Create data
var data = [ {x:10, y:20}, {x:40, y:90}, {x:80, y:50} ]

// X scale and Axis
var x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
svG
  .append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// X scale and Axis
var y = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([height, 0]);       // This is the corresponding value I want in Pixel
svG
  .append('g')
  .call(d3.axisLeft(y));

// Add 3 dots for 0, 50 and 100%
svG
  .selectAll("whatever")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return x(d.x) })
    .attr("cy", function(d){ return y(d.y) })
    .attr("r", 7)



    },
    createAndDownloadPDF(){
      console.log("this.name", this.name);
      var html = d3.select("svg")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML;

      console.log(html);
      var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
      console.log("imgsrc", imgsrc)
      this.imageSrc = imgsrc;


      var state = {
        "name": this.name,
        "receiptId": this.receiptId,
        "variant1": this.variant1,
        "variant2": this.variant2,
        "gene1": this.gene1,
        "gene2": this.gene2,
        "imageSrc": this.imageSrc
      }
      console.log("state: ", state)

      axios.post('http://localhost:4046/create-pdf', state)
        .then(()=> axios.get('http://localhost:4046/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

          saveAs(pdfBlob, "newPdf.pdf")
        })
    },
    createAnalysisPDF(){
      // http://nv-dev-new.iobio.io/analysistoreport/create-pdf
      // http://nv-dev-new.iobio.io/analysistoreport/fetch-pdf
      axios.post('http://localhost:4046/analysistoreport/create-pdf', this.Analysis_platinum_sample)
        .then(()=> axios.get('http://localhost:4046/analysistoreport/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

          saveAs(pdfBlob, "analysis.pdf")
        })
    },
    saveImg(){
      var html = d3.select("svg")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML;

      console.log(html);
      var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
      console.log("imgsrc", imgsrc)
      this.imageSrc = imgsrc;
    }
  },
  mounted(){
    this.Analysis_platinum_sample = Analysis_platinum;
    console.log("this.Analysis_platinum_sample", this.Analysis_platinum_sample)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
  fill: steelblue;
}

.bar:hover {
  fill: orange;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

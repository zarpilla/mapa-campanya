import TooltipComponent from './tooltip-component.js'
import SVGComponent from './svg-component.js'

export default {
	components: {
		TooltipComponent, SVGComponent
	},
  data() {
    return {
      edges: [
        {
          name: "Alcanar",
          coordinates: [0.514695, 40.523108],
          position: { x: 720, y: 987 }, // (2071 - 761)
        },
        {
          name: "Cap de creus",
          coordinates: [3.3222069, 42.319509],
          position: { x: 1535, y: 274 }, // (2071 - 161)
        },
      ],
      tooltip: null,
      cities: [
        {
          name: "alcanar",
          comarca: "Montsià",
          coordinates: [40.523108, 0.514695],
        },
        {
          name: "creus",
          comarca: "Alt Empordà",
          coordinates: [42.319509, 3.3222069],
        },
        {
          name: "SJA",
          comarca: "Ripollès",
          coordinates: [42.2351839, 2.2863717],
        },
        {
          name: "Flix",
          comarca: "Ribera d'Ebre",
          coordinates: [41.2294022, 0.5366484],
        },
        {
          name: "Palma de Mallorca",
          comarca: "Palma",
          coordinates: [39.5312096, 2.6231478],
        },
        {
          name: "Vic",
          comarca: "Osona",
          coordinates: [41.9335941, 2.2387488],
        },
        {
          name: "bcn",
          comarca: "Barcelonés",
          coordinates: [41.3903008, 2.2014871],
        },
        {
          name: "sort",
          comarca: "Pallars Sobirà",
          coordinates: [42.4103922, 1.1266764],
        },
        {
          name: "seuurgell",
          comarca: "Alt Urgell",
          coordinates: [42.3562398, 1.4512587],
        },
      ],
    };
  },
  mounted() {
    var width = 1103.9,
      height = 1190.6,
      centered;

    var projection = d3
      .geoAugust()
      .center([0.204695, 41.523108])
      .scale(10480)
      .translate([360, 344]);

    //   var projection = d3
    //   .geoBaker()
    //   .center([ 0.204695, 41.523108])
    //   .scale(9650)
    //   .translate([ 360, 344 ])

    // var projection = d3
    // .geoMiller()
    // .center([ 0.204695, 41.523108])
    // .scale(9480)
    // .translate([ 360, 344 ])

    // let geoGenerator = d3.geoPath().projection(projection);

    var svg = d3.select("body").select("svg");
    var g = svg.append("g");

    // document.getElementById('main-div').addEventListener("click", (event) => this.tooltip = null);

    // var path = d3.path()    .projection(projection);

    d3.json("readme.json", (json) => {
      console.log("json", json);

      json.features.forEach((f, i) => {
        console.log("f", f.geometry.coordinates);

        var latitude = f.geometry.coordinates[1];
        var longitude = f.geometry.coordinates[0];
        var coordinates = projection([longitude, latitude]);
        console.log("coordinates", coordinates);
        g.append("svg:circle")
          .attr("cx", coordinates[0])
          .attr("cy", coordinates[1])
          .attr("r", 3)
          // .attr("stroke", "red")
          .attr("fill", "#232324")
          .attr("class", "city")
          .attr("id", `city-${i}`);

        const cityPoint = document.getElementById(`city-${i}`);
        cityPoint.addEventListener("click", (event) =>
          this.drawTooltip(event, coordinates[0], coordinates[1], f)
        );
      });
    });
  },
  methods: {
    drawTooltip(event, x, y, city) {
      this.tooltip = city;
      const tooltip = document.getElementById("tooltip");
      tooltip.style.position = "absolute";
      tooltip.style.left = event.pageX + "px";
      tooltip.style.top = ( event.pageY + 20) + "px";
      tooltip.style.visibility = "visible";
    },
    projection(coordinates) {
      const p = {
        x: 290.29262529572895 * coordinates[1] + 570.5878372234148,
        y: -396.9047000085179 * coordinates[0] + 17070.812024152772,
      };
      return [p.x, p.y];
    },
    clickOnMap(event) {
		console.log('clickOnMap')
      this.tooltip = null;
    },
    close() {
      this.tooltip = null;
    },
    printMousePos(event) {
      // const positions = { clientX: event.clientX, clientY: event.clientY };
      // console.log("positions", positions);
      // document.body.textContent =
      //   "clientX: " + event.clientX +
      //   " - clientY: " + event.clientY;
    },
  },
  template: `
    <div>
        <div class="svgs" id="main-div">
            
        	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 1103.9 1190.6" style="enable-background:new 0 0 1103.9 1190.6;" xml:space="preserve" preserveAspectRatio="none">
			<style type="text/css">
				.st0{fill:#FFDB00;}
			</style>
			<SVGComponent @click="clickOnMap"></SVGComponent>

			</svg>
			<TooltipComponent @close="clickOnMap" :tooltip="tooltip"></TooltipComponent>
        </div>
    </div>
    `,
};

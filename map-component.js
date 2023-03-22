import TooltipComponent from "./tooltip-component.js";
import SVGComponent from "./svg-component.js";
import CustomSelect from "./select-component.js";

// import * as _ from 'lodash'
export default {
  components: {
    TooltipComponent,
    SVGComponent,
    CustomSelect,
  },
  data() {
    return {
      tooltip: null,
      comarques: [],
      comarca: 0,
      municipis: [],
      municipi: 0,
    };
  },
  computed: {
    comarquesSorted() {
      return _.concat(
        { id: 0, name: "-- Comarca --" },
        _.orderBy(this.comarques, "name")
      );
    },
    municipisSorted() {
      return _.concat(
        { id: 0, name: "-- Municipi --" },
        _.orderBy(this.municipis, "name")
      ); // .filter(m => m.comarca === this.comarca);
    },
  },
  mounted() {
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

    var svg = d3.select("body").select("svg");
    var g = svg.append("g");

    d3.json("cities.json", (json) => {
      console.log("json", json);

      json.features.forEach((f, i) => {
        console.log("f", f);
        if (!this.comarques.find((c) => c.name === f.properties.comarca)) {
          this.comarques.push({ id: i + 1, name: f.properties.comarca });
        }
        const comarcaId = this.comarques.find(
          (c) => c.name === f.properties.comarca
        ).id;
        if (!this.municipis.find((c) => c.name === f.properties.name)) {
          this.municipis.push({
            id: i + 1,
            name: f.properties.name,
            comarca: comarcaId,
          });
        }

        const municipiId = this.municipis.find(
          (c) => c.name === f.properties.name
        ).id;

        var latitude = f.geometry.coordinates[1];
        var longitude = f.geometry.coordinates[0];
        var coordinates = projection([longitude, latitude]);
        console.log("coordinates", coordinates);
        g.append("svg:circle")
          .attr("cx", coordinates[0])
          .attr("cy", coordinates[1])
          .attr("r", 3)
          .attr("fill", "#232324")
          .attr("class", `city comarca-${comarcaId} municipi-${municipiId}`)
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
      tooltip.style.top = event.pageY + 20 + "px";
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
      console.log("clickOnMap");
      this.tooltip = null;
    },
    close() {
      this.tooltip = null;
    },
    changeComarca(value) {
      this.tooltip = null;      
      this.comarca = value.id;
      const selected = document.querySelectorAll(`.comarca-${value.id}`);
      const cities = document.querySelectorAll(`.city`);
      if (value.id > 0) {
        cities.forEach((c) => {
          c.classList.remove("active");
          c.classList.add("inactive");
        });
        selected.forEach((c) => {
          c.classList.add("active");
        });
      } else {
        cities.forEach((c) => {
          c.classList.remove("inactive");
          c.classList.add("active");
        });
      }
    },
    changeCity(value) {
      this.tooltip = null;
      const selected = document.querySelectorAll(`.municipi-${value.id}`);
      const cities = document.querySelectorAll(`.city`);
      if (value.id > 0) {
        cities.forEach((c) => {
          c.classList.remove("active");
          c.classList.add("inactive");
        });
        selected.forEach((c) => {
          c.classList.add("active");
        });
      } else {
        cities.forEach((c) => {
          c.classList.remove("inactive");
          c.classList.add("active");
        });
      }
    },
  },
  template: `
    <div>
		<div class="header">
		<h1>CERCADOR DE CANDIDATURES</h1>

			<div class="selectors flex">
				<CustomSelect
				:options="comarquesSorted"
				:default="'-- Comarca --'"
				class="select"
				@input="changeComarca" />

				<CustomSelect
				:options="municipisSorted"
				:default="'-- Municipi --'"
				class="select"
				@input="changeCity" />
				
				
			</div>
		</div>
	
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

// import * as _ from 'lodash'
export default {
  data() {
    return {
      csv: `Alcanar;CUP Alcanar;El Montsià;0.514695;40.523108;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Cap de creus;CUP;Alt Empordà;3.3222069;42.319509;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Palma de Mallorca;CUP;Palma de Mallorca;2.6231478;39.5312096;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Flix;CUP;La Ribera d'Ebre;0.5366484;41.2294022;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Barcelona;CUP;Barcelonès;2.1954494;41.3905194;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Sant Joan de les Abadesses;CUP;Ripollès;2.2863717;42.2351839;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Ripoll;CUP;Ripollès;2.176043;42.18974;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Vic;CUP;Osona;2.2387488;41.9335941;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
Sort;CUP;Pallars Sobirà;1.1266764;42.4103922;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200
La Seu d'Urgell;CUP;Alt Urgell;1.4512587;42.3562398;twitter;instagram;facebook;telegram;youtube;web;https://picsum.photos/324/200`,
    };
  },
  computed: {
    jsonFile() {
      const lines = this.csv.split("\n").map((f) => {
        return {
          type: "Feature",
          properties: {
            name: f.split(";")[0],
            candidatura: f.split(";")[1],
            comarca: f.split(";")[2],
            twitter: f.split(";")[5],
            instagram: f.split(";")[6],
            facebook: f.split(";")[7],            
            telegram: f.split(";")[8],
            youtube: f.split(";")[9],
            web: f.split(";")[10],
            foto: f.split(";")[11],
          },
          geometry: {
            type: "Point",
            coordinates: [f.split(";")[3], f.split(";")[4]]
          }
        };
      });
      return { type: "FeatureCollection", features: lines };
    },
  },
  mounted() {},
  methods: {
    copyToClipboard() {
      var copyText = document.getElementById("pre");

      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);

    },
  },
  template: `
    <div>
		<div class="header">
		<h1>CERCADOR DE CANDIDATURES</h1>
		</div>
    <div class="json-builder">
      <div class="help">
      Camps: 

      municipi;comarca;lng;lat;twitter;instagram;facebook;telegram;youtube;web;foto

      
      </div>
      <textarea class="textarea" v-model="csv" />
      <div class="help">
      JSON file:
      </div>
      <textarea id="pre" class="textarea">{{jsonFile}}</textarea>
      <button @click="copyToClipboard">Copia</button>
    </div>
    </div>
    `,
};

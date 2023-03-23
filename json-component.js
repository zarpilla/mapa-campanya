// import * as _ from 'lodash'
export default {
  data() {
    return {
      csv: `Alcanar;El Montsià;0.514695;40.523108;twitter;instagram;facebook;telegram;youtube;web
Cap de creus;Alt Empordà;3.3222069;42.319509;twitter;instagram;facebook;telegram;youtube;web
Palma de Mallorca;Palma de Mallorca;2.6231478;39.5312096;twitter;instagram;facebook;telegram;youtube;web
Flix;La Ribera d'Ebre;0.5366484;41.2294022;twitter;instagram;facebook;telegram;youtube;web
Barcelona;Barcelonès;2.1954494;41.3905194;twitter;instagram;facebook;telegram;youtube;web
Sant Joan de les Abadesses;Ripollès;2.2863717;42.2351839;twitter;instagram;facebook;telegram;youtube;web
Ripoll;Ripollès;2.176043;42.18974;twitter;instagram;facebook;telegram;youtube;web
Vic;Osona;2.2387488;41.9335941;twitter;instagram;facebook;telegram;youtube;web
Sort;Pallars Sobirà;1.1266764;42.4103922;twitter;instagram;facebook;telegram;youtube;web
La Seu d'Urgell;Alt Urgell;1.4512587;42.3562398;twitter;instagram;facebook;telegram;youtube;web`,
    };
  },
  computed: {
    jsonFile() {
      const lines = this.csv.split("\n").map((f) => {
        return {
          type: "Feature",
          properties: {
            name: f.split(";")[0],
            comarca: f.split(";")[1],
            twitter: f.split(";")[4],
            instagram: f.split(";")[5],
            facebook: f.split(";")[6],            
            telegram: f.split(";")[7],
            youtube: f.split(";")[8],
            web: f.split(";")[9],
          },
          geometry: {
            type: "Point",
            coordinates: [f.split(";")[2], f.split(";")[3]]
          }
        };
      });
      return { type: "FeatureCollection", features: lines };
    },
  },
  mounted() {},
  methods: {
    copyToClipboard() {
console.log('copyToClipboard')
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

      municipi;comarca;lng;lat;twitter;instagram;facebook;telegram;youtube;web

      
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

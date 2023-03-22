export default {
  data() {
    // return {
    //   show: false,
    // };
  },
  props: {
    tooltip: null,
  },
  mounted() {},
  methods: {
    close() {
      this.tooltip = null;
    },
    printMousePos(event) {},
  },
  template: `
    <div>
		<div v-show="tooltip" id="tooltip" class="tooltip">
			<div class="triangle"></div>
			<div class="flex">
				<img class="logo-cup" src="./assets/LogoCUP.svg" />
				
				<div class="row">
					<div v-if="tooltip" class="city-name">CUP {{ tooltip.properties.name }}</div>			
					<a href="#" class="close" @click="$emit('close')"></a>
					<div class="row">
						<div class="flex social">
							<img class="logo-social" src="./assets/twitter.svg" />
							<img class="logo-social" src="./assets/instagram.svg" />
							<img class="logo-social" src="./assets/facebook.svg" />				
							<img class="logo-social" src="./assets/telegram.svg" />
							<img class="logo-social" src="./assets/youtube.svg" />
						</div>
					</div>
					
				</div>
			</div>
			<div class="flex">
			<a href="#" class="web">WEB</a>					
			</div>
		</div>        
    </div>
    `,
};

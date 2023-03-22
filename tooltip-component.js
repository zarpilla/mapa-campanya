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
				
				<div class="row" v-if="tooltip">
					<div class="city-name">CUP {{ tooltip.properties.name }}</div>			
					<a href="#" class="close" @click="$emit('close')"></a>
					<div class="row">
						<div class="flex social">
							<a v-if="tooltip.properties.twitter" class="logo-social-link" :href="tooltip.properties.twitter" target="_blank">
								<img class="logo-social" src="./assets/twitter.svg" />
							</a>
							<a v-if="tooltip.properties.instagram" class="logo-social-link" :href="tooltip.properties.instagram" target="_blank">
								<img class="logo-social" src="./assets/instagram.svg" />
							</a>
							<a v-if="tooltip.properties.facebook" class="logo-social-link" :href="tooltip.properties.facebook" target="_blank">
								<img class="logo-social" src="./assets/facebook.svg" />				
							</a>
							<a v-if="tooltip.properties.telegram" class="logo-social-link" :href="tooltip.properties.telegram" target="_blank">
								<img class="logo-social" src="./assets/telegram.svg" />
							</a>
							<a v-if="tooltip.properties.youtube" class="logo-social-link" :href="tooltip.properties.youtube" target="_blank">
								<img class="logo-social" src="./assets/youtube.svg" />
							</a>
						</div>
					</div>
					
				</div>
			</div>
			<div class="flex" v-if="tooltip && tooltip.properties.web">
				<a :href="tooltip.properties.web" target="_blank" class="web">WEB</a>					
			</div>
		</div>        
    </div>
    `,
};

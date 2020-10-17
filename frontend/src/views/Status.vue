<template>
  <main id="confirmation">
    <p>Ordernummer {{latestOrder.orderNumber}}</p>
    <figure>
      <img src="../assets/drone.svg" alt="" class="drone">
      <img src="../assets/cup.svg" alt="" class="cup">
    </figure>
    <article v-if="isDelivered">
      <h1>Din order är levererad</h1>
    </article>
    <article v-else>
      <h1>Din beställning är på väg!</h1>
      <p>{{arrivesInMinutes}} minuter</p>
    </article>
    <button class="confirm-btn" @click="confirm" >Ok, cool!</button>
  </main>
</template>

<script>
  export default {
    name: 'status-page',
    data() {
      return {
        latestOrder: [],
        arrivesInMinutes: Number,
        isDelivered: Boolean
      };
    },
    async beforeMount() {
      this.latestOrder = await this.$store.getters.latestOrder;
      let dateNow = Math.floor(Date.now() / 1000);
      let etaTime = this.latestOrder.estimatedTimeArrival;
      this.arrivesInMinutes = Math.floor((etaTime - dateNow) / 60);
      this.isDelivered = Math.floor(Date.now() / 1000) > this.latestOrder.estimatedTimeArrival;
    },
    methods:{
      confirm() {
        this.$router.push('/profile')
      }
    }
  }
</script>
<template>
  <main id="profile">
    <article class="create-user" v-if="createUserForm">
      <img src="@/assets/userFormLogo.svg" alt="" />
      <h2>Välkommen till AirBean-familjen!</h2>
      <p>
        Genom att skapa ett konto nedan kan du spara och se din orderhistorik.
      </p>
      <section class="form-wrapper">
        <label for="name-input">Namn</label>
        <input id="name-input" v-model="inputName" type="text" />

        <label for="mail-input">E-post</label>
        <input id="mail-input" v-model="inputEmail" type="text" />

        <label class="container">
          <input type="checkbox" @click="gdprToggle" />
          <span class="checkmark"></span>
          GDPR Ok!
        </label>
      </section>
      <button class="push-user" @click="createUser">Brew me a cup!</button>
    </article>
    <div class="user-img">
      <img src="@/assets/Union.svg" alt="" />
    </div>
    <article v-if="isLoggedIn">
      <h3>{{ this.userName }}</h3>
      <p>{{ this.userMail }}</p>
    </article>
    <section class="order-history" v-if="hasHistory">
      <article class="order-item" v-for="order in orders" :key="order.orderNumber">
        <h4>#{{ order.orderNumber }}</h4>
        <p>{{ moment(order.createdAt * 1000).format("YY/MM/DD") }}</p>
        <p>total ordersumma</p>
        <p>{{ order.totalCost }} kr</p>
      </article>
      <h4>{{ totalHistoryCost }} kr</h4>
      <div class="dots"></div>
    </section>
  </main>
</template>

<script>
function getTotalHistoryCost(orders) {
  let totalCost = 0;
  orders.forEach((order) => (totalCost += order.totalCost));
  return totalCost;
}

export default {
  name: "profile",
  data() {
    return {
      isLoggedIn: false,
      createUserForm: Boolean,
      gdprCheck: false,
      test: "",
      inputName: "",
      inputEmail: "",
      userName: "",
      userMail: "",
      orders: [],
      totalHistoryCost: Number,
      hasHistory: false,
    };
  },
  async beforeMount() {
    let user = await JSON.parse(sessionStorage.getItem("user"));
    if (user === null) {
      this.createUserForm = true;
    } else {
      this.createUserForm = false;
      this.isLoggedIn = true;
      this.userName = user.name;
      this.userMail = user.mail;
      this.orders = await this.$store.dispatch("fetchOrderHistory");
      this.totalHistoryCost = getTotalHistoryCost(this.orders);
      if (this.orders.length > 0) {
        this.hasHistory = true;
      }
    }
  },
  methods: {
    async createUser() {
      if (this.gdprCheck) {
        let userCreate = { name: this.inputName, mail: this.inputEmail };
        console.log(userCreate);
        let createdUser = await this.$store.dispatch("createUser", userCreate);
        if (createdUser !== undefined) {
          this.createUserForm = false;
          this.isLoggedIn = true;
          this.userName = createdUser.name;
          this.userMail = createdUser.mail;
        } else {
          alert("Bad user input");
        }
      } else {
        alert("Need to approve GDPR");
      }
    },
    gdprToggle() {
      this.gdprCheck = !this.gdprCheck;
    },
  },
};
</script>

<style lang="scss">
@import "./../scss/variables";

.user-img {
  width: 94px;
  height: 94px;
  background: $airBeanPink;

  border-radius: 999rem;

  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

.order-history {
  width: 80%;

  .order-item {
    display: grid;
    text-align: left;
    grid-template-columns: 75% auto;
    grid-template-rows: 30px 25px;
    font-family: Work Sans;
    align-items: flex-end;

    h4 {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      /* or 14px */

      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.create-user {
  position: absolute;
  width: 20rem;
  height: 35rem;
  background: #f3e4e1;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.55);

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 10;

  padding-top: 2.5rem;

  p {
    margin-bottom: 3rem;
  }

  .push-user {
    width: 248px;
    height: 55px;

    /* Airbean - brown */
    background: $airBeanBrown;
    border-radius: 50px;
  }
}

.form-wrapper {
  width: 90%;

  display: flex;
  flex-direction: column;

  #name-input,
  #mail-input {
    width: 100%;
    height: 48px;

    /* Airbean - brown */
    border: 1px solid #2f2926;
    box-sizing: border-box;
    border-radius: 6px;
  }
  #mail-input {
    margin-bottom: 1rem;
  }

  label {
    text-align: left;
  }
}

.container {
  display: block;
  position: relative;
  padding-left: 15px;
  margin-bottom: 2rem;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 12px;
  width: 12px;
  border-radius: 999rem;
  background-color: #eee;
  border: 1px solid black;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $airBeanDarkGreen;
}
</style>
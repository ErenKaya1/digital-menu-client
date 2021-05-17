<template>
  <div @click="backToTop" class="back-to-top">
    <img
      src="data:image/svg+xml;charset=utf8,%3Csvg version=%271.1%27 xmlns=%27http://www.w3.org/2000/svg%27 width=%2710px%27 height=%2710px%27%3E %3Cpolygon fill=%27%23ffffff%27 stroke=%27none%27 points=%278.589,6.945 5,3.22 1.413,6.945 1.052,6.598 5,2.499 8.948,6.598%27 /%3E %3C/svg%3E"
      alt="Back To Top"
    />
  </div>
</template>

<script>
export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    backToTop() {
      window.scrollTo(0, 0);
    },

    handleScroll() {
      const backToTop = document.getElementsByClassName("back-to-top")[0];

      if (window.scrollY > 500) {
        backToTop.classList.add("d-flex");
        backToTop.classList.remove("d-none");
      } else {
        backToTop.classList.add("d-none");
        backToTop.classList.remove("d-flex");
      }
    },
  },
};
</script>

<style>
.back-to-top {
  transition: box-shadow 0.1s;
  position: fixed;
  bottom: 40px;
  right: 50px;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: var(--color-landing-primary);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  z-index: 1002;
}

.back-to-top:hover {
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
}

.back-to-top img {
  height: 50%;
}

@media (max-width: 768px) {
  .back-to-top {
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 30px;
  }
}

@media (max-width: 512px) {
  .back-to-top {
    width: 30px;
    height: 30px;
    bottom: 10px;
    right: 20px;
  }
}
</style>
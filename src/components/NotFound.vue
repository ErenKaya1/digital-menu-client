<template>
  <div class="error-page bg-landing-primary">
    <div class="container d-flex align-items-center justify-content-center ui-mh-100vh text-white">
      <div class="row align-content-center align-items-start align-items-md-center w-100 py-5">
        <div class="col-md-6 order-2 order-md-1 text-md-left text-center">
          <h1 class="error-title font-weight-bolder mb-4">Whoops...</h1>
          <div class="error-message font-weight-light mb-5">{{ $t("404View.notFoundText") }}<br /></div>
          <b-button to="/" variant="outline-light">←&nbsp; {{ $t("404View.backToHomepageButtonText") }}</b-button>
        </div>
        <div class="col-md-6 order-1 order-md-2 text-center mb-5 mb-md-0">
          <div class="ui-device macbook w-100 rounded" style="max-width: 500px">
            <img class="device-img" src="@/assets/macbook-gold.png" alt />
            <div class="device-content">
              <div class="error-device-content bg-landing-primary">
                <div class="error-device-code text-white font-weight-bolder">404</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.error-page .error-title {
  font-size: 40px;
}

.error-page .error-message {
  letter-spacing: 1.5px;
  font-size: 24px;
}

.error-device-code {
  font-size: 80px;
}

.error-device-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
}

.ui-device {
  position: relative;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.ui-device:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.ui-device .device-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}

.ui-device .device-content {
  position: absolute;
  top: 0;
  z-index: 2;
  overflow: hidden;
}

.ui-device .device-content:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.ui-device .device-content img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.ui-device.macbook {
  width: 1227px;
}

.ui-device.macbook:before {
  padding-top: 57.86471067644662%;
}

.ui-device.macbook .device-content {
  margin-top: 4.31947840260799%;
  margin-left: 12.46943765281174%;
  width: 75.15262428687857%;
}

.ui-device.macbook .device-content:before {
  padding-top: 62.47288503253796%;
}

@media (min-width: 992px) {
  .error-device-code {
    font-size: 120px;
  }

  .error-page .error-title {
    font-size: 80px;
  }
}
</style>
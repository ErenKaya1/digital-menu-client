<template>
  <div class="about">
    <common-navbar />
    <div class="about-content">
      <div class="img-container">
        <img src="@/assets/register-img.jpg" alt="" />
      </div>
      <div class="text-container">
        <h1>Hakkımızda</h1>
        <p class="subtitle">
          COVID-19 döneminde kafe, restoran gibi, insanların bir araya geldikleri mekanlarda teması azaltmak amacıyla geliştirilen Digital Menu, fiziksel menülerinizi dijital ortama taşır. Dijital Menu'de menünüzü oluşturduktan sonra size özel QR
          kodunuzu masalarınıza konumlandırarak misafirlerinizin menünüzü görüntülemesini sağlarsınız. Dijital Menu ile menülerinizi dijital ortama taşıyarak kendinize, çalışma arkadaşlarınıza ve misafirlerinize menü yoluyla COVID-19 bulaşma riskini
          minimuma indirmiş olursunuz.
        </p>
        <p class="content text-muted">
          COVID-19 döneminde kafe, restoran gibi, insanların bir araya geldikleri mekanlarda teması azaltmak amacıyla geliştirilen Digital Menu, fiziksel menülerinizi dijital ortama taşır. Dijital Menu'de menünüzü oluşturduktan sonra size özel QR
          kodunuzu masalarınıza konumlandırarak misafirlerinizin menünüzü görüntülemesini sağlarsınız. Dijital Menu ile menülerinizi dijital ortama taşıyarak kendinize, çalışma arkadaşlarınıza ve misafirlerinize menü yoluyla COVID-19 bulaşma riskini
          minimuma indirmiş olursunuz. COVID-19 döneminde kafe, restoran gibi, insanların bir araya geldikleri mekanlarda teması azaltmak amacıyla geliştirilen Digital Menu, fiziksel menülerinizi dijital ortama taşır. Dijital Menu'de menünüzü
          oluşturduktan sonra size özel QR kodunuzu masalarınıza konumlandırarak misafirlerinizin menünüzü görüntülemesini sağlarsınız. Dijital Menu ile menülerinizi dijital ortama taşıyarak kendinize, çalışma arkadaşlarınıza ve misafirlerinize menü
          yoluyla COVID-19 bulaşma riskini minimuma indirmiş olursunuz. COVID-19 döneminde kafe, restoran gibi, insanların bir araya geldikleri mekanlarda teması azaltmak amacıyla geliştirilen Digital Menu, fiziksel menülerinizi dijital ortama taşır.
          Dijital Menu'de menünüzü oluşturduktan sonra size özel QR kodunuzu masalarınıza konumlandırarak misafirlerinizin menünüzü görüntülemesini sağlarsınız. Dijital Menu ile menülerinizi dijital ortama taşıyarak kendinize, çalışma arkadaşlarınıza
          ve misafirlerinize menü yoluyla COVID-19 bulaşma riskini minimuma indirmiş olursunuz.
        </p>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import CommonNavbar from "@/components/Common/Navbar.vue";
import AppFooter from "@/components/Landing/Footer.vue";

export default {
  components: { CommonNavbar, AppFooter },
};
</script>

<style>
@import "../../node_modules/@fontsource/comfortaa/700.css";

.about .about-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  width: 100%;
  height: 100%;
}

.about-content .img-container {
  width: 100%;
}

.about-content .img-container img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
}

.about-content .text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 60px;
}

.about-content .text-container h1 {
  font-weight: bold;
  font-size: 60px;
  color: var(--color-landing-primary);
  font-family: "Comfortaa";
}

.about-content .text-container .subtitle {
  letter-spacing: 0.6px;
  margin-top: 30px;
  font-size: 18px;
  text-align: justify;
}

.about-content .text-container .content {
  margin-top: 30px;
  font-size: 16px;
  letter-spacing: 0.3px;
  line-height: 1.5;
  text-align: justify;
}

@media (max-width: 992px) {
  .about-content .text-container {
    width: 80%;
  }
}

@media (max-width: 568px) {
  .about-content .text-container {
    width: 100%;
    padding: 40px;
  }

  .about-content .text-container h1 {
    font-size: 36px;
  }

  .about-content .text-container .subtitle {
    font-size: 14px;
  }

  .about-content .text-container .content {
    font-size: 12px;
  }
}
</style>
<template>
  <div>
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
    <Modal id="loginModal" v-bind:title="$t('LOGIN__C')">
      <Auth />
    </Modal>
  </div>
</template>
<script>
import Header from "../components/header/Index";
import Footer from "../components/footer/Index";
import Auth from "../components/auth/Login";
import Modal from "../components/modal/Modal";
export default {
  components: {
    Header,
    Footer,
    Auth,
    Modal,
  },
};
</script>

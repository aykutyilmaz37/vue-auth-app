<template>
  <b-button :variant="variant" :id="id" @click="handleClick">
    <b-icon v-if="icon" :icon="icon"></b-icon>
    {{ text }}
  </b-button>
</template>
<script>
export default {
  name: "Button",
  props: {
    id: String,
    icon: String,
    variant: String,
    text: String,
    onClick:{
        type:Function
    }
  },
  methods: {
    handleClick (e) {
     this.$emit("click",e);
    },
  },
};
</script>

<template>
  <q-input v-model="model" :type="inputType">
    <template #append>
      <q-btn :icon="icon" flat round @click="show = !show"></q-btn>
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputPassword",
  emits: ["update:model-value"],
  props: {
    modelValue: { type: String, required: true },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    model: {
      set(val) {
        this.$emit("update:model-value", val);
      },
      get() {
        return this.modelValue;
      },
    },
    icon() {
      return this.show ? "mdi-eye-off-outline" : "mdi-eye-outline";
    },

    inputType() {
      return this.show ? "text" : "password";
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped></style>

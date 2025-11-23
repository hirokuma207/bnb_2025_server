<template>
  <q-page padding>
    <h2 class="text-center">회원가입</h2>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model.trim="form.email" label="이메일" outlined />
      <q-input v-model.trim="form.name" label="이름" outlined />
      <InputPassword v-model.trim="form.password" label="비밀번호" outlined />

      <div>
        <q-btn label="회원가입" type="submit" color="primary" />
        <q-btn label="취소" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <pre> {{ form }}</pre>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import InputPassword from "src/components/forms/InputPassword.vue";

export default defineComponent({
  components: { InputPassword },
  name: "JoinPage",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        tel: "",
        birth: "",
        sex: "",
        role: "",
        photo: null,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("Form submitted:", this.form);
    },
    onReset() {
      this.form = {
        email: "",
        name: "",
        password: "",
        tel: "",
        birth: "",
        sex: "",
        role: "",
        photo: null,
      };
    },
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <div class="relative flex justify-center items-center min-h-screen bg-[#009B9F] p-4">
    <div class="w-full max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 p-8 md:p-12">
            <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
              Đăng nhập
            </h1>
            <p class="text-md md:text-lg font-medium text-center text-gray-600 mb-8">
              Vui lòng điền thông tin để đăng nhập!
            </p>
            <form @submit.prevent="login" method="POST" class="space-y-6">
              <div v-for="field in formFields" :key="field.id" class="mb-4">
                <label :for="field.id" :class="errors[field.id] ? 'text-red-500' : 'text-gray-700'"
                  class="block font-medium mb-1">{{ field.label }}</label>
                <input v-model="formData[field.id]" :class="errors[field.id] ? 'border-red-500' : 'border-gray-300'
                  " :type="field.type" :placeholder="field.placeholder" :id="field.id"
                  class="w-full px-4 py-3 rounded-lg outline-none border-2 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out" />
                <p v-if="errors[field.id]" class="text-red-500 text-sm">
                  {{ errors[field.id] }}
                </p>
              </div>
              <button type="submit"
                class="w-full bg-[#51A7BF] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#00697F] transition duration-300 ease-in-out transform hover:scale-105">
                Đăng nhập
              </button>
            </form>
            <p class="mt-8 text-center text-sm text-gray-600">
              Nếu chưa có tài khoản?
              <router-link to="/register"
                class="font-medium text-[#00697F] hover:text-[#51A7BF] transition duration-150 ease-in-out">Đăng
                ký</router-link>
            </p>
          </div>
          <div class="hidden md:block w-1/2 bg-[#51A7BF] p-12">
            <img src="../../assets/img/img-login.png" class="w-full h-full object-cover rounded-xl"
              alt="Login illustration" />
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div v-if="notification.message"
        :class="`fixed top-4 right-4 p-5 bg-white shadow-lg rounded-lg z-10 flex items-center space-x-2 
                        ${notification.type === 'success' ? 'border-l-8 border-green-500 text-green-600' : 'border-l-8 border-red-500 text-red-600'}`">
        <p class="text-[18px] font-semibold">{{ notification.message }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const errors = ref({});
const email = ref("");
const password = ref("");
const notification = ref({
  message: "",
  type: "",
});

const formFields = ref([
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "JeiKei@gmail.com",
  },
  {
    id: "password",
    type: "password",
    label: "Mật Khẩu",
    placeholder: "••••••••",
  },
]);

const formData = ref({
  email: "",
  password: "",
});

// Phương thức đăng nhập
const login = async () => {
  errors.value = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const field of formFields.value) {
    const value = formData.value[field.id].trim();
    if (!value) {
      errors.value[field.id] = `${field.label} không được bỏ trống`;
    } else if (field.id === "email" && !emailRegex.test(value)) {
      errors.value.email = "Email không hợp lệ";
    }
  }

  if (formData.value.password && formData.value.password.length < 6) {
    errors.value.password = "Mật khẩu phải từ 6 ký tự trở lên";
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/docgia/login",
      {
        email: formData.value.email,
        password: formData.value.password,
      }
    );
    console.log(response.data);
    // Nếu đăng nhập thành công
    notification.value = {
      message: "Đăng nhập thành công!",
      type: "success",
    };

    // Chuyển hướng đến trang chính
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (error) {
    console.log(error.response);
    notification.value = {
      message:
        error.response?.data?.message || "Email hoặc mật khẩu không đúng.",
      type: "error",
    };
  }
  setTimeout(() => {
    notification.value.message = '';
  }, 3000);
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
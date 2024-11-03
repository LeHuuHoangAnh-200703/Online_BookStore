<template>
  <div class="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-[#00697F] to-[#51A7BF] p-4">
    <div class="w-full max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 p-8 md:p-12">
            <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Đăng nhập Admin</h1>
            <p class="text-md md:text-lg font-medium text-center text-gray-600 mb-8">
              Vui lòng điền thông tin để đăng nhập!
            </p>
            <form @submit.prevent="loginAdmin" method="POST" action="" class="space-y-6">
              <div>
                <label :class="{ 'text-red-500': errors.phone }" for="phone"
                  class="text-sm font-medium text-gray-700 block mb-2">Số điện thoại</label>
                <input v-model="formData.phone" type="phone" id="phone" :class="{ 'border-red-500': errors.phone }"
                  class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                  placeholder="079-xxx-xxxx">
                <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
              </div>
              <div>
                <label :class="{ 'text-red-500': errors.password }" for="password"
                  class="text-sm font-medium text-gray-700 block mb-2">Mật Khẩu</label>
                <input v-model="formData.password" type="password" id="password"
                  :class="{ 'border-red-500': errors.password }"
                  class="w-full px-4 py-3 outline-none rounded-lg border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                  placeholder="••••••••">
                <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
              </div>
              <button type="submit"
                class="w-full bg-[#51A7BF] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#00697F] transition duration-300 ease-in-out transform hover:scale-105">
                Đăng nhập
              </button>
            </form>
          </div>
          <div class="hidden md:block w-1/2 bg-[#51A7BF] p-12">
            <img src="../../assets/img/img-login.png" class="w-full h-full object-cover rounded-xl"
              alt="Login illustration">
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
const notification = ref({
  message: "",
  type: "",
});

const formData = ref({
  phone: "",
  password: "",
});

const loginAdmin = async () => {
  errors.value = {};
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  if (!formData.value.phone) {
    errors.value.phone = 'Số điện thoại không được bỏ trống';
  } else if (!phoneRegex.test(formData.value.phone)) {
    errors.value.phone = 'Số điện thoại không đúng định dạng.';
  }
  if (!formData.value.password) {
    errors.value.password = 'Mật khẩu không được bỏ trống';
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Mật khẩu phải từ 6 ký tự trở lên';
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/nhanvien/login",
      {
        phone: formData.value.phone,
        password: formData.value.password,
      }
    );
    localStorage.setItem('chucVu', response.data.nhanvien.ChucVu);
    localStorage.setItem('tenNhanVien', response.data.nhanvien.HoTenNV);
    notification.value = {
      message: "Đăng nhập thành công!",
      type: "success",
    };

    setTimeout(() => {
      router.push("/admin/adminDashboard");
    }, 1000);
  } catch (error) {
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

.input-error {
  border: 2px solid red;
}
</style>
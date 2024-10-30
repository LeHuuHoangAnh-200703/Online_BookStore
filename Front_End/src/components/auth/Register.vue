<template>
  <div class="relative flex justify-center items-center min-h-screen bg-[#009B9F] p-4">
    <div class="w-full max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="hidden md:block w-1/2 bg-[#51A7BF] p-12">
            <img src="../../assets/img/img-logout.png" class="w-full h-full object-cover rounded-xl"
              alt="Login illustration" />
          </div>
          <div class="w-full md:w-1/2 p-8 md:p-12">
            <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Đăng ký</h1>
            <p class="text-md md:text-lg font-medium text-center text-gray-600 mb-8">Vui lòng điền thông tin để đăng ký!
            </p>
            <form @submit.prevent="register" method="POST" class="space-y-6">
              <div v-for="field in formFields" :key="field.id" class="mb-4">
                <label :for="field.id" :class="errors[field.id] ? 'text-red-500' : 'text-gray-700'"
                  class="block font-medium mb-1">{{ field.label }}</label>
                <div v-if="field.type !== 'select'">
                  <input v-model="formData[field.id]" :class="errors[field.id] ? 'border-red-500' : 'border-gray-300'"
                    :type="field.type" :placeholder="field.placeholder" :id="field.id"
                    class="w-full px-4 py-3 rounded-lg outline-none border-2 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out" />
                  <p v-if="errors[field.id]" class="text-red-500 text-sm">{{ errors[field.id] }}</p>
                </div>
                <div v-else>
                  <select v-model="formData[field.id]" :id="field.id"
                    :class="errors[field.id] ? 'border-red-500' : 'border-gray-300'"
                    class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out">
                    <option value="">Chọn giới tính</option>
                    <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <p v-if="errors[field.id]" class="text-red-500 text-sm">{{ errors[field.id] }}</p>
                </div>
              </div>
              <button type="submit"
                class="w-full bg-[#51A7BF] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#00697F] transition duration-300 ease-in-out transform hover:scale-105">
                Đăng Ký
              </button>
            </form>
            <p class="mt-8 text-center text-sm text-gray-600">
              Nếu đã có tài khoản?
              <router-link to="/login"
                class="font-medium text-[#00697F] hover:text-[#51A7BF] transition duration-150 ease-in-out">Đăng
                nhập</router-link>
            </p>
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
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const errors = ref({});
// Cấu trúc các trường dữ liệu cho form
const formFields = ref([
  { id: 'name', type: 'text', label: 'Tên đăng nhập', placeholder: 'JeiKei' },
  { id: 'email', type: 'email', label: 'Email', placeholder: 'JeiKei@gmail.com' },
  { id: 'password', type: 'password', label: 'Mật Khẩu', placeholder: '••••••••' },
  { id: 'dob', type: 'date', label: 'Ngày sinh' },
  { id: 'gender', type: 'select', label: 'Phái', options: ['Nam', 'Nữ', 'Khác'] },
  { id: 'phone', type: 'text', label: 'Số điện thoại', placeholder: '079-xxx-xxxx' },
  { id: 'address', type: 'text', label: 'Địa chỉ', placeholder: 'Long My - Hau Giang' }
]);

const formData = ref({
  name: '',
  email: '',
  password: '',
  dob: '',
  gender: '',
  phone: '',
  address: ''
});

// Trạng thái thông báo
const notification = ref({
  message: '',
  type: ''
});

// Phương thức đăng ký tài khoản
const register = async () => {
  errors.value = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  for (const field of formFields.value) {
    const value = formData.value[field.id].trim();
    if (!value) {
      errors.value[field.id] = `${field.label} không được bỏ trống`;
    } else if (field.id === 'email' && !emailRegex.test(value)) {
      errors.value.email = 'Email không hợp lệ';
    } else if (field.id === 'phone' && !phoneRegex.test(value)) {
      errors.value.phone = 'Số điện thoại không đúng định dạng.';
    }
  }

  // Kiểm tra mật khẩu
  if (formData.value.password && formData.value.password.length < 6) {
    errors.value.password = 'Mật khẩu phải từ 6 ký tự trở lên';
  }

  // Nếu có lỗi, không gửi yêu cầu
  if (Object.keys(errors.value).length > 0) {
    return;
  }

  try {
    const dataToSend = {
      Ten: formData.value.name,
      Email: formData.value.email,
      Password: formData.value.password,
      NgaySinh: formData.value.dob,
      Phai: formData.value.gender,
      DiaChi: formData.value.address,
      DienThoai: formData.value.phone,
    };

    // Gửi yêu cầu đăng ký tới API backend  
    const response = await axios.post('http://localhost:5000/api/docgia', dataToSend);
    notification.value = {
      message: 'Đăng ký thành công!',
      type: 'success'
    };
    setTimeout(() => {
      router.push('/login');
    }, 3000);

  } catch (error) {
    notification.value = {
      message: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.',
      type: 'error'
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

<template>
  <div class="flex justify-center items-center min-h-screen bg-[#009B9F] p-4">
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
                <label :for="field.id" class="block text-gray-700 font-medium mb-1">{{ field.label }}</label>
                <div v-if="field.type !== 'select'">
                  <input v-model="formData[field.id]" :class="errors[field.id] ? 'border-red-500' : 'border-gray-300'" :type="field.type" :placeholder="field.placeholder" :id="field.id"
                    class="w-full px-4 py-3 rounded-lg outline-none border-2 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out" />
                  <p v-if="errors[field.id]" class="text-red-500 text-sm">{{ errors[field.id] }}</p>
                </div>
                <div v-else>
                  <select v-model="formData[field.id]" :id="field.id" :class="errors[field.id] ? 'border-red-500' : 'border-gray-300'"
                    class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out">
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
              <a href="#"
                class="font-medium text-[#00697F] hover:text-[#51A7BF] transition duration-150 ease-in-out">Đăng
                nhập</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div name="slide-fade" mode="out-in">
      <div v-if="notification.message"
        :class="`fixed top-4 right-4 p-4 shadow-lg rounded-lg flex items-center space-x-2 ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-600' : 'bg-red-100 border-l-4 border-red-500 text-red-600'}`">
        <p>{{ notification.message }}</p>
        <button @click="closeNotification" class="text-gray-600 hover:text-gray-800">&times;</button>
      </div>
    </div>
  </div>
  <!-- Toast notification -->
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

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

  // Kiểm tra dữ liệu nhập vào
  for (const field of formFields.value) {
    const value = formData.value[field.id].trim();
    if (!value) {
      errors.value[field.id] = `${field.label} không được bỏ trống`;
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
      MaDocGia: formData.value.email,  
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
  } catch (error) {
    notification.value = {
      message: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.',
      type: 'error'
    };
  }

  // Tự động ẩn thông báo sau 3 giây
  setTimeout(() => {
    notification.value.message = '';
  }, 3000);
};

// Đóng thông báo
const closeNotification = () => {
  notification.value.message = '';
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';

/* Custom transition for the toast notification */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active in <2.1.8 */
  {
  transform: translateX(100%);
  opacity: 0;
}
</style>

<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
    idNXB: '',
    name: '',
    price: '',
    year: '',
    author: '',
    type: 'Truyện Tranh',
    quantity: '',
    description: '',
    images: [],
    errors: {
        idNXB: '',
        name: '',
        price: '',
        year: '',
        author: '',
        type: '',
        quantity: '',
        description: '',
        images: ''
    }
});

const notification = ref({
    message: "",
    type: ""
});

// Hàm để lấy thông tin sản phẩm từ server
const fetchProductData = async (maSach) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/sach/maSach/${maSach}`);
        // Gán dữ liệu sản phẩm vào formData
        formData.value.idBook = response.data.MaSach;
        formData.value.idNXB = response.data.MaNXB;
        formData.value.name = response.data.TenSach;
        formData.value.price = response.data.DonGia;
        formData.value.year = response.data.NamXuatBan;
        formData.value.author = response.data.TacGia;
        formData.value.type = response.data.Type;
        formData.value.quantity = response.data.SoQuyen;
        formData.value.description = response.data.MoTa;
        if (response.data.Image) {
            formData.value.images = [response.data.Image];
        }
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

const submitForm = async () => {
    Object.keys(formData.value.errors).forEach(key => {
        formData.value.errors[key] = '';
    });

    let hasError = false;

    if (!formData.value.idNXB) {
        formData.value.errors.idNXB = 'Mã nhà xuất bản không được để trống!';
        hasError = true;
    }
    if (!formData.value.name) {
        formData.value.errors.name = 'Tên sách không được để trống!';
        hasError = true;
    }
    if (!formData.value.price) {
        formData.value.errors.price = 'Đơn giá không được để trống!';
        hasError = true;
    }
    if (!formData.value.year) {
        formData.value.errors.year = 'Năm xuất bản không được để trống!';
        hasError = true;
    }
    if (!formData.value.author) {
        formData.value.errors.author = 'Tác giả không được để trống!';
        hasError = true;
    }
    if (!formData.value.type) {
        formData.value.errors.type = 'Loại sách không được để trống!';
        hasError = true;
    }
    if (!formData.value.quantity) {
        formData.value.errors.quantity = 'Số quyển không được để trống!';
        hasError = true;
    }
    if (!formData.value.description) {
        formData.value.errors.description = 'Miêu tả không được để trống!';
        hasError = true;
    }
    if (formData.value.images.length === 0) {
        formData.value.errors.images = 'Hình ảnh không được để trống!';
        hasError = true;
    }
    if (hasError) {
        return;
    }

    try {
        const formDataToSend = new FormData();
        formDataToSend.append('Image', formData.value.selectedImage);
        formDataToSend.append('MaSach', formData.value.idBook);
        formDataToSend.append('MaNXB', formData.value.idNXB);
        formDataToSend.append('TenSach', formData.value.name);
        formDataToSend.append('DonGia', parseFloat(formData.value.price));
        formDataToSend.append('SoQuyen', formData.value.quantity);
        formDataToSend.append('NamXuatBan', formData.value.year);
        formDataToSend.append('TacGia', formData.value.author);
        formDataToSend.append('Type', formData.value.type);
        formDataToSend.append('MoTa', formData.value.description);
        const response = await axios.put(`http://localhost:5000/api/sach/maSach/${formData.value.idBook}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        notification.value = {
            message: 'Sản phẩm đã được chỉnh sửa thành công!',
            type: 'success'
        };

        router.push('/admin/admindashboard');
    } catch (error) {
        notification.value = {
            message: error.response ? error.response.data.message : error.message,
            type: 'error'
        };
    }

    setTimeout(() => {
        notification.value.message = '';
    }, 3000);
};

onMounted(() => {
    const maSach = router.currentRoute.value.params.maSach;
    console.log('Mã sách:', maSach);
    fetchProductData(maSach);
}); 
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="relative w-[95%] mx-auto h-[100%] my-5 overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">CHỈNH SỬA SẢN PHẨM</h2>
                </div>
                <form @submit.prevent="submitForm" enctype="multipart/form-data"
                    class="w-full max-h-[calc(100vh-200px)] overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div>
                            <label for="idNXB"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Mã
                                nhà xuất bản</label>
                            <input v-model="formData.idNXB" name="idNXB" type="text" id="idNXB"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.idNXB ? 'input-error' : '']"
                                placeholder="Nhập mã nhà xuất bản ..." />
                            <p class="text-red-500 text-sm">{{ formData.errors.idNXB }}</p>
                        </div>
                        <div>
                            <label for="name"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tên
                                sách</label>
                            <input v-model="formData.name" name="name" type="text" id="name"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.name ? 'input-error' : '']"
                                placeholder="Nhập tên sản phẩm ..." />
                            <p class="text-red-500 text-sm">{{ formData.errors.name }}</p>
                        </div>
                        <div>
                            <label for="price"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Đơn
                                giá</label>
                            <input v-model="formData.price" min="1" name="price" type="number" id="price"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.price ? 'input-error' : '']"
                                placeholder="10.000 VNĐ" />
                            <p class="text-red-500 text-sm">{{ formData.errors.price }}</p>
                        </div>
                        <div>
                            <label for="year"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Năm
                                xuất bản</label>
                            <input v-model="formData.year" name="year" type="text" id="year"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.year ? 'input-error' : '']"
                                placeholder="20xx" />
                            <p class="text-red-500 text-sm">{{ formData.errors.year }}</p>
                        </div>
                        <div>
                            <label for="author"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tác
                                giả</label>
                            <input v-model="formData.author" name="author" type="text" id="author"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.author ? 'input-error' : '']"
                                placeholder="Nhập tên tác giả ..." />
                            <p class="text-red-500 text-sm">{{ formData.errors.author }}</p>
                        </div>
                        <div class="flex flex-col justify-center w-full">
                            <h2
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                                Chọn loại sản phẩm</h2>
                            <select v-model="formData.type" name="type"
                                :class="['outline-0 p-3 block w-[80%] rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 cursor-pointer', formData.errors.type ? 'input-error' : '']">
                                <option value="Truyện Tranh">Truyện tranh</option>
                                <option value="Từ Điển">Từ điển</option>
                                <option value="Tiểu Thuyết">Tiểu thuyết</option>
                            </select>
                        </div>
                        <div>
                            <label for="quantity"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Số
                                quyển</label>
                            <input v-model="formData.quantity" min="1" name="quantity" type="number" id="quantity"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.quantity ? 'input-error' : '']"
                                placeholder="20" />
                            <p class="text-red-500 text-sm">{{ formData.errors.quantity }}</p>
                        </div>
                        <div>
                            <label for="description"
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Miêu
                                tả</label>
                            <textarea v-model="formData.description" id="description" name="description"
                                :class="['outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50', formData.errors.description ? 'input-error' : '']"
                                rows="3" placeholder="Hãy thêm mô tả ..."></textarea>
                            <p class="text-red-500 text-sm">{{ formData.errors.description }}</p>
                        </div>
                        <label
                            class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Chọn
                            ảnh chính sản phẩm :</label>
                        <input type="file" name="Image" @change="event => {
                            formData.images = Array.from(event.target.files);
                            formData.selectedImage = event.target.files[0];
                        }" />
                        <p class="text-red-500 text-sm">{{ formData.errors.images }}</p>
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Chỉnh
                                sửa sản phẩm</button>
                        </div>
                    </div>
                </form>
                <transition name="slide-fade" mode="out-in">
                    <div v-if="notification.message"
                        :class="`fixed top-4 right-4 p-5 bg-white shadow-lg rounded-lg z-10 flex items-center space-x-2 
                        ${notification.type === 'success' ? 'border-l-8 border-green-500 text-green-600' : 'border-l-8 border-red-500 text-red-600'}`">
                        <p class="text-[18px] font-semibold">{{ notification.message }}</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

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
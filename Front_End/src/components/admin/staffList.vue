<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="w-[95%] mx-auto h-[100%]">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">DANH SÁCH NHÂN VIÊN</h2>
                </div>
                <div id="all_products" class="w-full overflow-x-scroll overflow-y-scroll">
                    <table
                        class="w-full rounded-lg border-2 border-[#cecece] bg-white text-center text-sm text-gray-500">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Mã nhân viên</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Tên nhân viên</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Chức vụ</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Địa chỉ</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Số điện thoại</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Ngày tạo</th>
                                <th scope="col" class="px-6 py-4 font-semibold text-gray-900">Điều chỉnh</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white border-t border-[#cecece]">
                            <tr>
                                <th class="px-6 py-4 font-medium text-gray-900">1</th>
                                <td class="px-6 py-4 whitespace-nowrap">Hoàng Anh</td>
                                <td class="px-6 py-4 whitespace-nowrap">Tân phú - Long mỹ</td>
                                <td class="px-6 py-4 whitespace-nowrap">20-03-2024</td>
                                <td class="px-6 py-4 whitespace-nowrap">20-03-2024</td>
                                <td class="px-6 py-4 whitespace-nowrap">20-03-2024</td>
                                <td class="flex justify-center gap-4 px-6 py-4 font-medium whitespace-nowrap">
                                    <a href=""
                                        class="inline-block bg-[#00697F] text-white font-medium py-2 px-4 transition-all duration-300 hover:bg-[#055565] whitespace-nowrap">Sửa
                                        nhân viên</a>
                                    <form @submit.prevent="" class="form-inline ml-1">
                                        <button type="submit"
                                            class="text-primary-700 bg-[#DC143C] px-[14px] py-2 text-[#fff]"
                                            >
                                            <i alt="Delete"></i> Xóa nhân viên
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="w-[95%] mx-auto h-[100%] my-5 overflow-hidden">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">THÊM ĐỌC GIẢ</h2>
                </div>
                <form action="/admin/addproduct" method="POST" enctype="multipart/form-data" id="all_products"
                    class="w-full max-h-[calc(100vh-200px)] overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div class="">
                            <div>
                                <label for="HoLotDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Họ đọc giả</label>
                                <input name="HoLotDG" autofocus type="text" id="HoLotDG"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập họ đọc giả ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="TenDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tên đọc giả</label>
                                <input name="TenDG" autofocus type="text" id="TenDG"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập tên đọc giả ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="NgaySinhDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Ngày sinh</label>
                                <input name="NgaySinhDG" autofocus type="date" id="NgaySinhDG"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    />
                            </div>
                        </div>
                        <div class="flex flex-col justify-center w-full">
                            <h2
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                                Chọn giới tính</h2>
                            <select name="GioiTinhDG"
                                 class="outline-0 p-3 block w-[80%] rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                <option checked value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div class="">
                            <div>
                                <label for="DicchiDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Địa chỉ</label>
                                <input name="DicchiDG" autofocus type="text" id="DicchiDG"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập địa chỉ đọc giả ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="DienThoaiDG"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Số điện thoại</label>
                                <input name="DienThoaiDG" autofocus type="text" id="DienThoaiDG"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập số điện thoại ..." />
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Thêm
                                đọc giả</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
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
                    <h2 class="text-[#333] font-bold text-[20px]">CHỈNH SỬA NHÀ XUẤT BẢN</h2>
                </div>
                <form action="/admin/addproduct" method="POST" enctype="multipart/form-data" id="all_products"
                    class="w-full max-h-[calc(100vh-200px)] overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div class="">
                            <div>
                                <label for="idNXB"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Mã nhà xuất bản</label>
                                <input name="idNXB" autofocus type="text" id="idNXB"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập mã nhà xuất bản ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="nameNXB"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tên nhà xuất bản</label>
                                <input name="nameNXB" autofocus type="text" id="nameNXB"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập tên nhà xuất bản ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="addressNXB"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Địa chỉ</label>
                                <input name="addressNXB" autofocus type="text" id="addressNXB"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập tên sản phẩm ..." />
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Sửa
                                nhà xuất bản</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
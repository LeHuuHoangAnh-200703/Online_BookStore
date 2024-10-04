<script setup>
import sidebar from '../../layout/admin/Sidebar.vue';
import navbar from '../../layout/admin/Navbar.vue';
</script>

<template>
    <div class="flex font-sans">
        <sidebar />
        <div class="flex flex-col w-full">
            <navbar />
            <div class="w-[95%] mx-auto h-[100%] my-5">
                <div class="text-center py-4">
                    <h2 class="text-[#333] font-bold text-[20px]">CHỈNH SỬA SẢN PHẨM</h2>
                </div>
                <form action="/admin/addproduct" method="POST" enctype="multipart/form-data" id="all_products"
                    class="w-full overflow-y-scroll">
                    <div
                        class="flex flex-col bg-white w-full md:w-[70%] mx-auto gap-5 border-2 rounded-xl shadow-md p-5 m-2">
                        <div class="">
                            <div>
                                <label for="name"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tên
                                    sản phẩm</label>
                                <input name="name" autofocus type="text" id="name"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập tên sản phẩm ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="price"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Giá
                                    mượn</label>
                                <input min="1" name="price" autofocus type="number" id="price"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="10.000 VNĐ" />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="price"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Năm
                                    xuất bản</label>
                               <input name="year" autofocus type="text" id="year"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="20xx" /> 
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="author"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Tác
                                    giả</label>
                                <input name="author" autofocus type="text" id="author"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập tên tác giả ..." />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="publishing_house"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Nhà
                                    xuất bản</label>
                                <input name="publishing_house" autofocus type="text" id="publishing_house"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Nhập tên nhà xuất bản ..." />
                            </div>
                        </div>
                        <div class="flex flex-col justify-center w-full">
                            <h2
                                class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                                Chọn loại sản phẩm</h2>
                            <select name="type"
                                class="outline-0 p-3 block w-[80%] rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                <option checked value="TruyenTranh">Truyện tranh</option>
                                <option value="TuDien">Từ điển</option>
                                <option value="TieuThuyet">Tiểu thuyết</option>
                            </select>
                        </div>
                        <div class="">
                            <div>
                                <label for="quantity"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Số
                                    lượng</label>
                                <input min="1" name="quantity" autofocus type="number" id="color"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    placeholder="20" />
                            </div>
                        </div>
                        <div class="">
                            <div>
                                <label for="5"
                                    class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Miêu
                                    tả</label>
                                <textarea id="description" name="description"
                                    class="outline-0 p-3 block w-full rounded-md border shadow-md focus:border-[#00697F] focus:ring focus:ring-[#00697F] focus:ring-opacity-50 disabled:cursor-not-allowed"
                                    rows="3" placeholder="Hãy thêm mô tả ..."></textarea>
                            </div>
                        </div>
                        <label
                            class="font-bold mb-1 block text-base text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Chọn
                            ảnh chính sản phẩm :</label>
                        <input type="file" name="images[]" multiple
                            class="font-bold">
                        <div class="text-center">
                            <button type="submit"
                                class="inline-block rounded-lg bg-[#00697F] px-5 py-2.5 text-sm font-bold text-[#fff] shadow-md hover:scale-110 transition-all duration-200">Chỉnh sửa
                                sản phẩm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
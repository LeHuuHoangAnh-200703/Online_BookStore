<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Header />
    <div class="flex-grow lg:py-10 lg:px-10 p-4">
      <div class="w-full overflow-auto my-6">
        <table class="w-full border-collapse px-5 whitespace-nowrap bg-white text-center text-sm text-gray-500">
          <thead>
            <tr class="bg-[#00697F] text-white">
              <th scope="col" class="text-base px-6 py-4 font-semibold">
                Tên sản phẩm
              </th>
              <th scope="col" class="text-base flex justify-start px-6 py-4 font-semibold">
                Hình ảnh
              </th>
              <th scope="col" class="text-base px-6 py-4 font-semibold">
                Còn lại
              </th>
              <th scope="col" class="text-base px-6 py-4 font-semibold">
                Giá mượn
              </th>
              <th scope="col" class="text-base px-6 py-4 font-semibold">
                Điều chỉnh
              </th>
            </tr>
          </thead>
          <tbody class="w-full text-center">
            <tr class="border-t border-slate-500">
              <td class="whitespace-nowrap font-semibold">
                Pokémon Đặc Biệt - Tập 59
              </td>
              <td class="py-2">
                <img src="../../assets/img/TruyenTranh-4.jpg" class="w-[150px]" alt="" />
              </td>
              <td class="whitespace-nowrap font-semibold">300</td>
              <td class="whitespace-nowrap font-semibold">20.000 VNĐ</td>
              <td class="flex items-center gap-4 flex-col mt-10">
                <a href=""
                  class="bg-[#00697F] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#055565]">
                  Mượn sản phẩm
                </a>
                <form action="" method="POST">
                  <button type="submit"
                    class="text-white font-medium bg-[#DC143C] py-2 px-6 mb-4 rounded-md transition-all duration-300 hover:bg-[#B22222]">
                    Xóa sản phẩm
                  </button>
                </form>
              </td>
            </tr>
            <tr class="border-t border-slate-500">
              <td class="whitespace-nowrap font-semibold">
                Pokémon Đặc Biệt - Tập 59
              </td>
              <td class="py-2">
                <img src="../../assets/img/TruyenTranh-4.jpg" class="w-[150px]" alt="" />
              </td>
              <td class="whitespace-nowrap font-semibold">300</td>
              <td class="whitespace-nowrap font-semibold">20.000 VNĐ</td>
              <td class="flex items-center gap-4 flex-col mt-10">
                <a href=""
                  class="bg-[#00697F] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#055565]">
                  Mượn sản phẩm
                </a>
                <form action="" method="POST">
                  <button type="submit"
                    class="text-white font-medium bg-[#DC143C] py-2 px-6 mb-4 rounded-md transition-all duration-300 hover:bg-[#B22222]">
                    Xóa sản phẩm
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style></style>

<script>
export default {};
</script>

<style></style>
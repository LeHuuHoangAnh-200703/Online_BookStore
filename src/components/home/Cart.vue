<script setup>
import Header from "../../layout/client/Header.vue";
import Footer from "../../layout/client/Footer.vue";
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Header />
    <div class="flex-grow lg:py-10 lg:px-10 p-4">
      <div class="w-full overflow-auto my-6">
        <table
          class="w-full border-collapse px-5 whitespace-nowrap bg-white text-center text-sm text-gray-500"
        >
          <thead>
            <tr>
              <th
                scope="col"
                class="text-base px-6 py-4 font-semibold text-[#333f48]"
              >
                Tên sản phẩm
              </th>
              <th
                scope="col"
                class="text-base flex justify-start px-6 py-4 font-semibold text-[#333f48]"
              >
                Hình ảnh
              </th>
              <th
                scope="col"
                class="text-base px-6 py-4 font-semibold text-[#333f48]"
              >
                Còn lại
              </th>
              <th
                scope="col"
                class="text-base px-6 py-4 font-semibold text-[#333f48]"
              >
                Giá mượn
              </th>
              <th
                scope="col"
                class="text-base px-6 py-4 font-semibold text-[#333f48]"
              >
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
                <img
                  src="../../assets/img/TruyenTranh-4.jpg"
                  class="w-[150px]"
                  alt=""
                />
              </td>
              <td class="whitespace-nowrap font-semibold">300</td>
              <td class="whitespace-nowrap font-semibold">20.000 VNĐ</td>
              <td class="flex items-center gap-4 flex-col mt-4">
                <a
                  href=""
                  class="text-primary-700 bg-[#4169E1] px-[15px] py-2 text-[#fff]"
                >
                  Mượn sản phẩm
                </a>
                <form action="" method="POST">
                  <button
                    type="submit"
                    class="text-primary-700 bg-[#DC143C] px-[22px] py-2 text-[#fff] mb-4"
                  >
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

<style>
</style>

<script>
export default {};
</script>

<style>
</style>
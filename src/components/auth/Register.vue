<template>
  <div
    class="flex justify-center items-center min-h-screen bg-[#009B9F] p-4"
  >
    <div class="w-full max-w-4xl">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="hidden md:block w-1/2 bg-[#51A7BF] p-12">
            <img
              src="../../assets/img/img-logout.png"
              class="w-full h-full object-cover rounded-xl"
              alt="Login illustration"
            />
          </div>
          <div class="w-full md:w-1/2 p-8 md:p-12">
            <h1
              class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2"
            >
              Đăng ký
            </h1>
            <p
              class="text-md md:text-lg font-medium text-center text-gray-600 mb-8"
            >
              Vui lòng điền thông tin để đăng ký!
            </p>
            <form action="" class="space-y-6">
              <div>
                <label
                  for="name"
                  class="text-sm font-medium text-gray-700 block mb-2"
                  >Tên đăng nhập</label
                >
                <input
                  type="name"
                  id="name"
                  class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                  placeholder="JeiKei"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="text-sm font-medium text-gray-700 block mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                  placeholder="JeiKei@gmail.com"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="text-sm font-medium text-gray-700 block mb-2"
                  >Mật Khẩu</label
                >
                <input
                  type="password"
                  id="password"
                  class="w-full px-4 py-3 outline-none rounded-lg border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  for="address"
                  class="text-sm font-medium text-gray-700 block mb-2"
                  >Địa chỉ</label
                >
                <input
                  type="address"
                  id="address"
                  class="w-full px-4 py-3 rounded-lg outline-none border-2 border-gray-300 focus:border-[#51A7BF] focus:ring-[#51A7BF] transition duration-150 ease-in-out"
                  placeholder="Long My - Hau Giang"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-[#51A7BF] text-white rounded-lg py-3 px-4 font-semibold hover:bg-[#00697F] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Đăng Ký
              </button>
            </form>
            <p class="mt-8 text-center text-sm text-gray-600">
              Nếu đã có tài khoản?
              <a
                href="#"
                class="font-medium text-[#00697F] hover:text-[#51A7BF] transition duration-150 ease-in-out"
                >Đăng nhập</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>

<style>
</style>
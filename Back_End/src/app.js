// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initializing the Express application
const app = express();
const port = 5000;

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ frontend của bạn
  credentials: true // Cho phép gửi cookie
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connecting to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/Online_BookStore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Importing route handlers
const docgiaRoutes = require("./routes/docgia");
const sachRoutes = require("./routes/sach");
const nhanvienRoutes = require("./routes/nhanvien");
const nhaXuatBanRoutes = require("./routes/nhaXuatBan");
const theoDoiMuonSachRoutes = require("./routes/theoDoiMuonSach");
// Defining routes
app.use("/api/docgia", docgiaRoutes); // Cách API của độc giả sẽ được định nghĩa trong file docgia.js
app.use("/api/sach", sachRoutes); // Cách API của sách sẽ được định nghĩa trong file sach.js
app.use("/api/nhanvien", nhanvienRoutes); // Cách API của nhân viên sẽ được định nghĩa trong file nhanvien.js
app.use("/api/nhaxuatban", nhaXuatBanRoutes); // Cách API của nhà xuất bản sẽ được định nghĩa trong file nhaXuatBan.js
app.use("/api/theodoimuonsach", theoDoiMuonSachRoutes); // Cách API của theo dõi mượn sách sẽ được định nghĩa trong file theoDoiMuonSach.js

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

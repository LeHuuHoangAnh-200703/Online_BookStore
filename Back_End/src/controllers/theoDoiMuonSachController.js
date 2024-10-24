const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");

// Function to create a record when borrowing a book (mượn sách)
exports.muonSach = async (req, res) => {
  // Extracting MaDocGia (reader ID) and MaSach (book ID) from the request body
  const { MaDocGia, MaSach } = req.body;
  // Setting the current date as the borrowing date (ngày mượn)
  const ngayMuon = new Date();

  try {
    // Creating a new TheoDoiMuonSach instance with the provided data
    const theoDoi = new TheoDoiMuonSach({
      MaDocGia, // Reader ID
      MaSach, // Book ID
      NgayMuon: ngayMuon, // Borrowing date
    });
    // Saving the new TheoDoiMuonSach instance to the database
    await theoDoi.save();
    // Responding with status 201 (Created) and the newly created TheoDoiMuonSach object
    res.status(201).json(theoDoi);
  } catch (err) {
    // If an error occurs, responding with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};
// Function to update the return date (ngày trả) when returning a book (trả sách)
exports.traSach = async (req, res) => {
  // Extracting MaDocGia (reader ID) and MaSach (book ID) from the request body
  const { MaDocGia, MaSach } = req.body;
  // Setting the current date as the return date (ngày trả)
  const ngayTra = new Date();

  try {
    // Finding the TheoDoiMuonSach record that matches the reader ID, book ID, and has a null return date
    const theoDoi = await TheoDoiMuonSach.findOneAndUpdate(
      { MaDocGia, MaSach, NgayTra: null }, // Finding the record that hasn't been returned yet
      { NgayTra: ngayTra }, // Updating the return date
      { new: true } // Option to return the updated document
    );

    // If no matching record is found, respond with status 404 (Not Found) and an error message
    if (!theoDoi) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bản ghi mượn sách" });
    }

    // Respond with status 200 (OK) and the updated TheoDoiMuonSach object
    res.status(200).json(theoDoi);
  } catch (err) {
    // If an error occurs, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ message: err.message });
  }
};

// ----------------------- Version 2 (Thử nhưng không thành công) -----------------------

// // Importing the necessary models
// const DocGia = require("../models/DocGia");
// const Sach = require("../models/Sach");
// const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");

// // Function to create a record when borrowing a book (mượn sách)
// exports.muonSach = async (req, res) => {
//   // Extracting user ID and book ID from the request body
//   const { userId, bookId } = req.body;
//   // Setting the current date as the borrowing date (ngày mượn)
//   const ngayMuon = new Date();

//   try {
//     // Finding the DocGia (reader) by user ID
//     const docGia = await DocGia.findById(userId);
//     if (!docGia) {
//       return res.status(404).json({ message: "Không tìm thấy độc giả" });
//     }

//     // Finding the Sach (book) by book ID
//     const sach = await Sach.findById(bookId);
//     if (!sach) {
//       return res.status(404).json({ message: "Không tìm thấy sách" });
//     }

//     // Creating a new TheoDoiMuonSach instance with the found DocGia and Sach IDs
//     const theoDoi = new TheoDoiMuonSach({
//       MaDocGia: docGia._id, // Reader ID from the found DocGia
//       MaSach: sach._id, // Book ID from the found Sach
//       NgayMuon: ngayMuon, // Borrowing date
//     });

//     // Saving the new TheoDoiMuonSach instance to the database
//     await theoDoi.save();
//     // Responding with status 201 (Created) and the newly created TheoDoiMuonSach object
//     res.status(201).json(theoDoi);
//   } catch (err) {
//     // If an error occurs, responding with status 400 (Bad Request) and the error message
//     res.status(400).json({ message: err.message });
//   }
// };

#### Pattern

Untuk pattern yang saya gunakan adalah Model Service Controller, karena code dibuat menjadi potongan / fungsi kecil yang mudah dibaca

#### Penjelasan Struktur Folder:

- **main.js** tempat yang berisi untuk menyimpan, semua fungsi dari aplikasi yang nantinya akan kita buat

- **controllers** tempat yang berisi semua logic dari aplikasi tersebut yang nantinya akan digunakan pada Routers

- **services** tempat yang berisi semua bisnis logic dari aplikasi yang akan di-consume oleh controller

- **utils** tempat yang berisi sebuah fungsi penolong sebagai utility dan customisasi library yang telah kita install

- **middlewares** tempat yang berisi untuk custom function middleware yang digunakan untuk keperluan **auth jwt, auth role** dll

- **models** tempat yang berisi untuk melakukan pembuatan schema database

- **routes** tempat yang berisi untuk pembuatan routing pada aplikasi untuk meneruskan fungsi dari **controller**

- **config** tempat yang berisi untuk pembuatan konfigurasi dari **database** atau yang lainnya

- **public** tempat yang berisi untuk penyimpanan asset static seperti **CSS**, **JavaScript**, **Gambar** dll

# Lab1 Git Practice
# AI Marketing Brain (Portfolio with 3D) 

 

Chào mừng bạn đến với dự án! Đây là một nền tảng AI SaaS hiện đại kết hợp với giao diện 3D đẹp mắt, sử dụng Next.js, Three.js và Prisma. 

 

--- 

 

## 🚀 Hướng dẫn cài đặt và chạy dự án 

 

Để khởi động dự án này trên máy tính cá nhân, bạn hãy làm theo các bước chi tiết dưới đây: 

 

### 1. Yêu cầu hệ thống (Prerequisites) 

Đảm bảo máy tính của bạn đã cài đặt các công cụ sau: 

- **Node.js**: Phiên bản 18.x trở lên. 

- **npm**: (Mặc định đi kèm Node.js) hoặc **pnpm/yarn**. 

- **PostgreSQL**: Nếu bạn muốn sử dụng cơ sở dữ liệu thực (không bắt buộc nếu chỉ chạy test cơ bản). 

 

### 2. Tải mã nguồn 

Bạn có thể tải dự án bằng cách clone từ GitHub hoặc tải file ZIP về máy: 

```bash 

git clone https://github.com/thkhai23/Portfolio_with_3D.git 

cd Portfolio_with_3D 

``` 

 

### 3. Cài đặt các thư viện (Dependencies) 

Dự án được thiết kế theo cấu trúc Monorepo (workspaces). Bạn chỉ cần chạy lệnh cài đặt duy nhất tại thư mục gốc: 

```bash 

npm install 

``` 

 

### 4. Cấu hình biến môi trường (Environment Variables) 

Bạn cần tạo file cấu hình cá nhân để ứng dụng có thể kết nối với các dịch vụ bên ngoài: 

1. Tạo file `.env.local` tại thư mục gốc. 

2. Copy nội dung từ `.env.example` vào `.env.local`. 

3. Điền các thông tin quan trọng: 

   - `DATABASE_URL`: Đường dẫn kết nối database PostgreSQL. 

   - `OPENAI_API_KEY`: Khóa API của OpenAI (nếu muốn sử dụng tính năng AI). 

   - `NEXTAUTH_SECRET`: Một chuỗi ký tự ngẫu nhiên để bảo mật session. 

 

### 5. Cấu hình Cơ sở dữ liệu (Prisma Setup) 

Chạy các lệnh sau để đồng bộ cấu hình dữ liệu: 

```bash 

# Tạo các thư viện truy vấn dữ liệu (Query Client) 

npx prisma generate --schema=packages/db/prisma/schema.prisma 

 

# Đẩy cấu hình bảng dữ liệu lên database (chỉ dùng khi đã có DATABASE_URL) 

npx prisma db push --schema=packages/db/prisma/schema.prisma 

``` 

 

### 6. Chạy dự án ở chế độ phát triển (Development) 

Sau khi hoàn tất các bước trên, hãy khởi động ứng dụng: 

```bash 

npm run dev 

``` 

- **Frontend (Giao diện chính)**: Truy cập tại [http://localhost:3000](http://localhost:3000) 

- **API Server (nếu cần)**: `npm run dev:api` 

 

--- 

 

## 📂 Cấu trúc dự án (Project Structure) 

 

- `apps/web`: Ứng dụng Next.js (Frontend, UI, Workspace). 

- `apps/api`: Service API chạy Node.js độc lập. 

- `packages/db`: Chứa Prisma schema và logic kết nối database. 

- `packages/ai`: Logic xử lý AI (RAG, prompt chaining). 

- `packages/vector`: Xử lý lưu trữ vector cho AI (mặc định là in-memory). 

 

## 🛠 Công nghệ cốt lõi 

- **Frontend**: Next.js 14+, React 19, Tailwind CSS 4. 

- **3D & Animation**: Three.js, React Three Fiber, Framer Motion (tạo hiệu ứng background không gian). 

- **ORM & DB**: Prisma, PostgreSQL. 

- **State Management**: Zustand. 

 

--- 

 

> [!NOTE] 

> Nếu bạn gặp lỗi về background hoặc 3D, hãy kiểm tra xem trình duyệt có hỗ trợ WebGL và driver đồ họa đã được cập nhật chưa. 

 
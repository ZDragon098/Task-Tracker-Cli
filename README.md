# Task Tracker CLI

Một ứng dụng dòng lệnh đơn giản để quản lý công việc
Vi đây là một project chạy bằng lệnh (Project CLI) nên không có giao diện (Gui).

## Cài đặt

1. Mở terminal vào thư mục `taskTrackerCli` và mở terminal lên.
2. Chạy lệnh:
   ```bash
   node index.js <command> [args]
   ```

## Cách dùng

Mỗi lệnh được gọi bằng `node index.js` theo sau là tên command và các tham số.

### Lệnh có sẵn

- `add <task-name>`
  - Thêm một công việc mới.
  - Ví dụ: `node index.js add "Học JavaScript"`

- `delete <task-id>`
  - Xóa công việc theo ID.
  - Ví dụ: `node index.js delete 2`

- `update <task-id> <new-title>`
  - Cập nhật tiêu đề công việc theo ID.
  - Ví dụ: `node index.js update 1 "Học Node.js cơ bản"`

- `mark-done <task-id>`
  - Đánh dấu công việc là đã hoàn thành.
  - Ví dụ: `node index.js mark-done 3`

- `mark-in-progress <task-id>`
  - Đánh dấu công việc là đang tiến hành.
  - Ví dụ: `node index.js mark-in-progress 4`

- `list <filter>`
  - Hiển thị danh sách công việc.
  - Các filter hợp lệ:
    - `all` — tất cả công việc
    - `done` — công việc đã hoàn thành
    - `in-progress` — công việc đang tiến hành
    - `todo` — công việc cần làm
  - Ví dụ: `node index.js list all`

- `clear`
  - Xóa toàn bộ công việc trong `tasks.json`.
  - Ví dụ: `node index.js clear`

## Ví dụ nhanh

```bash
node index.js add "Học React"
node index.js mark-in-progress 1
node index.js list all
node index.js list done
node index.js clear
```

## Lưu ý
- Bạn phải cài nodeJS.
- Dữ liệu được lưu trong file `tasks.json`.
- Mỗi công việc có các trường: `id`, `title`, `status`, `createAt`, `updateAt`.
- `status` có thể là `todo`, `in-progress`, hoặc `done`.

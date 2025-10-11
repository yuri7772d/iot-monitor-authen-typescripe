# iot-monitor-authen-typescripe

ระบบ Authentication สำหรับ IoT Monitoring Service ด้วย Node.js และ TypeScript
- **การจัดการ JWT**: ใช้ `jsonwebtoken` สำหรับการสร้างและตรวจสอบ JWT ซึ่งเป็นวิธีที่ปลอดภัยและนิยมใช้ในระบบ Authentication
- **การตรวจสอบข้อมูล**: ใช้ `express-validator` เพื่อให้มั่นใจว่าข้อมูลที่รับมาจากผู้ใช้ถูกต้องและปลอดภัย
- **การจัดการ Middleware**: มีการใช้ middleware เพื่อจัดการกับการตรวจสอบและการจัดการข้อผิดพลาดอย่างมีประสิทธิภาพ

## 🔧 เทคโนโลยีที่ใช้

- **Node.js** — สภาพแวดล้อมการรัน JavaScript บนเซิร์ฟเวอร์
- **TypeScript** — JavaScript ที่มีระบบ type
- **Express.js** — Web framework สำหรับ Node.js
- **jsonwebtoken (JWT)** — การจัดการ token สำหรับการยืนยันตัวตน
- **express-validator** — การตรวจสอบความถูกต้องของข้อมูลใน request

## 🚀 การติดตั้งและการใช้งาน

1. Clone โปรเจกต์:

   ```bash
   git clone https://github.com/yuri7772d/iot-monitor-authen-typescripe.git
   cd iot-monitor-authen-typescripe
   
2. สร้าง .env:

   ```bash
   # Server
    PORT=80

   # Database
    MYSQL_HOST=localhost
    MYSQL_USERNAME=mysql
    MYSQL_PASSWORD=1234
    MYSQL_DATABASE=authenticationDB

   # JWT
    JWT_SECRET=your_jwt_secret_key
    JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   
3. install packet:

   ```bash
   npm install

4. init database ด้วย docker-compose:
   
   ```bash
   docker compose up -d
   
5. การไช้งาน run:

   ```bash
   npm run dev                // run ด้วย nodemon ไม่ต้องเสี่ยเวลา build
   
   npx tsc                    // build javascripe
   
   npm run ./dist/index.js    // run javascripe



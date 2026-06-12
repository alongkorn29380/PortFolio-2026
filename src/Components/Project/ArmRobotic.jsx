import ProjectPage from './ProjectPage.jsx'

const data = {
    title: 'Arm Robotic',
    liveUrl: 'https://project-final-gg.vercel.app/Dashboard/',
    desc: 'ระบบแขนกลหยิบจับวัตถุตามความประสงค์ของผู้ใช้งาน เป็นระบบหุ่นยนต์อัจฉริยะที่ออกแบบมาเพื่อตอบสนองการทำงานทั้งในรูปแบบการควบคุมด้วยตัวเองและการทำงานแบบอัตโนมัติ โดยโครงสร้างฮาร์ดแวร์รองรับการเคลื่อนไหวอิสระสูงสุดถึง 6 แกน (6 DOF - Degrees of Freedom) เพื่อความยืดหยุ่นแม่นยำในการเข้าถึงตำแหน่งต่าง ๆ ในมิติสามมิติ ระบบนี้ถูกพัฒนาขึ้นเพื่อให้รองรับการทำงาน 2 โหมดหลัก คือ โหมดควบคุมด้วยมือ (Manual Control) ผ่านอินเตอร์เฟซที่ผู้ใช้สามารถปรับองศาของ Servo Motor แต่ละข้อต่อได้อย่างอิสระ และ โหมดหยิบจับสิ่งของอัตโนมัติ (Object Detection & Autonomous Grasping) ที่ผสานเทคโนโลยีปัญญาประดิษฐ์ (AI Custom Model) ร่วมกับกล้องประมวลผลภาพ ทำให้ระบบสามารถรู้จำ (Recognize) วัตถุเฉพาะเจาะจงตามที่ผู้ใช้เทรนระบบไว้ และสั่งการให้แขนกลเคลื่อนที่ไปหยิบจับวัตถุชิ้นนั้นได้อย่างถูกต้องตามความต้องการ',
    technologies: ['Python', 'Raspberry Pi', 'OpenCV', 'C', 'ESP32', 'Google Coral', 'Servo', 'Uarco Marker'],
    features: [
        {
            title: 'ฟีเจอร์ที่ 1: การควบคุมด้วยมือ (Manual Control Mode)',
            details: [
                '6-DOF Precision Control: รองรับการควบคุม Servo Motor อิสระทั้ง 6 ข้อต่อ (Degrees of Freedom) ครอบคลุมการหมุนฐาน การยืด-หด การยก และการหมุนส่วนปลายหยิบจับ (End-Effector/Gripper)',
                'User-Friendly Interface (Slider/Control Panel): มีแถบปรับองศา (Slider) หรืออินเตอร์เฟซที่แสดงค่ามุมองศาปัจจุบัน ช่วยให้ผู้ใช้ปรับแต่งระยะและทิศทางได้อย่างละเอียดและแม่นยำ',
                'Real-time Response: ระบบส่งสัญญาณควบคุมไปยังไมโครคอนโทรลเลอร์เพื่อขับเคลื่อนมอเตอร์ทันทีที่ผู้ใช้งานปรับเปลี่ยนค่าบนหน้าจอ'
            ]
        },
        {
            title: 'ฟีเจอร์ที่ 2: การหยิบจับสิ่งของอัตโนมัติ (AI Object Detection Mode)',
            details: [
                'Custom AI Model Training: ระบบรองรับการนำชุดข้อมูลภาพวัตถุ (Dataset) ที่ผู้ใช้ต้องการมาเทรน (Train) ร่วมกับโมเดล AI เพื่อสร้างโมเดลรู้จำวัตถุเฉพาะทาง (Custom Object Detection Model)',
                'Live Camera Feed & Spatial Detection: กล้องตรวจจับสัญญาณภาพแบบ Real-time เมื่อมีวัตถุเข้ามาในเฟรม กล้องจะวิเคราะห์ พิกัดตำแหน่ง (X, Y, Z) ของวัตถุนั้นทันที',
                'Target Selection Grasping: ผู้ใช้งานสามารถเลือกจากหน้าจอได้ว่าต้องการให้แขนกลหยิบวัตถุชิ้นใด (ในกรณีที่กล้องตรวจเจอวัตถุหลายชิ้นพร้อมกัน) จากนั้นระบบจะคำนวณวงจรการเคลื่อนที่ (Inverse Kinematics) และเคลื่อนไปหยิบวัตถุเป้าหมายโดยอัตโนมัติ'
            ]
        }
    ],
    imgSrc: '/Images/Project/Arm_Robotic.jpg',
}

export default function ArmRoboticPage() {
    return <ProjectPage {...data} />
}

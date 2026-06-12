import ProjectPage from './ProjectPage.jsx'

const data = {
    title: 'Snow Globe',
    liveUrl: 'https://christmas-2026.netlify.app/',
    desc: 'ลูกแก้วหิมะ สร้างด้วย Three.js พร้อมระบบ Physics จำลองหิมะตกภายในลูกแก้ว แสงและเงาแบบ Real-time พร้อมฉากภายในที่สวยงาม โดยจะเป็นเว็บไซต์จำลองการ์ดอวยพรในรูปแบบ 3 มิติเชิงปฏิสัมพันธ์ (Interactive 3D Greeting Card) เป็นแพลตฟอร์มดิจิทัลแนวใหม่ที่ถูกพัฒนาขึ้นเพื่อต้อนรับเทศกาลคริสต์มาส',
    technologies: ['Three.js', 'React', 'WebGL', 'CSS', 'HTML', 'Blender'],
    features: [
        {
            title: 'ฟีเจอร์ที่ 1: การจำลองสภาพแวดล้อม 3 มิติเชิงปฏิสัมพันธ์ (Interactive 3D Environment)เน้นการสร้างประสบการณ์เสมือนจริงและการมีส่วนร่วมของผู้ใช้งานผ่านเทคโนโลยีเว็บ 3 มิติ',
            details: [
                'Orbit Controls & Camera Interaction: ผู้ใช้งานสามารถใช้เมาส์หรือการทัชสกรีนในการหมุนรอบลูกโลกหิมะ พลิกมุมกล้องได้อย่างอิสระแบบ 360 องศา รวมถึงการซูมเข้าเพื่อดูรายละเอียด (Details) หรือซูมออกเพื่อดูภาพรวมของฉาก',
                'Dynamic Particle Snow Effect: ระบบจำลองละอองหิมะตกภายในลูกโลกอย่างสมจริง โดยใช้ระบบอนุภาค (Particle System) ที่เคลื่อนไหวอย่างเป็นธรรมชาติ ช่วยเพิ่มความรู้สึกสมจริงและอบอุ่น'
            ]
        },
        {
            title: 'ฟีเจอร์ที่ 2: ระบบปรับแต่งองค์ประกอบแบบเรียลไทม์ (Real-time Customization Panel)',
            details: [
                'Ornament Color Customization: ผู้ใช้สามารถเลือกสลับโทนสีของลูกบอลประดับ (Ornaments) และของตกแต่งบนต้นคริสต์มาสหลักได้ตามใจชอบ',
                'Smart Lighting Control: ระบบควบคุมแสงไฟอัจฉริยะ ที่เปิดให้ปรับเปลี่ยนเฉดสี (Color Hue) และระดับความสว่าง (Intensity) ของไฟประดับรอบ ๆ ฉากและบนต้นคริสต์มาสได้อย่างอิสระ สื่ออารมณ์ของเทศกาลได้หลากหลายรูปแบบ'
            ]
        }
    ],
    imgSrc: '/Images/Project/Snow_Globe.png',
}

export default function SnowGlobePage() {
    return <ProjectPage {...data} />
}
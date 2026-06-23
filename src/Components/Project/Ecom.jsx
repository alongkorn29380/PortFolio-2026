import ProjectPage from './ProjectPage.jsx'

const data = {
    title: 'Ecommerce 3D',
    liveUrl: 'https://ecommerce-3d.netlify.app/',
    desc: 'เว็บไซต์ร้านค้าออนไลน์ที่นำเทคโนโลยี 3 มิติมายกระดับประสบการณ์การเลือกซื้อสินค้า แทนที่ผู้ใช้จะเห็นเพียงรูปภาพนิ่ง ระบบเปิดให้หมุนชมสินค้าได้รอบทิศ 360 องศา และปรับเปลี่ยนสีหรือวัสดุของสินค้าได้แบบเรียลไทม์ก่อนตัดสินใจซื้อ ช่วยให้มองเห็นภาพสินค้าจริงได้ใกล้เคียงที่สุด ระบบถูกพัฒนาแบบ Full Stack ครอบคลุมตั้งแต่การแสดงผลสินค้า 3 มิติบนหน้าเว็บ ระบบสมาชิก ตะกร้าสินค้า ไปจนถึงการจัดการข้อมูลสินค้าในฐานข้อมูลหลังบ้าน โดยมีหัวใจสำคัญคือ Product Configurator ที่ให้ผู้ใช้ออกแบบและปรับแต่งสินค้าในแบบของตัวเองได้ก่อนสั่งซื้อ',
    technologies: ['React Three Fiber', 'React', 'WebGL', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Blender'],
    features: [
        {
            title: 'ฟีเจอร์ที่ 1: 3D Product Configurator (โหมดปรับแต่งสินค้า 3 มิติ)',
            details: [
                '360° Interactive Viewer: ผู้ใช้สามารถหมุนชมสินค้าได้รอบทิศทางด้วย React Three Fiber และ OrbitControls ทำให้เห็นรายละเอียดสินค้าจากทุกมุมมองเสมือนถืออยู่ในมือจริง',
                'Real-time Customization: เปลี่ยนสีและวัสดุของสินค้าได้ทันทีผ่านการปรับ Material ของ Three.js โดยไม่ต้องโหลดโมเดลใหม่ ช่วยให้ผู้ใช้ออกแบบสินค้าในแบบของตัวเองก่อนตัดสินใจซื้อ'
            ]
        },
        {
            title: 'ฟีเจอร์ที่ 2: Full-Stack Shopping System (ระบบร้านค้าครบวงจร)',
            details: [
                'Product Catalog & Filtering: แสดงรายการสินค้าหลายหมวดหมู่ (เสื้อผ้า, รองเท้า, กระเป๋า, เครื่องประดับ) พร้อมระบบกรองตามหมวดหมู่ ให้ค้นหาสินค้าได้สะดวกและเป็นระเบียบ',
                'Authentication & Cart: ระบบสมาชิก (สมัคร/เข้าสู่ระบบ) ด้วย JWT และตะกร้าสินค้าที่จัดการข้อมูลผ่านฐานข้อมูล MongoDB รองรับการทำงานหลังบ้านด้วย Node.js และ Express'
            ]
        }
    ],
    imgSrc: '/Images/Project/Ecom.png',
}

export default function Ecommerce3DPage() {
    return <ProjectPage {...data} />
}
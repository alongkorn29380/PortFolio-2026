import ProfileCard from './Components/Profile/ProfileCard'

export default function Experience() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} castShadow />
      <pointLight position={[-3, 2, 3]} color="#22d3ee" intensity={0.8} />
      <ProfileCard />
    </>
  )
}

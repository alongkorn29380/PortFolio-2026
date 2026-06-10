import { Perf } from 'r3f-perf'

export default function Experience() {
  return (
    <>
      {/* <Perf position="top-left" /> */}

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  )
}

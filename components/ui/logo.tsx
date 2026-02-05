import Image from 'next/image'

const Logo = () => {
  return (
    <Image
      alt=""
      src={"/images/logo.png"}
      width={160}
      height={80}
     />
  )
}

export default Logo
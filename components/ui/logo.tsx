import Image from 'next/image'

const Logo = () => {
  return (
    <div>
      <Image
        alt=""
        src={"/images/logo.jpeg"}
        width={125}
        height={125}
        className='rounded-full sm:block hidden'
      />
      <Image
        alt=""
        src={"/images/logo.jpeg"}
        width={80}
        height={80}
        className='rounded-full sm:hidden block'
      />
    </div>
  )
}

export default Logo
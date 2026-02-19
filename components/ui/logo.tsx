import Image from 'next/image'

const Logo = () => {
  return (
    <div>
      <Image
        alt=""
        src={"/images/logo.png"}
        width={170}
        height={170}
        className='rounded-full sm:block hidden'
      />
      <Image
        alt=""
        src={"/images/logo.png"}
        width={125}
        height={125}
        className='rounded-full sm:hidden block'
      />
    </div>
  )
}

export default Logo
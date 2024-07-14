import Image from 'next/image'
import { BsMic } from 'react-icons/bs'

import { cn } from '@/lib/utils'

type AudioGifProps = {
  speaking?: boolean
  className?: string
}

const AudioGif = ({ speaking, className }: AudioGifProps) => {
  return (
    <div
      className={cn('bg-[#7a0d2e] flex justify-center items-center', className)}
    >
      {speaking ? (
        <Image
          src={"/audio.webp"}
          alt="audio gif"
          className="object-fill w-full h-full rounded-xl"
          color="white"
          width={200}
          height={200}
        />
      ) : (
        <BsMic color="white" className="h-full w-full rounded-xl p-10" />
      )}
    </div>
  )
}

export default AudioGif

import type { TitleProps } from '../types/title.type'

const Title = ({title}: TitleProps) => {
  return (
    <h2 className='text-3xl font-semibold font-jost'>{title}</h2>
  )
}

export default Title
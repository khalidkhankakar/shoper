import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'


import React from 'react'

const HomePage = async () => {


  return (
    <div className='p-4'>
      <div className='flex flex-col gap-2'>
      <Button variant={'evaluated'}>Button</Button>
      <Input placeholder='I am input' />
      <Textarea placeholder='I am textarea' />
      <Progress value={50} />
      <Checkbox checked />
      </div>

    </div>
  )
}

export default HomePage
 
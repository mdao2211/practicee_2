import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved
import { Input } from '@/components/ui/input'
// eslint-disable-next-line import/no-unresolved
import { Button } from '@/components/ui/button'

export default function AddProduct() {
  const [name, setName] = useState({
    id: '',
    title: '',
    description: ''
  })

  const navigate = useNavigate()
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    console.log('🚀 ~ handleSubmit ~ name:', name)
    axios
      .post('http://localhost:3000/products', name)
      .then(() => {
        alert('Data posted successfully!')
        navigate('/dashboard/product')
      })
      .catch(error => {
        console.error('Error posting data:', error)
        alert('Failed to post data. Please try again.')
        // Handle errors here if needed
      })
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Add Product</h1>
      </div>
      <div className="border shadow-sm rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Product ID
              </label>
              <Input
                onChange={e => setName({ ...name, id: e.target.value })}
                value={name.id}
                className="mt-1 block w-full"
                placeholder="Enter product name"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <Input
                onChange={e => setName({ ...name, title: e.target.value })}
                value={name.title}
                className="mt-1 block w-full"
                placeholder="Enter product title"
                type="text"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <textarea
                onChange={e => setName({ ...name, description: e.target.value })}
                value={name.description}
                className="mt-1 block w-full h-24"
                placeholder="Enter product description"
              />
            </div>
            <div className="col-span-2">
              <Button className="w-full" type="submit">
                Add Product
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

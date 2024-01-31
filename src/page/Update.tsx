/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
  // eslint-disable-next-line import/no-unresolved
} from '@/components/ui/dialog'
// eslint-disable-next-line import/no-unresolved
import { Input } from '@/components/ui/input'
// eslint-disable-next-line import/no-unresolved
import { Button } from '@/components/ui/button'

function Update() {
  const { id } = useParams()
  const [values, setValues] = useState({
    id,
    title: '',
    description: ''
  })
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then(res => {
        setValues({
          id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          title: res.data.title,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          description: res.data.description
        })
      })
      .catch(err => console.log(err))
  }, [id])

  const navigate = useNavigate()
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    axios
      .put(`http://localhost:3000/products/${id}`, values)
      .then(() => {
        navigate('/dashboard/product')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">ID</Label>
              <Input id="name" className="col-span-3" value={values.id} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">TITLE</Label>
              <Input
                id="title"
                className="col-span-3"
                value={values.title}
                onChange={e => setValues({ ...values, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">DESCRIPTION</Label>
              <Input
                id="description"
                className="col-span-3"
                value={values.description}
                onChange={e => setValues({ ...values, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Update

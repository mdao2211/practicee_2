import  { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function Update() {
  const {id} = useParams(); 
  const [values,setValues] = useState({
    id: id,
    title: '',
    description: '',
  })  
  useEffect(() => {
    axios.get("http://localhost:3000/products/" + id)
    .then(res => {
        setValues({...values, title: res.data.title, description: res.data.description})
    })
    .catch(err => console.log(err))
  })

  const navigate = useNavigate()
  const handleSubmit = (e: { preventDefault: () => void; }) =>{
    e.preventDefault()
    axios.put("http://localhost:3000/products/" + id,values)
    .then(() => {
        navigate('/')
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
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                    ID
                    </Label>
                    <Input id="name"  className="col-span-3" value={values.id}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                    TITLE
                    </Label>
                    <Input id="title" className="col-span-3" value={values.title} onChange={e => setValues({...values, title: e.target.value})}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                    DESCRIPTION
                    </Label>
                    <Input id="description" className="col-span-3" value={values.description} onChange={e => setValues({...values, description: e.target.value})}/>
                </div>
                </div>
                <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
            </div>
  )
}

export default Update
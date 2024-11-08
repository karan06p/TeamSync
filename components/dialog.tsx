"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";


export default function dialog() {
  const [inputValue, setInputValue] = useState("")
  const [colorValue, setColorValue] = useState("")
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState([
    {
      title: "Take a bath",
      color: "blue"
    },
    {
      title: "Take a bath",
      color: "pink"
    },
    {
      title: "Take a bath",
      color: "green"
    },
  ])

  const showTask = (value: string) => {
    console.log(value)
  }

  const handleAddTask = () => {
    if(!inputValue){
      console.log("Input Value is null")
    }else{
      setOpen(false)
      showTask(inputValue);
      setInputValue('')
      setTasks([...tasks , {title: inputValue, color: colorValue}])
      console.log(tasks)
    }
  }

  const handleColorChange = (color: string) => {
    setColorValue(color)
    console.log(color)
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-400";
      case "pink":
        return "bg-pink-400";
      case "teal":
        return "bg-teal-400";
      case "green":
        return "bg-green-400";
      default:
        return "bg-gray-200";
    }
  };
    
  return (
    <div className="bg-primary text-white w-full flex flex-col items-center justify-center h-screen">
      <div>
        <Dialog open={open}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(true)} className="text-black m-10">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>Add a new task</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" className="col-span-2" onChange={(e) => setInputValue(e.target.value)}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Color
                </Label>
                <Select onValueChange={handleColorChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="blue">blue</SelectItem>
                    <SelectItem value="teal">teal</SelectItem>
                    <SelectItem value="pink">pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask} type="submit">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full h-fit flex flex-col items-center bg-white text-black">
        <h2 className="underline">TASKS</h2>
        <ul className="flex flex-col gap-4">
          {
            tasks.map((task, index) => {
              return (
                <li key={index} className={`${getColorClass(task.color)} p-2 rounded-md`}>{task.title}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

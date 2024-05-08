import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  export default function SelectForm(){
    return (
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Department"/>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Network Engineer">Networking</SelectItem>
    <SelectItem value="Hardware Engineer">Hardware</SelectItem>
    <SelectItem value="System Engineer">System</SelectItem>
  </SelectContent>
</Select>
    )
  }

  
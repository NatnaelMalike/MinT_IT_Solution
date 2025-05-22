import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DepartmentForm from "../Form/department-form";

export function DepartmentDialog({ 
  isOpen, 
  onClose, 
  department = null, 
  onSuccess 
}) {
  const isEditing = !!department;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Department" : "Create New Department"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the department details below." 
              : "Fill in the details to create a new department."}
          </DialogDescription>
        </DialogHeader>
        <DepartmentForm 
          department={department} 
          onSuccess={() => {
            onSuccess && onSuccess();
            onClose(false);
          }}
          onCancel={() => onClose(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

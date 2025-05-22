import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfessionForm from "../Form/profession-form";

export function ProfessionDialog({ 
  isOpen, 
  onClose, 
  profession = null, 
  onSuccess 
}) {
  const isEditing = !!profession;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Profession" : "Create New Profession"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the profession details below." 
              : "Fill in the details to create a new profession."}
          </DialogDescription>
        </DialogHeader>
        <ProfessionForm 
          profession={profession} 
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

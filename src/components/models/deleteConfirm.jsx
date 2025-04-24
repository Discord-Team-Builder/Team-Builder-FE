import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react"

const DialogDeleteConfirm = ({ isOpen, onClose, onConfirm, item, isDeleting }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          {item ? `Are you sure you want to delete "${item.title}"?` : 'Are you sure you want to delete this item?'}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={isDeleting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => onConfirm(item)}
          >
            {isDeleting ? (
                <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Deleting
                </>
                ) : (
                'Delete'
                )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteConfirm;

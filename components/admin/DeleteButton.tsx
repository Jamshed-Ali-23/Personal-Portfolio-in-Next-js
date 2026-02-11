'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  itemName: string;
  redirectPath?: string;
}

export default function DeleteButton({ id, endpoint, itemName, redirectPath }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      toast({
        title: 'Deleted',
        description: `${itemName} has been deleted successfully.`,
      });

      if (redirectPath) {
        router.push(redirectPath);
      }
      router.refresh();
    } catch (_error) {
      toast({
        title: 'Error',
        description: `Failed to delete ${itemName.toLowerCase()}.`,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-stone-400 hover:text-red-500 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-stone-900 border-stone-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-stone-100">Delete {itemName}?</AlertDialogTitle>
          <AlertDialogDescription className="text-stone-400">
            This action cannot be undone. This will permanently delete the {itemName.toLowerCase()}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-stone-800 text-stone-100 border-stone-700 hover:bg-stone-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

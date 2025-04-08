"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useProject from "@/hooks/use-project";
import React, { useEffect } from "react";
import { toast } from "sonner";

const InviteButton = () => {
  const { projectId } = useProject();
  const [open, setOpen] = React.useState(false);
  const [inviteLink, setInviteLink] = React.useState("");

  useEffect(() => {
    //Only run this on the client side
    if (typeof window !== "undefined") {
      setInviteLink(`${window.location.origin}/join/${projectId}`);
    }
  }, [projectId]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Ask them to join your project by sending them the link below:
          </p>
          <Input
            readOnly
            className="mt-4"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/join/${projectId}`,
              ),
                toast.success("Copied to clipboard.");
            }}
            value={inviteLink}
          />
        </DialogContent>
      </Dialog>
      <Button size="sm" onClick={() => setOpen(true)}>
        Invite Member
      </Button>
    </>
  );
};

export default InviteButton;

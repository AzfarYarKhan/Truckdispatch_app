"use client";

import Button from "@/components/buttons/button";
import { useCallback, useState } from "react";

interface JobFormProps {
  onSubmit: () => void;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  body?: React.ReactElement;
  disabled?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  body,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
}) => {
  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (!secondaryAction) {
      return;
    }
    secondaryAction();
  }, [secondaryAction]);

  return (
    <>
      <div>
        {/*body*/}
        <div className=" p-6 min-h-[500px]">{body}</div>
        {/*footer*/}
        <div className="flex flex-col gap-2 p-6">
          <div
            className="
                      flex 
                      flex-row 
                      items-center 
                      gap-4 
                      w-full
                    "
          >
            {secondaryAction && secondaryActionLabel && (
              <Button
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}
            <Button
              label={actionLabel}
              disabled={disabled}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobForm;

import { useCallback, useState } from "react";
import { ApiRequestError } from "@/lib/api";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

export function useFormSubmit<TPayload, TResponse>(
  submitFn: (payload: TPayload) => Promise<{ data: TResponse; message?: string }>
) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(
    async (payload: TPayload) => {
      setStatus("loading");
      setMessage(null);
      setFieldErrors({});
      try {
        const res = await submitFn(payload);
        setStatus("success");
        setMessage(res.message ?? "Success.");
        return res.data;
      } catch (err) {
        setStatus("error");
        if (err instanceof ApiRequestError) {
          setMessage(err.message);
          if (err.details) {
            const errors: Record<string, string> = {};
            err.details.forEach((d) => {
              errors[d.field] = d.message;
            });
            setFieldErrors(errors);
          }
        } else {
          setMessage("Something went wrong. Please try again.");
        }
        return null;
      }
    },
    [submitFn]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage(null);
    setFieldErrors({});
  }, []);

  return { status, message, fieldErrors, submit, reset };
}
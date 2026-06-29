import { Link } from "react-router-dom";
import AuthSocialButtons from "./AuthSocialButtons";

type AuthSecondaryActionsProps = {
  promptText: string;
  linkText: string;
  linkTo: string;
  onGoogleCredential: (credential: string) => void | Promise<void>;
  googleDisabled?: boolean;
};

export default function AuthSecondaryActions({
  promptText,
  linkText,
  linkTo,
  onGoogleCredential,
  googleDisabled = false,
}: AuthSecondaryActionsProps) {
  return (
    <>
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <AuthSocialButtons
        onGoogleCredential={onGoogleCredential}
        disabled={googleDisabled}
      />

      <p className="mt-6 text-center text-sm text-slate-500">
        {promptText}{" "}
        <Link to={linkTo} className="font-medium text-slate-900 hover:underline">
          {linkText}
        </Link>
      </p>
    </>
  );
}

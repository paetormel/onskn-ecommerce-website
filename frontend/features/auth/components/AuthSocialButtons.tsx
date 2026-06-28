import { useEffect, useRef, useState } from "react";

type AuthSocialButtonsProps = {
  onGoogleCredential: (credential: string) => void | Promise<void>;
  disabled?: boolean;
};

const GOOGLE_SCRIPT_ID = "google-identity-services";
let googleScriptPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(
      GOOGLE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google authentication script")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google authentication script"));

    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export default function AuthSocialButtons({
  onGoogleCredential,
  disabled = false,
}: AuthSocialButtonsProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const onGoogleCredentialRef = useRef(onGoogleCredential);
  const [isReady, setIsReady] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

  useEffect(() => {
    onGoogleCredentialRef.current = onGoogleCredential;
  }, [onGoogleCredential]);

  useEffect(() => {
    let isMounted = true;

    if (!clientId) {
      return () => {
        isMounted = false;
      };
    }

    const setupGoogleButton = async () => {
      try {
        await loadGoogleScript();

        if (!isMounted || !buttonRef.current || !window.google) {
          return;
        }

        buttonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential) {
              void onGoogleCredentialRef.current(response.credential);
            }
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: "100%",
          logo_alignment: "center",
        });

        setIsReady(true);
      } catch (error) {
        console.error("Google button setup failed:", error);
      }
    };

    void setupGoogleButton();

    return () => {
      isMounted = false;
      if (buttonRef.current) {
        buttonRef.current.innerHTML = "";
      }
    };
  }, [clientId]);

  if (!clientId) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-center text-sm text-slate-500">
        Set <code>VITE_GOOGLE_CLIENT_ID</code> to enable Google sign in.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div
        ref={buttonRef}
        className={`min-h-[44px] ${disabled ? "pointer-events-none opacity-60" : ""}`}
        aria-disabled={disabled}
      />
      {!isReady && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-500">
          Preparing Google sign in...
        </div>
      )}
    </div>
  );
}

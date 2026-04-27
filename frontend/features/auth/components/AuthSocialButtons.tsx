const buttonClassName =
  "flex items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

export default function AuthSocialButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button type="button" className={buttonClassName}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-5 w-5"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.2 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.3 5.3C36.9 38.5 44 33 44 24c0-1.3-.1-2.3-.4-3.5z"
          />
        </svg>
        Google
      </button>

      <button type="button" className={buttonClassName}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M16.365 1.43c0 1.14-.466 2.233-1.247 3.037-.82.842-2.16 1.49-3.3 1.398-.144-1.114.414-2.282 1.171-3.086.805-.87 2.186-1.496 3.376-1.35zM20.54 17.21c-.53 1.22-.78 1.765-1.46 2.88-.947 1.56-2.283 3.5-3.94 3.514-1.473.013-1.853-.96-3.852-.948-2 .01-2.42.967-3.894.954-1.656-.014-2.922-1.765-3.87-3.325-2.65-4.36-2.93-9.48-1.29-12 .78-1.2 2.01-1.9 3.16-1.9 1.18 0 1.92.96 3.85.96 1.87 0 2.39-.96 3.85-.96 1.03 0 2.12.56 2.89 1.53-2.54 1.39-2.13 5.03.56 6.29z" />
        </svg>
        Apple
      </button>
    </div>
  );
}

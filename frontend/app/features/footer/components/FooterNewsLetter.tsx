/**
 * Renders the newsletter subscription form area in the footer.
 * This keeps the current visual structure and adds small accessibility improvements.
 */
const FooterNewsletter = () => {
    return (
      <div className="flex flex-col gap-4 md:w-105 lg:w-94">
        <div>
          <h2 className="mb-1 text-[20px] lg:text-lg">Stay in the know</h2>
          <p className="wrap-break-words text-sm text-secondary/50 md:text-xs">
            Be the first one to receive new releases, special offers, and more
          </p>
        </div>
  
        <form action="" className="flex flex-col gap-5 md:gap-3">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1 mb-5 md:mb-0">
              <label htmlFor="footer-email" className="sr-only">
                Your email
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Your email"
                className="min-w-0 w-full py-3 outline-none focus:outline-none"
                autoComplete="email"
              />
              <hr className="h-px bg-secondary" />
            </div>
  
            <button
              type="submit"
              className="w-full bg-secondary py-3 text-lg text-primary transition-colors duration-300 hover:bg-primary hover:text-secondary hover:shadow-[inset_0_0_0_1px_#E8CDA6] hover:border-secondary md:py-2 md:text-sm lg:w-24"
            >
              Submit
            </button>
          </div>
  
          <div className="flex items-start gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input name="terms" type="checkbox" className="peer sr-only" />
  
              <span className="relative h-5 w-5 shrink-0 rounded-xs border-2 border-secondary bg-transparent after:absolute after:top-1/2 after:left-1/2 after:h-3.5 after:w-3.5 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:bg-secondary after:transition-transform after:duration-200 after:ease-out peer-checked:after:scale-100" />
  
              <span className="underline">I agree with terms & condition</span>
            </label>
          </div>
        </form>
      </div>
    );
  };
  
  export default FooterNewsletter;
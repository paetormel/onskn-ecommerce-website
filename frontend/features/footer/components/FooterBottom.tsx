/**
 * Renders the legal and privacy text row at the bottom of the footer.
 */
const FooterBottom = () => {
    return (
      <div className="flex flex-col gap-5 mt-5 px-4 md:flex-row text-[14px] md:justify-between md:px-12">
        <p className="wrap-break-words">
          Copyright © 2026 ONSKN. All rights reserved
        </p>
        <span className="wrap-break-words">Privacy Policy</span>
      </div>
    );
  };
  
  export default FooterBottom;
export default function Footer() {
  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto text-center">
        <p
          className="text-muted-foreground text-xs mt-2"
          data-testid="footer-tagline"
        >
          yo whats up
        </p>
        <img
          src={"/assets/parrotchair.png"}
          alt={"Parrot Chair"}
          className="w-10 h-9 object-cover mx-auto"
        />
      </div>
    </footer>
  );
}

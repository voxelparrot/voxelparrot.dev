export default function Footer() {
  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border"
      data-testid="footer"
    >
    <div className="flex items-center justify-center gap-4">
      <div className="max-w-7xl mx-auto text-center flex items-center justify-center">
        <a
                          href="https://voxelparrot.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                          data-testid="link-parrot"
                        >
        <img
          src={"/assets/parrotchair.png"}
          alt={"Parrot Chair"}
          className="w-10 h-9 object-cover mx-auto"
        />
        </a>
        <div className="p-4"></div>
        <a
                          href="https://leoniscool.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                          data-testid="link-leon"
                        >
        <img
          src={"/assets/leon.png"}
          alt={"Leon"}
          className="w-9 h-9 object-cover mx-auto"
        />
        </a>
      </div>
      </div>
    </footer>
  );
}

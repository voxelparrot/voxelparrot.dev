export default function LoadingComponent() {
    return (
      <section
        className="pt-28 px-4 sm:px-6 lg:px-8 pb-10"
        data-testid="text-loading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto mb-4"></div>
              <div className="h-2 bg-muted rounded w-64 mx-auto mb-4"></div>
              <p className="h-2 text-muted rounded w-64 mx-auto mb-4"> Bowl Eyes</p>
              <div className="h-4 bg-muted rounded w-64 mx-auto mb-4"></div>
              <p className="h-2 text-muted rounded w-64 mx-auto mb-4"> Secret</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

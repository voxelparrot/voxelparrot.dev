export default function LoadingComponent() {
    return (
      <section
        className="pt-28 px-4 sm:px-6 lg:px-8 pb-10"
        data-testid="card-loading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              <div className="h-8 bg-muted rounded w-96 mx-auto mb-4"></div>
              <div className="h-8 bg-muted rounded w-96 mx-auto mb-4"></div>
              <div className="h-8 bg-muted rounded w-96 mx-auto mb-4"></div>
            </div>
            <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              <div className="h-64 bg-muted rounded w-96 mx-auto mb-4"></div>
              <div className="h-64 bg-muted rounded w-96 mx-auto mb-4"></div>
              <div className="h-64 bg-muted rounded w-96 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

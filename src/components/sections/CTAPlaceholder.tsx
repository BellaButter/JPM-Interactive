export default function CTAPlaceholder() {
  return (
    <section
      className="relative z-30 isolate w-full min-w-full max-w-none min-h-screen flex items-center justify-center bg-white"
      aria-hidden
    >
      <div className="w-full h-full min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse w-full max-w-4xl mx-auto px-4">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6" />
          <div className="h-6 bg-gray-100 rounded w-1/2 mx-auto mb-8" />
          <div className="aspect-video bg-gray-100 rounded-2xl max-w-2xl mx-auto" />
        </div>
      </div>
    </section>
  );
}

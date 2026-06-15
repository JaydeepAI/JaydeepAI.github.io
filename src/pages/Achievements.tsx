import { useState } from "react";
import { X, Download } from "lucide-react";

export default function Achievements() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const certificates = [
    "/certificates/certificate-8cchtsbu2qog-1780594665.pdf",
    "/certificates/certificate-8cchtsbu2qog-1780594665.png",
    "/certificates/certificate-fudrx4bftgxo-1780823318.pdf",
    "/certificates/certificate-o9xuu9e6agtb-1780645451.pdf",
    "/certificates/certificate-qgqqq6qvvznr-1780753067.pdf",
    "/certificates/certificate-yptqfw8xzrqv-1780506048.pdf",
    "/certificates/certificate-3szusof9uq8w-1781025373.pdf",
    "/certificates/certificate-y8no23jo9nx4-1781075531.pdf",
    "/certificates/certificate-ktpyog5vvadm-1781029060.pdf",
    "/certificates/certificate-7w2b2qbrzjzf-1781028736.pdf",
    "/certificates/certificate-eg2oz2fq3dcc-1781246522.pdf",
  ];

  const isPdf = (file: string) =>
    file.toLowerCase().endsWith(".pdf");

  const getFileName = (path: string) =>
    decodeURIComponent(path.split("/").pop() || "");

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-10 py-28">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="gradient-text">
              Certifications
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {certificates.map((file, index) => (
            <button
              key={index}
              onClick={() => setSelectedFile(file)}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-background/40
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-violet-500/50
                hover:shadow-[0_20px_80px_rgba(139,92,246,0.25)]
              "
            >
              <div className="aspect-[1.4/1] bg-black/20">

                {isPdf(file) ? (
                  <iframe
                    src={`${file}#toolbar=0`}
                    className="w-full h-full pointer-events-none"
                    title={getFileName(file)}
                  />
                ) : (
                  <img
                    src={file}
                    alt={getFileName(file)}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                )}

              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedFile && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md p-4">

          <div className="absolute top-6 right-6 flex gap-3">

            <a
              href={selectedFile}
              download={getFileName(selectedFile)}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                text-white
                font-medium
              "
            >
              <Download size={18} />
              Download Original
            </a>

            <button
              onClick={() => setSelectedFile(null)}
              className="
                w-11
                h-11
                rounded-xl
                bg-white/10
                hover:bg-white/20
                flex
                items-center
                justify-center
              "
            >
              <X size={20} />
            </button>

          </div>

          <div className="w-full h-full flex items-center justify-center pt-16">

            {isPdf(selectedFile) ? (
              <iframe
                src={selectedFile}
                className="w-full h-[90vh] rounded-2xl bg-white"
                title="PDF Preview"
              />
            ) : (
              <img
                src={selectedFile}
                alt="Certificate"
                className="
                  max-w-full
                  max-h-[90vh]
                  rounded-2xl
                  shadow-2xl
                "
              />
            )}

          </div>
        </div>
      )}
    </div>
  );
}
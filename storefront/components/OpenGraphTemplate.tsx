import Logo from "@/components/Logo";

interface OpenGraphTemplateProps {
  title: string;
  description: string;
  btnText: string;
}

// Image metadata
export const alt = "SG Tools";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default function OpenGraphTemplate({
  title,
  description,
  btnText,
}: OpenGraphTemplateProps) {
  return (
    <div
      style={{
        fontSize: 128,

        backgroundColor: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px 60px",
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Logo width={300} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "80%",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "60px",
            textAlign: "left",
            marginBottom: "0",
            marginTop: "40px",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#ffffff",
            fontSize: "24px",
            textAlign: "left",

            marginTop: "20px",
          }}
        >
          {description}
        </p>
      </div>
      <button
        style={{
          fontSize: "35px",
          padding: "20px 40px",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          borderRadius: "200px",
        }}
      >
        {btnText}
      </button>
    </div>
  );
  // Image
}

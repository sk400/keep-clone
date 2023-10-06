import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignUp />
    </div>
  );
};

export default Page;

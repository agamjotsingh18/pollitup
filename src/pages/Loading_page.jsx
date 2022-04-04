import React from "react";
import { Spinner ,Heading} from "@chakra-ui/react";
 
function Loading_page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Heading>Please Wait...</Heading>
      <Spinner size="xl" />
    </div>
  );
}

export default Loading_page;
